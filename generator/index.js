const fs            = require('fs')
const path          = require('path')
const _             = require('lodash')
const util          = require('./tools/util')

const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs'))
  .use(require('markdown-it-anchor'), {
    permalink: true,
    permalinkSymbol: '<svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
    permalinkBefore: true,
    permalinkClass: 'anchor',
    // permalinkHref: (slug) => `http://localhost:4200/documentation/field-creator/${slug}`
  })

const MD_PATH = path.resolve(__dirname, './md')
const info = require(path.resolve(MD_PATH, 'info.json'))

const DESTINY_PATH = path.resolve(process.cwd(), 'src/app/modules')
if (util.isDir(DESTINY_PATH)) { try { util.rmdir(DESTINY_PATH) } catch (e) {} }
util.mkdir(DESTINY_PATH)

for (let i in info.secciones) {
  const data = info.secciones[i]
  const _section = data.folder
  const section = _.camelCase(data.folder)
  const Section = _.upperFirst(section)

  const SECTION_PATH = path.resolve(DESTINY_PATH, _section)

  util.mkdir(SECTION_PATH)

  let filePath = ''
  let result =''

  for (let j in data.capitulos) {
    const capitulo = data.capitulos[j]
    const _cap = capitulo.file

    let MARKDOWN = md.render(fs.readFileSync(path.resolve(MD_PATH, `${_section}/${_cap}.md`)).toString())
    MARKDOWN = MARKDOWN.replace(/{/g, '&#123;')
    MARKDOWN = MARKDOWN.replace(/}/g, '&#125;')

    const anchors = []
    while(MARKDOWN.indexOf('<a class="anchor" href="#') !== -1) {
      const a = MARKDOWN.indexOf('<a class="anchor" href="#') + 25
      const b = MARKDOWN.substr(a).indexOf('"')
      const OLD_ANCHOR_NAME = MARKDOWN.substr(a, b)
      const NEW_ANCHOR_NAME = normalizeName(OLD_ANCHOR_NAME)
      MARKDOWN = MARKDOWN.replace(`id="${OLD_ANCHOR_NAME}"`, `id="${NEW_ANCHOR_NAME}"`)
      anchors.push(NEW_ANCHOR_NAME)
      const OLD_HREF = `href="#${OLD_ANCHOR_NAME}"`
      const NEW_HREF = `routerLink="/${_section}/${_cap}" fragment="${NEW_ANCHOR_NAME}"`
      MARKDOWN = MARKDOWN.replace(`<a class="anchor" ${OLD_HREF}`, `<a class="anchor" ${NEW_HREF}`)
    }

    while(MARKDOWN.indexOf('<a href="#title-') !== -1) {
      const a = MARKDOWN.indexOf('<a href="#title-') + 16
      const b = MARKDOWN.substr(a).indexOf('"')
      const anchorPosition = MARKDOWN.substr(a, b)
      const OLD_HREF = `href="#title-${anchorPosition}"`
      const anchor   = anchors[parseInt(anchorPosition) - 1]
      const NEW_HREF = `routerLink="/${_section}/${_cap}" fragment="${anchor}"`
      MARKDOWN = MARKDOWN.replace(`<a ${OLD_HREF}`, `<a ${NEW_HREF}`)
    }

    while(MARKDOWN.indexOf('<a href="./') !== -1 && MARKDOWN.indexOf('<a href="./assets') === -1) {
      const a = MARKDOWN.indexOf('<a href="./') + 11
      const b = MARKDOWN.substr(a).indexOf('"')
      const relativeUrl = MARKDOWN.substr(a, b)
      const split = relativeUrl.split('#')
      const finalUrl = split[0]
      const fragment = split.length > 1 ? ` fragment="${split[1]}"` : ''
      const OLD_HREF = `href="./${relativeUrl}"`
      const NEW_HREF = `routerLink="/${finalUrl}"${fragment}`
      MARKDOWN = MARKDOWN.replace(`<a ${OLD_HREF}`, `<a ${NEW_HREF}`)
    }

    while(MARKDOWN.indexOf('<a href="http') !== -1) {
      const a = MARKDOWN.indexOf('<a href="') + 9
      const b = MARKDOWN.substr(a).indexOf('"')
      const absoluteUrl = MARKDOWN.substr(a, b)
      const OLD_HREF = `href="${absoluteUrl}"`
      const NEW_HREF = ` href="${absoluteUrl}" target="_blank"`
      MARKDOWN = MARKDOWN.replace(`<a ${OLD_HREF}`, `<a ${NEW_HREF}`)
    }

    capitulo.markdown = MARKDOWN
    capitulo.anchors = anchors

    // capitulo.routes.ts
    filePath = path.resolve(SECTION_PATH, `${_cap}/${_cap}.routes.ts`)
    result = require('./template/seccion/capitulo/capitulo.routes.ts.js')(capitulo)
    util.writeFile(filePath, result)
    createInfo(filePath)

    // capitulo.module.ts
    filePath = path.resolve(SECTION_PATH, `${_cap}/${_cap}.module.ts`)
    result = require('./template/seccion/capitulo/capitulo.module.ts.js')(capitulo)
    util.writeFile(filePath, result)
    createInfo(filePath)

    // capitulo.component.html
    filePath = path.resolve(SECTION_PATH, `${_cap}/${_cap}.component.html`)
    result = require('./template/seccion/capitulo/capitulo.component.html.js')(capitulo)
    util.writeFile(filePath, result)
    createInfo(filePath)

    // seccion.component.scss
    let target = path.resolve(SECTION_PATH, `${_cap}/${_cap}.component.scss`)
    let source = path.resolve(__dirname, './template/seccion/capitulo/capitulo.component.scss')
    util.copyFile(source, target)
    createInfo(target)

    // capitulo.component.ts
    filePath = path.resolve(SECTION_PATH, `${_cap}/${_cap}.component.ts`)
    result = require('./template/seccion/capitulo/capitulo.component.ts.js')(capitulo)
    util.writeFile(filePath, result)
    createInfo(filePath)
  }

  // seccion.routes.ts
  filePath = path.resolve(SECTION_PATH, `${_section}.routes.ts`)
  result = require('./template/seccion/seccion.routes.ts.js')(data)
  util.writeFile(filePath, result)
  createInfo(filePath)

  // seccion.module.ts
  filePath = path.resolve(SECTION_PATH, `${_section}.module.ts`)
  result = require('./template/seccion/seccion.module.ts.js')(data)
  util.writeFile(filePath, result)
  createInfo(filePath)

  // seccion.component.ts
  filePath = path.resolve(SECTION_PATH, `${_section}.component.ts`)
  result = require('./template/seccion/seccion.component.ts.js')(data)
  util.writeFile(filePath, result)
  createInfo(filePath)

  // seccion.component.scss
  let target = path.resolve(SECTION_PATH, `${_section}.component.scss`)
  let source = path.resolve(__dirname, './template/seccion/seccion.component.scss')
  util.copyFile(source, target)
  createInfo(target)

  // seccion.component.html
  filePath = path.resolve(SECTION_PATH, `${_section}.component.html`)
  result = require('./template/seccion/seccion.component.html.js')(info, data)
  util.writeFile(filePath, result)
  createInfo(filePath)
}

function createInfo (filePath) {
  console.log(` [creado] ${filePath.replace(process.cwd(), '')}`)
}

function normalizeName (name) {
  const firstCharacter = name.substr(0, 1)
  if (!(/[a-z]/.test(firstCharacter))) {
    const newName = `section-${name}`
    console.log(" [modificado]", name, ' => ', newName);
    return newName
  }
  return name
}

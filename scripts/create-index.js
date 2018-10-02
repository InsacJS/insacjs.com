const path = require('path')
const fs   = require('fs')

function isFile (filePath) {
  return fs.existsSync(filePath) && !(fs.statSync(filePath).isDirectory())
}

function _find (filePath) {
  if (fs.statSync(filePath).isDirectory()) {
    const indexPath = path.resolve(filePath, 'index.html')
    if (!isFile(indexPath)) {
      console.log('[creado]', indexPath.replace(process.cwd(), ''))
      fs.writeFileSync(indexPath, '')
    }
    fs.readdirSync(filePath).forEach((fileName) => {
      _find(path.resolve(filePath, fileName))
    })
  }
}

_find(path.resolve(process.cwd(), 'dist'))

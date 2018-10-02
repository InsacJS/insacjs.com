const _ = require('lodash')

module.exports = (data) => {

  const _section = data.folder
  const section = _.camelCase(_section)
  const Section = _.upperFirst(section)

  function getFragment (capitulo) {
    return capitulo.anchors.length > 0 ? capitulo.anchors[0] : ''
  }

  let routerLink
  let items = ``
  for (let i = 0; i < data.capitulos.length; i++) {
    const name = data.capitulos[i].name
    const group = data.capitulos[i].group
    const _cap = data.capitulos[i].file
    const cap = _.camelCase(_cap)
    const Cap = _.upperFirst(cap)
    const fragment = getFragment(data.capitulos[i])
    if (!routerLink) { routerLink = `    this.router.navigate(['${_section}/${_cap}'], { fragment: '${fragment}' })\n` }
    items += `    this.addMenuItem({ path: '/${_section}/${_cap}', name: '${name}', fragment: '${fragment}', group: '${group}' })${(i === (data.capitulos.length - 1)) ? '' : ',\n'}`
  }

  let groups = ''
  for (let i = 0; i < data.groups.length; i++) {
    const key = data.groups[i].key
    const name = data.groups[i].name
    groups += `      { key: '${key}', name: '${name}' }${(i === (data.groups.length - 1)) ? '' : ',\n'}`
  }

  let result = ``

  result += `// Libraries
import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router'

@Component({
  selector    : 'app-${_section}',
  templateUrl : './${_section}.component.html',
  styleUrls   : ['./${_section}.component.scss']
})
export class ${Section}Component implements OnInit {
  menuItems = []
  groups    = []
  loading   = false

  constructor (
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.loading = true
      }
      else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.loading = false
      }
    }, err => {
      this.loading = false
    })
  }

  addMenuItem (ROUTE) {
    for (let i in this.menuItems) {
      if (this.menuItems[i].path === ROUTE.path) { return }
    }
    this.menuItems.push(ROUTE)
  }

  ngOnInit() {
    this.groups = [
${groups}
    ]
${items}
  }

  onClick (drawer) {
    if (drawer.mode === 'over') { drawer.close() }
  }

  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    return width > 720
  }
}`
  return result
}

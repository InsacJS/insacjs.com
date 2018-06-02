const _ = require('lodash')

module.exports = (data) => {

  const _section = data.folder
  const section = _.camelCase(_section)
  const Section = _.upperFirst(section)
  let items = ``
  let routerLink

  function getFragment (capitulo) {
    return capitulo.anchors.length > 0 ? capitulo.anchors[0] : ''
  }

  for (let i = 0; i < data.capitulos.length; i++) {
    const name = data.capitulos[i].name
    const _cap = data.capitulos[i].file
    const cap = _.camelCase(_cap)
    const Cap = _.upperFirst(cap)
    const fragment = getFragment(data.capitulos[i])
    if (!routerLink) { routerLink = `    this.router.navigate(['${_section}/${_cap}'], { fragment: '${fragment}' })\n` }
    items += `    this.addMenuItem({ path: '/${_section}/${_cap}', name: '${name}', fragment: '${fragment}' })${(i === (data.capitulos.length - 1)) ? '' : ','}\n`
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
    })
  }

  addMenuItem (ROUTE) {
    for (let i in this.menuItems) {
      if (this.menuItems[i].path === ROUTE.path) { return }
    }
    this.menuItems.push(ROUTE)
  }

  ngOnInit() {
${items}
  }
}`
  return result
}

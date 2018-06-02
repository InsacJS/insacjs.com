// Libraries
import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router'

@Component({
  selector    : 'app-tutoriales',
  templateUrl : './tutoriales.component.html',
  styleUrls   : ['./tutoriales.component.scss']
})
export class TutorialesComponent implements OnInit {
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
    this.addMenuItem({ path: '/tutoriales/introduccion', name: '1. Introducción', fragment: 'filosofia' }),
    this.addMenuItem({ path: '/tutoriales/estructura-de-proyecto', name: '2. Estructura de proyecto', fragment: 'estructura-del-proyecto' }),
    this.addMenuItem({ path: '/tutoriales/hola-mundo', name: '3. Hola Mundo', fragment: 'hola-mundo' }),
    this.addMenuItem({ path: '/tutoriales/mi-primer-proyecto', name: '4. Mi primer proyecto', fragment: 'mi-primer-proyecto' })

  }
}
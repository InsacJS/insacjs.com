// Libraries
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector    : 'app-referencias',
  templateUrl : './referencias.component.html',
  styleUrls   : ['./referencias.component.scss']
})
export class ReferenciasComponent implements OnInit {
  menuItems = []

  constructor (
    private router: Router
  ) {}

  addMenuItem (ROUTE) {
    for (let i in this.menuItems) {
      if (this.menuItems[i].path === ROUTE.path) { return }
    }
    this.menuItems.push(ROUTE)
  }

  ngOnInit() {
    this.addMenuItem({ path: '/referencias/insac-cli', name: '1. Insac CLI', fragment: 'insac-cli' }),
    this.addMenuItem({ path: '/referencias/field-creator', name: '2. Field Creator', fragment: 'field-creator' }),
    this.addMenuItem({ path: '/referencias/apidoc-creator', name: '3. Apidoc Creator', fragment: 'apidoc-creator' }),
    this.addMenuItem({ path: '/referencias/input-data-validator', name: '4. Input Data Validator', fragment: 'input-data-validator' }),
    this.addMenuItem({ path: '/referencias/sequelize-options', name: '5. Sequelize Options', fragment: 'sequelize-options' }),
    this.addMenuItem({ path: '/referencias/response-handler', name: '6. Response Handler', fragment: 'response-handler' }),
    this.addMenuItem({ path: '/referencias/seed-creator', name: '7. Seed Creator', fragment: 'seed-creator' })

  }
}
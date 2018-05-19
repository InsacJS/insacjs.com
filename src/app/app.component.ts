// Modules
import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
// Services

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {
  constructor (
    private router: Router
  ) {}

  ngOnInit () {
    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url)
        if (tree.fragment) {
          console.log("TREE = ", tree.fragment)
          const element = document.querySelector("#" + tree.fragment)
          if (element) {
            element.scrollIntoView(true)
          }
        }
      }
    })
  }
}

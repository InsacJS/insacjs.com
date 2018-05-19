const _ = require('lodash')

module.exports = (data) => {

  let items1 = ``
  let items2 = ``

  for (let i in data.secciones) {
    const _section  = data.secciones[i].folder
    const _cap = data.secciones[i].capitulos[0].file
    const icon = data.secciones[i].icon
    const name = data.secciones[i].name
    const section = _.camelCase(_section)
    const Section = _.upperFirst(section)
    items1 += `        <button routerLink="/${_section}/${_cap}" mat-menu-item><mat-icon>${icon}</mat-icon> ${name}</button>\n`
    items2 += `        <button routerLink="/${_section}/${_cap}" [routerLinkActive]="['active']" mat-button style="color:white"><mat-icon>${icon}</mat-icon> ${name}</button>\n`
  }

  let result = ``
  result += `<div class="menu-top" fxLayout="row">
  <div fxLayout="column" fxFlex="20%" fxLayoutAlign="center start">
    <div fxLayout="row" fxLayoutAlign="end end">
      <span class="titulo-principal">Insac JS</span>
    </div>
   </div>
  <div fxLayout="column" fxFlex="80%" fxLayoutAlign="center end">
    <div fxLayout="row" fxLayoutAlign="start start">
      <button fxHide fxShow.xs="true" mat-button [matMenuTriggerFor]="menu" style="color:white;min-width:0px">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button routerLink="/index" mat-menu-item><mat-icon>home</mat-icon> Inicio</button>
${items1}        <a href="https://github.com/insacjs" target="_blank" mat-menu-item><svg viewBox="0 0 512 512" style="margin-right:15px;color:grey" focusable="false" height="25px">
            <path d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z" fill="currentColor" fill-rule="evenodd"></path>
          </svg> Github</a>
      </mat-menu>
    </div>
    <div fxLayout="row" fxLayoutAlign="start start" fxShow fxHide.xs="true">
      <button routerLink="/index" [routerLinkActive]="['active']" mat-button style="color:white"><mat-icon>home</mat-icon> Inicio</button>
${items2}      <a href="https://github.com/insacjs" target="_blank" mat-button style="color:white"><svg viewBox="0 0 512 512" focusable="false" height="25px">
          <path d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z" fill="currentColor" fill-rule="evenodd"></path>
        </svg> Github</a>
    </div>
  </div>
</div>

<button class="drawer-toggle" type="button" mat-icon-button (click)="drawer.toggle()"><mat-icon>menu</mat-icon></button>
<mat-drawer-container class="drawer-container">
  <mat-drawer class="drawer" #drawer mode="side" opened="true">
    <div fxLayout="column">
      <button *ngFor="let menuItem of menuItems" class="link" [routerLink]="menuItem.path" [fragment]="menuItem.fragment" mat-button [routerLinkActive]="['active']">{{menuItem.name}}</button>
    </div>
  </mat-drawer>
  <mat-drawer-content>
    <router-outlet></router-outlet>
    <div class="footer">
      <span class="mat-body-1">&copy; 2018 Insac JS</span>
    </div>
  </mat-drawer-content>
</mat-drawer-container>`
  return result
}

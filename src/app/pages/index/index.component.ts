// Libraries
import { Component, OnInit }       from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector    : 'app-index',
  templateUrl : './index.component.html',
  styleUrls   : ['./index.component.scss']
})
export class IndexComponent {
  loading = false
  version = '3.0.0'

  constructor (private http: HttpClient) { }

  ngOnInit () {
    this.http.get('./assets/info.json').subscribe((data : any) => {
      this.version = data.insacVersion
    },
    error => { })
  }
}

import {Component} from '@angular/core';
import {GraphqlService} from './service/graphql.service';
import {DataService} from './service/data.service';
import {Authors} from './dao/authors';
import {Book} from './dao/book';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookApp';


  constructor() {


  }
}

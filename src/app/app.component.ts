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

  Author$: Observable<Authors[]>;
  Book$: Observable<Book[]>;

  constructor(private graphqlService: GraphqlService,
              private dataService: DataService) {

    let AuthorsList: Authors[];
    AuthorsList = [{
      id: '1',
      fullName: 'Petrov S',
      biography: 'Some biograhy',
      bookListId: ['1', '2', '3']
    },
      {
        id: '123',
        fullName: 'Petrov V',
        biography: 'Some biograhy',
        bookListId: ['1', '2', '3']
      }
    ];

    let BookList: Book[];
    BookList = [
      {
        id: '1',
        name: 'Windows',
        authorsId: ['1', '123'],
        genre: `Horor`,
        shortContext: 'Short text '
      },
      {
        id: '2',
        name: 'Windows1',
        authorsId: ['1', '123'],
        genre: `Horor`,
        shortContext: 'Short text '
      }
      , {
        id: '3',
        name: 'Windows2',
        authorsId: ['1', '123'],
        genre: `Horor`,
        shortContext: 'Short text '
      }
    ];

    // this.dataService.AthorsList =
    // this.graphqlService.getAllAuthor().pipe(
    //   map(result => {
    //
    //     return result.data.getAllAuthors;
    //   })
    // ).subscribe(
    //   (result) => {
    //     this.dataService.AthorsList$ = result;
    //   }
    // )
    // ;
    // // this.dataService.BookList =
    // this.graphqlService.getAllBook().pipe(
    //   map(result => {
    //     this.dataService.BookList$ = result.data.getAllBooks;
    //     return result.data.getAllBooks;
    //   })
    // ).subscribe(
    //   (result) => {
    //     this.dataService.AthorsList$ = result;
    //   }
    // );



  }
}

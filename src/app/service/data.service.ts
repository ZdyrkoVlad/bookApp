import {Injectable} from '@angular/core';
import {Book} from 'src/app/dao/book';
import {Authors} from '../dao/authors';
import {GraphqlService} from './graphql.service';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {find} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class DataService {

  BookList$: Book[] = [];
  AthorsList$: Authors[] = [];

  BookList: Observable<Book[]>;
  AthorsList: Observable<Authors[]>;


  sbj = new Subject<Book[]>();

  constructor(private graphqlService: GraphqlService
  ) {
    //
    // this.BookList$ = [];
    // this.AthorsList$ = [];
    this.BookList = this.graphqlService.getAllBook().pipe(
      map(data => {
        this.sbj.next(data.data.getAllBooks);
        return data.data.getAllBooks;
      })
    );


    this.AthorsList = this.graphqlService.getAllAuthor().pipe(
      map(data => {
        return data.data.getAllAuthors;
      })
    );


  }


  // getAllBook(): Book[] {
  //
  //
  //   return this.BookList$;
  // }
  //
  // getAllAuthors(): Authors[] {
  //
  //
  //   return this.AthorsList$;
  // }

  getAuthorByID(id: string): Authors | undefined {
    const author = this.AthorsList$.find(element => element.id === id);

    // console.log(this.AthorsList.pipe(
    //   find(element => element.id === id)));

    return author;
  }


  getBookByID(id: string): Book | undefined {
    const book = this.BookList$.find(element => element.id === id);
    return book;
  }


  getBookByID$(id: string): Observable<Book> {

    return this.BookList.pipe(
      map(data => {
        console.log('Data', data.find(element => element.id === id));
        return data.find(element => element.id === id);
      })
    );
  }


  getAllAuthorByBookId$(idList: string[]): Observable<Authors[]> {

    return this.AthorsList.pipe(
      map(data => {
        let newData: Authors[] = [];

        data.forEach(element => {
          if (idList.includes(element.id)) {
            newData.push(element);
          }
        });

        return newData;
      })
    );


  }


  getAuthorByID$(id: string): Observable<Authors> {

    return this.AthorsList.pipe(
      map(data => {
        let newDate: Authors;

        data.forEach(element => {
          if (id === element.id) {
            newDate = element;
          }
        });
        console.log('getAuthorByID$', newDate);
        return newDate;
      })
    );


  }


  getBookByGenre(genre: string): Book[] | undefined {
    let bookList: Book[] = [];
    this.BookList$.forEach(element => {
      if (element.genre === genre) {
        bookList.push(element);
      }

    });

    return bookList;
  }

  getBookByGenre$(genre: string): Observable<Book[]> {

    return this.BookList.pipe(
      map(data => {
        let bookList: Book[] = [];

        data.forEach(element => {
          if (element.genre === genre) {
            bookList.push(element);
          }
        });
        return bookList;
      })
    );


  }


  getAllGenre(): string[] | undefined {
    let genreList: string[] = [];

    this.BookList$.forEach(element => {
      if (genreList.indexOf(element.genre) === -1) {
        genreList.push(element.genre);
      }

    });
    return genreList;
  }

  getBooksByID(idList: string[]): Book[] | undefined {
    const booksList: Book[] = [];

    for (const id of idList) {
      const book = this.BookList$.find(element => element.id === id);
      if (book !== undefined) {
        booksList.push(book);
      }
    }


    return booksList;
  }

  getBooksByID$(idList: string[]): Observable<Book[]> {


    return this.BookList.pipe(
      map(data => {
        const booksList: Book[] = [];
        for (let id of idList) {
          const book = data.find(element => element.id === id);
          if (book !== undefined) {
            booksList.push(book);
          }
        }
        return booksList;
      })
    );


  }


  getAuthorsByID(idList: string[]): Authors[] | undefined {
    const authorList: Authors[] = [];

    for (const id of idList) {
      const author = this.AthorsList$.find(element => element.id === id);
      if (author !== undefined) {
        authorList.push(author);
      }
    }


    return authorList;
  }
}



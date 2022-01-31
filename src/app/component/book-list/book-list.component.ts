import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {Book} from '../../dao/book';
import {Authors} from '../../dao/authors';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  bookList: Book[];
  AuthorList: Authors[] = [];

  sub1: Subscription;
  sub2: Subscription;

  // authorsList$ = new BehaviorSubject(this.dataService.AthorsList);


  constructor(public dataService: DataService) {

    this.sub1 = this.dataService.AthorsList.subscribe(
      data => {
        this.AuthorList = data;
        this.sub2 = this.dataService.BookList.subscribe(dataBook => {
          this.bookList = dataBook;
        });
      }
    );

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  ngOnInit(): void {
    // console.log('Book list ', this.dataService.getAllBook());
    // console.log(this.dataService.BookList$);
    // this.bookList = this.dataService.getAllBook();
    // console.log(this.authorsList$.getValue());

  }

  getAuthorByID(id: string): string {

    const author: Authors = this.AuthorList.find(element => element.id === id);

    return author.fullName;

  }

}

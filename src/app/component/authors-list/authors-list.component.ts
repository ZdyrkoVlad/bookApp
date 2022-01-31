import {Component, OnDestroy, OnInit} from '@angular/core';
import {Authors} from '../../dao/authors';
import {DataService} from '../../service/data.service';
import {Book} from '../../dao/book';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit, OnDestroy {
  authorList: Authors[] = [];
  bookList: Book[] = [];

  sub1: Subscription;
  sub2: Subscription;

  constructor(private dataService: DataService) {
    this.sub1 = this.dataService.AthorsList.subscribe(
      data => {
        this.authorList = data;
        this.sub2 = this.dataService.BookList.subscribe(dataBook => {
          this.bookList = dataBook;
        });
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  getBookById(id: string): Book {

    const book = this.bookList.find(element => element.id === id);
    return book;
  }

}

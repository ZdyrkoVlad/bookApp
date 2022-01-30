import {Component, OnInit} from '@angular/core';
import {Authors} from '../../dao/authors';
import {DataService} from '../../service/data.service';
import {Book} from '../../dao/book';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {
  authorList: Authors[] = [];
  bookList: Book[] = [];

  constructor(private dataService: DataService) {
    this.dataService.AthorsList.subscribe(
      data => {
        this.authorList = data;
        this.dataService.BookList.subscribe(dataBook => {
          this.bookList = dataBook;
        });
      }
    );
  }

  ngOnInit(): void {
  }

  getBookById(id: string): Book {

    const book = this.bookList.find(element => element.id === id);
    return book;
  }

}

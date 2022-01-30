import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Authors} from '../../dao/authors';
import {DataService} from '../../service/data.service';
import {Book} from '../../dao/book';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  id: string;
  author$: Observable<Authors>;
  bookList: Book[] = [];
  author: any = '';

  constructor(private activateRoute: ActivatedRoute,
              private dataService: DataService,
  ) {

    this.id = activateRoute.snapshot.params['id'];

    this.dataService.AthorsList.subscribe(
      data => {
      }
    );


    this.dataService.getAuthorByID$(this.id).subscribe(
      data => {
        this.author = data;
        this.dataService.getBooksByID$(this.author.bookListId).subscribe(
          dataBook => {
            this.bookList = dataBook;
          }
        );
      }
    );

    // this.bookList = dataService.getBooksByID(this.author.bookListId);

    // this.dataService.sbj.subscribe(
    //   data => {
    //     this.bookList = data;
    //     console.log(this.bookList);
    //   }
    // );

  }

  ngOnInit(): void {


  }

}

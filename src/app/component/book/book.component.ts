import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../dao/book';
import {DataService} from '../../service/data.service';
import {Authors} from '../../dao/authors';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  id: string;
  book: Book;
  authorsList: Authors[];

  book$: Observable<Book>;
  authorsList$: Observable<Authors[]>;



  constructor(private activateRoute: ActivatedRoute,
              private dataService: DataService) {

    this.id = activateRoute.snapshot.params['id'];
    // this.book = this.dataService.getBookByID(this.id);
    // this.authorsList = this.dataService.getAuthorsByID(this.book.authorsId);

    console.log('this.id', this.id);

    this.book$ = this.dataService.getBookByID$(this.id);
    this.book$.subscribe(data => {
        this.authorsList$ = this.dataService.getAllAuthorByBookId$(data.authorsId);
        return data;
      }
    );
    // this.book = await this.dataService.getBookByID$(this.id);

  }


  ngOnInit(): void {
    console.log('this.id ng on init', this.id);
    console.log(this.book$.pipe(
      map((data: Book) => {
        return data.authorsId;
      })));
  }

}

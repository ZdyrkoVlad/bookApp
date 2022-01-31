import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {startWith, map, take} from 'rxjs/operators';
import {Book} from '../../dao/book';
import {DataService} from '../../service/data.service';
import {Router} from '@angular/router';


export interface User {
  name: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  filteredOptionsAuthor: Observable<string[]>;
  filteredOptionsGenre: Observable<string[]>;

  BookList: Book[];

  BookNameList: string[] = [];
  BookListId: string[] = [];

  BookGanreList: string[] = [];

  AuthorList: string[] = [];
  AuthorListId: string[] = [];


  sub1: Subscription;
  sub2: Subscription;

  constructor(private dataService: DataService, private router: Router) {


  }


  routAuthor(id: string) {
    console.log('routAuthor', id);

    this.router.navigate(['/author', id]);
  }

  routBook(id: string) {
    console.log('routBook', id);

    this.router.navigate(['/book', id]);
  }

  ngOnInit() {

    this.sub1 = this.dataService.AthorsList.pipe(
      take(1)
    ).subscribe(data => {

      data.forEach(element => {
        this.AuthorList.push(element.fullName);
        this.AuthorListId.push(element.id);
        console.log('Author list', this.AuthorList, this.AuthorListId);
      });

      console.log(this.BookNameList, this.BookListId);

      this.filteredOptionsAuthor = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterAuthor(value)),
      );


    });

    this.sub2 = this.dataService.BookList.pipe(
      take(1)
    ).subscribe(
      data => {
        data.forEach(element => {

          this.BookNameList.push(element.name);
          this.BookListId.push(element.id);
          console.log('Data Book ', this.BookNameList, this.BookListId);

          if (!this.BookGanreList.includes(element.genre)) {
            this.BookGanreList.push(element.genre);
          }

        });

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {

            return this._filter(value);
          }),
        );

        this.filteredOptionsGenre = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterGanre(value)),
        );


      }
    );


  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log('Value', this.BookNameList);


    return this.BookNameList.filter(option => option.toLowerCase().includes(filterValue));
  }


  private _filterGanre(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.BookGanreList.filter(option => option.toLowerCase().includes(filterValue));
  }


  private _filterAuthor(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.AuthorList.filter(option => option.toLowerCase().includes(filterValue));
  }


}

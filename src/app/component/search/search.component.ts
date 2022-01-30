import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
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
export class SearchComponent implements OnInit {

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
    this.dataService.AthorsList.pipe(
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

    this.dataService.BookList.pipe(
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

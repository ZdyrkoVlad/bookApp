import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, interval} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';
import {DataService} from '../../service/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private dataSevice: DataService, private router: Router) {

    this.dataSevice.BookList.pipe(
      take(1)
    ).subscribe(
      puls => {

        this.options = ['One', 'Two', 'Three'];
        console.log(this.options);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
      }
    );

  }

  ngOnInit() {


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}

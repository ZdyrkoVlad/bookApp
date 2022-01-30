import {Component, OnInit} from '@angular/core';
import {Book} from '../../dao/book';
import {Authors} from '../../dao/authors';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genre: string;
  books: Book[];
  authorList: Authors[];

  constructor(private activateRoute: ActivatedRoute,
              private dataService: DataService) {

    this.genre = activateRoute.snapshot.params['type'];
    this.dataService.getBookByGenre$(this.genre).subscribe(data => {
      this.books = data;
    });

    this.dataService.AthorsList.subscribe(
      data => {
        this.authorList = data;
      }
    );


  }

  ngOnInit(): void {
    console.log('this.genre', this.genre, this.books);
  }

  getAuthorByID(id: string): Authors {
    let author: Authors;

    this.authorList.forEach(
      element => {
        if (element.id === id) {
          author = element;
        }
      }
    );

    return author;

  }


}

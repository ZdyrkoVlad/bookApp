import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookComponent} from './component/book/book.component';
import {BookListComponent} from './component/book-list/book-list.component';
import {AuthorComponent} from './component/author/author.component';
import {AuthorsListComponent} from './component/authors-list/authors-list.component';
import {TestComponent} from './component/test/test.component';
import {GenreComponent} from './component/genre/genre.component';


const routes: Routes = [
  {path: '', component: BookListComponent},
  {path: 'author/:id', component: AuthorComponent},
  {path: 'book/:id', component: BookComponent},
  {path: 'authors', component: AuthorsListComponent},
  {path: 'genre/:type', component: GenreComponent},
  {path: 'test', component: TestComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

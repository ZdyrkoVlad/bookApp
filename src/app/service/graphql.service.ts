import {Injectable} from '@angular/core';
import {Book} from 'src/app/dao/book';
import {Authors} from '../dao/authors';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client';
import {map} from 'rxjs/operators';

const getBooks = gql`
  query{
    getAllBooks{
      id,
      authorsId,
      name,
      shortContext,
      genre
    }

  }`;


const getAuthors = gql`
  query  {
    getAllAuthors{
      id,
      fullName,
      biography,
      bookListId
    }

  }`;


@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo,
              ) {
  }

  getAllBook() {
    return this.apollo.watchQuery<any>({
      query: getBooks,
    }).valueChanges;
  }

  getAllAuthor() {
    return this.apollo.watchQuery<any>({
      query: getAuthors,
    }).valueChanges;
  }


}

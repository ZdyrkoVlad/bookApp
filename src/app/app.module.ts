import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookListComponent} from './component/book-list/book-list.component';
import {AuthorsListComponent} from './component/authors-list/authors-list.component';
import {AuthorComponent} from './component/author/author.component';
import {BookComponent} from './component/book/book.component';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {SearchComponent} from './component/search/search.component';
import {DataService} from 'src/app/service/data.service';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';

import {GraphqlService} from './service/graphql.service';
import {TestComponent} from './component/test/test.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MatInputModule} from '@angular/material/input';
import {GenreComponent} from './component/genre/genre.component';
import {Apollo} from 'apollo-angular';
import {HttpClient} from '@angular/common/http';
import {DefaultOptions, InMemoryCache, split} from '@apollo/client';
import {HttpLink} from 'apollo-angular/http';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getOperationAST} from 'graphql';
import {HttpClientModule} from '@angular/common/http';

// import {StoreModule} from '@ngrx/store';
// import { reducers, metaReducers } from './reducers';
// import {StoreDevtoolsModule} from '@ngrx/store-devtools';
// import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    AuthorsListComponent,
    AuthorComponent,
    BookComponent,
    SearchComponent,
    TestComponent,
    GenreComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    AppRoutingModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,

    ReactiveFormsModule,
    AutocompleteLibModule,
    BrowserModule,
    // StoreModule.forRoot(reducers, {
    //   metaReducers
    // }),
    // StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

  ],
  providers: [GraphqlService, DataService],
  exports: [MatAutocompleteModule],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    apollo: Apollo,
    private httpClient: HttpClient,
    httpLink: HttpLink,
  ) {


    this.initApollo('localhost:9902', httpLink, apollo);

    const DEBUG = true;
    if (!DEBUG) {
      console.log = () => {
      };
      if (typeof (window.console) !== 'undefined') {
        window.console.log = () => {
        };
        window.console.debug = () => {
        };
        window.console.info = () => {
        };
        window.console.warn = () => {
        };
        window.console.error = () => {
        };

      }
    }


  }


  private initApollo<T>(serverUrlConnection: string, httpLink: HttpLink, apollo: Apollo) {
    const http = httpLink.create({
      uri: 'http://' + serverUrlConnection + '/graphql'
    });

    const ws = new WebSocketLink({
      uri: `ws://` + serverUrlConnection + `/subscriptions`,
      options: {
        reconnect: true
      }
      ,
    });


    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      operation => {
        const operationAST = getOperationAST(operation.query, operation.operationName);
        return !!operationAST && operationAST.operation === 'subscription';
      },
      ws,
      http
    );

    const cache = new InMemoryCache();

    const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    };
    apollo.create({
      link,
      cache,
      defaultOptions,
      name: 'ApolloSecond'
    });

  }
}

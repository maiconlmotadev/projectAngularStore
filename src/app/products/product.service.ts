import {Injectable} from "@angular/core";
import {IProduct} from "./product";
import {HttpClient} from "@angular/common/http";
import {Observable, catchError, tap, throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {

  private productUrl= "api/products/products.json";
  private err: any;

  constructor(private http: HttpClient) {

  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(this.handleError)
    )

  }

  private handleError() {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (this.err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${this.err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${this.err.status}, error message is: ${this.err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}


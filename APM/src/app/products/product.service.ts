import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProduct } from './product';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private productUrl = 'api/products/products.json';

	constructor(private http: HttpClient) {}

	getProducts(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>(this.productUrl).pipe(
			tap(data => console.log('Data: ' + JSON.stringify(data))),
			catchError(this.handleError)
		);
	}

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

	// getProducts(): IProduct[] {
	// 	return [
	//   {
	//     "productId": 5,
	//     "productName": "Hammer",
	//     "productCode": "TBX-0048",
	//     "releaseDate": "May 21, 2016",
	//     "description": "Curved claw steel hammer",
	//     "price": 8.9,
	//     "starRating": 4.8,
	//     "imageUrl": "https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
	//   },
	//   {
	//     "productId": 8,
	//     "productName": "Saw",
	//     "productCode": "TBX-0022",
	//     "releaseDate": "May 15, 2016",
	//     "description": "15-inch steel blade hand saw",
	//     "price": 11.55,
	//     "starRating": 3.7,
	//     "imageUrl": "https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
	//   },
	//   {
	//     "productId": 10,
	//     "productName": "Video Game Controller",
	//     "productCode": "GMG-0042",
	//     "releaseDate": "October 15, 2015",
	//     "description": "Standard two-button video game controller",
	//     "price": 35.95,
	//     "starRating": 4.6,
	//     "imageUrl": "https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
	//   }
	// 	]
	// }

}

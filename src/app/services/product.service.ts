import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(public http: HttpClient) { }

  public BASE_URL = 'https://ubi-product-backend.herokuapp.com';

  public current: any[];
  public queue: any[];

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/products/all`);
  }

  getCurrent(): any[] {
    return this.current;
  }

  setCurrent(curr: any[]) {
    this.current = curr;
  }

  getQueue(): any[] {
    return this.queue;
  }

  setQueue(curr: any[]) {
    this.queue = curr;
  }

  addProduct(data: FormData): Observable<any> {
    return this.http.post(`${this.BASE_URL}/products`, data).pipe(tap(_ => console.log('added successfully')));
  }
}

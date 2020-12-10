import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}
  readonly baseURL = 'http://localhost:3000/items';

  getItems() {
    return this.http.get(this.baseURL);
  }
}

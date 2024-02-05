import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormData } from '../interfaces/form-data';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private __HttpClient: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.__HttpClient.get('http://localhost:3000/data');
  }
  addUser(data: FormData): Observable<any> {
    return this.__HttpClient.post('http://localhost:3000/data', data);
  }
  deleteUser(id: string): Observable<any> {
    return this.__HttpClient.delete(`http://localhost:3000/data/${id}`);
  }
  getSingleUser(id: string): Observable<any> {
    return this.__HttpClient.get(`http://localhost:3000/data/${id}`);
  }
  editSingleUser(id: string,data: FormData): Observable<any> {
    return this.__HttpClient.put(`http://localhost:3000/data/${id}`,data);
  }
}
// `${this.apiUrl}/posts/${id}`;

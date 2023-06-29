import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private url = 'http://localhost:8085/api/windData';
   
  constructor(private httpClient: HttpClient) { }
  
  insertData(data): Observable<any>{
    return this.httpClient.post(this.url, data);
  }

  getDateTime(wdatetime): Observable<any>{
    return this.httpClient.get<any>(`${this.url}/${wdatetime}`);
  }

  deleteAll(): Observable<any>{
    return this.httpClient.delete(this.url);
  }



  
}
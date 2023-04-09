import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsInterface } from '../interfaces/options.interface';

const URL= "http://localhost:3000/api/info"

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private httpClient: HttpClient) { }
  
  getData(options: OptionsInterface): Observable<any> {
    return this.httpClient.get(`${URL}?page=${options.page}&sort=${options.sort}&order=${options.order}&search=${options.searchValue}&size=${options.limit}`);
  }
}

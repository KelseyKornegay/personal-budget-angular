
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private myData : any;

  getData(){
    return this.myData;
  }

  setData(data: any) {
    this.myData = data;
  }

  constructor(private http: HttpClient) { }
}

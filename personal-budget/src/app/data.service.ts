
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private myData : any;

  getData(){
    console.log("this is before>>>>>> setting the DATA", this.myData);

    return this.myData;
  }

  setData(data: any) {
    console.log("this is after<<<<<< setting the DATA", this.myData);
    this.myData = data;
  }

  constructor(private http: HttpClient) { }
}

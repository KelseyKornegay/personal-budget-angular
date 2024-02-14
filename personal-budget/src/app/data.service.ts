
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private myData : any;

  public getData(){
    console.log("this is before>>>>>> setting the DATA", this.myData);

    return this.myData;
  }

  public setData(data: any) {
    console.log("this is after<<<<<< setting the DATA", this.myData);
    this.myData = data;
  }

  constructor(private http: HttpClient) { }

  public getBudget() : Observable<any> {
    return this.http.get('http://localhost:3000/budget');
  }
}


/* add this to donut.ts
this.d3.getBudgetData().subscribe((responseData:any) => {
  */

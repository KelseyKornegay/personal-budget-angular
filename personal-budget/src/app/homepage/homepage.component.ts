
/*
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
    {
      data: [''],
      backgroundColor: [
      "#ffcd56",
      "#ff6384",
      "#36a2eb",
      "#fd6b19",
      "#83FF33",
      "#F633FF",
      "#FF3333",
      ],
    },
    ],
    labels: [''],
  };


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.createChart();
    }
    });
  }

   createChart() {
    var ctx = <HTMLCanvasElement> document.getElementById("myChart");
    var myPieChart = new Chart(ctx, {
    type: "pie",
    data: this.dataSource,
    });
  }
}
*/

import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common'; // Import the isPlatformBrowser function

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  public dataSource = {
    datasets: [{
      data: [''],
      backgroundColor: [
        "#ffcd56",
        "#ff6384",
        "#36a2eb",
        "#fd6b19",
        "#83FF33",
        "#F633FF",
        "#FF3333",
      ],
    }],
    labels: [''],
  };

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) { // Check if running in the browser environment
      this.createChart();
    }
  }

  createChart(): void {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    if (ctx) {
      const myPieChart = new Chart(ctx, {
        type: "pie",
        data: this.dataSource,
      });
    } else {
      console.error("Canvas element with id 'myChart' not found.");
    }
  }
}

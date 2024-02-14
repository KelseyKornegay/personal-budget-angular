import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common'; // Import the isPlatformBrowser function
import { DataService } from '../data.service';

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

 // @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>; //suggested change

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private myDataService: DataService) { }

  // ngOnInit(): void {
  //   //if (this.myDataService.getData() == null) {
  //     this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
  //       for (let i = 0; i < res.myBudget.length; i++) {
  //         this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
  //         this.dataSource.labels[i] = res.myBudget[i].title;
  //       }
  //           console.log("This data is being set", this.dataSource.datasets[0], this.dataSource.labels);
  //       this.myDataService.setData(this.dataSource);
  //       this.createChart();
  //     });
  //   }

  ngOnInit(): void {
    this.myDataService.getBudget().subscribe((responseData: any) => {
      const data = responseData.myBudget;
      const datasets = [{
        data: data.map((item: { budget: any; }) => item.budget),
        backgroundColor: this.dataSource.datasets[0].backgroundColor, // Use the predefined backgroundColor
      }];
      const labels = data.map((item: { title: any; }) => item.title);
      const newData = { datasets, labels };
      this.myDataService.setData(newData);
      this.createChart();
    });
  }


  ngAfterViewInit(): void {

  }

createChart(): void {
  const ctx = document.getElementById("myChart") as HTMLCanvasElement;
  if (ctx) {
    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: this.myDataService.getData(),
    });
  } else {
    console.error("Canvas element with id 'myChart' not found.");
  }
}
}

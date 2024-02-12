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

  ngOnInit(): void {
    if (this.myDataService.getData() == null) {
      this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
        for (let i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
      });

      this.myDataService.setData(this.dataSource);
    }
  }

  ngAfterViewInit(): void {
    { this.createChart();
    }
  }

  /*createChart(): void {
    const ctx = this.myChart.nativeElement; // suggested change
    if (ctx) {
      const myPieChart = new Chart(ctx, {
        type: "pie",
        data: this.myDataService.getData(),
      });
    } else {
      console.error("Canvas element for the chart not found.");
    }
  }
} */

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

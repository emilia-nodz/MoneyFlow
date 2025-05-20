import { Component } from '@angular/core';
import { ChartsComponent } from "../charts/charts.component";

@Component({
  selector: 'app-home',
  imports: [ChartsComponent, ChartsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

import { Component } from '@angular/core';
import { BalanceComponent } from "../balance/balance.component";

@Component({
  selector: 'app-home',
  imports: [BalanceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

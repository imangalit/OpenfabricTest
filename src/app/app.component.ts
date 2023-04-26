import { Component } from '@angular/core';
import {DataExchangeService} from './data-exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-app';
  products: any;
  constructor(private dataExchangeService: DataExchangeService) { };
  ngOnInit() {
    this.dataExchangeService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}

import { Component } from '@angular/core';
import { DataExchangeService } from '../data-exchange.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: any;
  constructor(private dataExchangeService: DataExchangeService) { }
  ngOnInit() {
    this.dataExchangeService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DataExchangeService } from '../data-exchange.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent {
  product: any;
  productIdFromRoute: any;
  constructor(private dataExchangeService: DataExchangeService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = routeParams.get('productId');
    this.dataExchangeService.getProductDetail(this.productIdFromRoute).subscribe((data) => {
      this.product = data;
    })
  }
  isLogged() {
    return this.authService.isAuthenticated()
  }
  delete() {
    this.dataExchangeService.deleteProduct(this.productIdFromRoute).subscribe(
      product => console.log('Product deleted:', product),
      error => console.error('An error occurred:', error)
    )
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([``])
    });
  }
}

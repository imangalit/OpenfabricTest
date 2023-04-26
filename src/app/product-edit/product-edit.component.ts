import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { DataExchangeService } from '../data-exchange.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {
  product: any;
  editForm: FormGroup;
  productIdFromRoute: any;
  constructor(private route: ActivatedRoute, private router: Router, private dataExchangeService: DataExchangeService) {}
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = routeParams.get('productId');
    this.dataExchangeService.getProductDetail(this.productIdFromRoute).subscribe((data) => {
      this.product = data;
      this.editForm = new FormGroup({
        photo: new FormControl(this.product?.photo ?? "", Validators.required),
        name: new FormControl(this.product?.name ?? "", Validators.required),
        price: new FormControl(this.product?.price.toString() ?? "", [Validators.required, Validators.pattern("^[0-9]*$")]),
        description: new FormControl(this.product?.description ?? "", Validators.required)
      });
    })
  }
  updateDetails() {
    this.product.name = this.editForm.value.name
    this.product.price = this.editForm.value.price
    this.product.description = this.editForm.value.description
    this.product.photo = this.editForm.value.photo
    this.dataExchangeService.updateProduct(this.productIdFromRoute, this.product).subscribe(
      product => console.log('Product updated:', product),
      error => console.error('An error occurred:', error)
    )
    this.router.navigate(['products', this.product._id]);
  }
}

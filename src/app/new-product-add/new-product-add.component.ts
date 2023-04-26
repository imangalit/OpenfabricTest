import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../interfaces';
import { FormControl, FormGroup, FormsModule , Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { DataExchangeService } from '../data-exchange.service';

@Component({
  selector: 'app-new-product-add',
  templateUrl: './new-product-add.component.html',
  styleUrls: ['./new-product-add.component.css']
})

export class NewProductAddComponent implements OnInit {
  editForm: FormGroup;
  product: any;
  constructor(private router: Router, private dataExchangeService: DataExchangeService) {}
  ngOnInit() {
    this.editForm = new FormGroup({
      photo: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      price: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
      description: new FormControl("", Validators.required)
    });
  }
  get f(){
    return this.editForm.controls;
  }
  updateDetails() {
    this.product = (this.editForm.value)
    this.dataExchangeService.createProduct(this.product).subscribe(
      product => console.log('Product added:', product),
      error => console.error('An error occurred:', error)
    )
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([``])
    });
  }
}

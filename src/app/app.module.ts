import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProductAddComponent } from './new-product-add/new-product-add.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginpageComponent } from './loginpage/loginpage.component';

const appRoutes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'login', component: LoginpageComponent},
  {path: 'products/:productId', component: ProductDetailsComponent},
  {path: 'products/:productId/edit', component: ProductEditComponent},
  {path: 'add-new-product', component: NewProductAddComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductEditComponent,
    NewProductAddComponent,
    LoginpageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

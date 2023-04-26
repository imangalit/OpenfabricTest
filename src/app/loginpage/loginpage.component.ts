import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule , Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }
  get f(){
    return this.loginForm.controls;
  }
  login() {
    const val = this.loginForm.value
    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
          .subscribe(
              () => {
                  console.log("User is logged in");
                  this.router.navigateByUrl('/');
              }
          );
    }
  }
}

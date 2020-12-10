import { UsersService } from './../service/users/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  signupForm: FormGroup;
  submitted = true;
  obj: any;
  constructor(private userservice: UsersService) {}
  //:NgForm

  onSubmit() {
    this.obj = this.signupForm.controls.userData.value;
    this.userservice.getUserData(this.obj.email).subscribe(
      (response) => {
        if (response == null) {
          //Post data when its not present in database
          this.userservice.postItems(this.obj).subscribe(
            (response: any) => {
              this.userservice.savelocal(
                response.email,
                response.phonenumber,
                response.name
              );
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          this.userservice.savelocal(
            this.obj.email,
            this.obj.phonenumber,
            this.obj.name
          );
        }
        this.userservice.login.next(true);
        this.submitted = false;
      },
      (error) => console.log(error)
    );
  }
  ngOnInit(): void {
    let a = this.userservice.getlocal();
    if (a) this.submitted = false;
    else this.submitted = true;
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('[a-zA-Z ]+'),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phonenumber: new FormControl(null, [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
        ]),
        address: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
      }),
    });
  }
}

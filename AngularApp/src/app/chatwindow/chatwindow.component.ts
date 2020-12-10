import { UsersService } from './../service/users/users.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css'],
})
export class ChatwindowComponent implements OnInit {
  @ViewChild('target') private myScrollContainer: ElementRef;

  scrollToElement(): void {
    if (this.myScrollContainer) {
      this.myScrollContainer.nativeElement.scroll({
        top: this.myScrollContainer.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
  isClicked = false;
  submitted: Boolean = false;
  exit: Boolean = true;
  container = document.getElementById('box');
  constructor(private userservice: UsersService) {}
  passvalue = '';
  usermessage = '';
  ngAfterViewChecked(): void {
    this.userservice.message.subscribe((value: any) => {
      if (value[value.length - 1]) this.scrollToElement();
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.isClicked = true;
    }, 2000);
    this.searchbar();
  }

  searchbar() {
    let a = this.userservice.getlocal();
    this.userservice.login.subscribe((value) => {
      this.submitted = value;
    });
    if (a) this.submitted = true;
    else this.submitted = false;
    this.userservice.exit.subscribe((value) => (this.exit = value));
  }

  clicked() {
    if (this.isClicked) this.isClicked = false;
    else this.isClicked = true;
  }
  // options = ['Track current Order', 'Feedbacks & Complaints', 'Popular Items'];
  selectedValue(i) {
    this.passvalue = i;
  }

  parentFunction(value: string) {
    this.usermessage = value;
  }
}

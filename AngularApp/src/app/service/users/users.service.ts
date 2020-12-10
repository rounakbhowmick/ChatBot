import { User } from './../../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  allmsg: Array<Object>;
  message = new BehaviorSubject<Array<any>>([
    {
      message: `Hi 👋,
       How can I help you today?`,
      messagetype: 'message',
      type: 'bot',
      time: new Date(),
    },
    {
      message: `startoptions`,
      messagetype: 'list',
      type: 'bot',
      time: new Date(),
    },
  ]);
  constructor(private http: HttpClient) {}
  //  readonly baseURL = 'http://localhost:3000/users';
  readonly baseURL = 'https://pizaa-chatbot.herokuapp.com/users';

  //Post user details
  postItems(user) {
    return this.http.post(this.baseURL, user);
  }

  getOrderid(orderid) {
    return this.http.get(this.baseURL + '/' + 'orderid' + '/' + orderid);
  }
  savelocal(emailid, phonenumber, name) {
    localStorage.setItem('email', emailid);
    localStorage.setItem('phonenumber', phonenumber);
    localStorage.setItem('name', name);
  }

  //Getting data in local storage
  getlocal() {
    let email = localStorage.getItem('email');
    return email;
  }
  getUserData(email) {
    return this.http.get(this.baseURL + '/' + email);
  }
  storemessagetodatabase(messageobj) {
    let objFormat = {
      messages: messageobj[0],
    };
    console.log(objFormat);
    this.addinfo(objFormat).subscribe();
  }
  addmessage(messageObj) {
    this.storemessagetodatabase(messageObj);
    this.message.subscribe((value) => (this.allmsg = value));
    this.allmsg.push(messageObj[0]);
    this.message.next(this.allmsg);

    this.allmsg = [];
  }
  //Add IP and Ordered items
  addinfo(item) {
    let newurl = this.baseURL.concat('/' + localStorage.getItem('email'));
    return this.http.patch(newurl, item);
  }

  login = new BehaviorSubject<Boolean>(false);
  exit = new BehaviorSubject<Boolean>(true);
}

import { BotpredefinedmessagesService } from './../service/botpredefinedmessages/botpredefinedmessages.service';

import { MessageProperty } from './../../models/messageproperty';
import { UsersService } from './../service/users/users.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { format } from 'path';
import { error } from 'protractor';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  searchvalue = '';
  i = 0;
  botvalue = '';
  lastmsg;
  placeholder = 'Start a conversation';
  usermessageinfo: Array<MessageProperty> = [];
  botmessageinfo: Array<MessageProperty> = [];
  // @Output() parentFunction = new EventEmitter<String>();
  // @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  constructor(
    private userservice: UsersService,
    private messageplace: BotpredefinedmessagesService
  ) {}
  handleSubmit(e, myForm) {
    e.preventDefault();
    // if (e.keyCode === 13) {
    this.usermessageinfo.push({
      message: this.searchvalue,
      messagetype: 'message',
      type: 'user',
      time: new Date(),
    });
    // console.log(this.usermessageinfo);
    this.placeholder = '';
    this.userservice.addmessage(this.usermessageinfo);
    if (this.searchvalue != 'startoptions') {
      this.botmessage();
      myForm.reset();
      this.usermessageinfo = [];
    }
  }

  ngOnInit(): void {
    this.userservice.message.subscribe((response) => {
      this.lastmsg = response[response.length - 2];
    });
  }
  botmessage() {
    if (this.lastmsg.message.includes('Please enter your order id')) {
      let str = this.searchvalue.slice(0, 2);
      if (this.searchvalue.length == 7 && 'OD' == str) {
        this.userservice.getOrderid(this.searchvalue).subscribe(
          (response: any) => {
            if (response.length == 0) {
              this.botvalue = 'Invalid Order Id';
            } else {
              this.botvalue = 'You order is currently in transit';
              // console.log('Success');
            }
            this.savemsg();
            this.botvalue = 'startoptions';
            this.savemsg();
          },
          (error) => console.log(error)
        );
      } else {
        this.botvalue = 'Invalid Order Id';
        this.savemsg();
        this.botvalue = 'startoptions';
        this.savemsg();
      }
    } else {
      this.botvalue = this.messageplace.messages(this.searchvalue);
      this.savemsg();
    }
  }
  savemsg() {
    if (this.botvalue != '') {
      this.botmessageinfo.push({
        message: this.botvalue,
        messagetype: 'message',
        type: 'bot',
        time: new Date(),
      });
      this.userservice.addmessage(this.botmessageinfo);

      this.botmessageinfo = [];
    }
  }
  // getPlaceholder() {
  //   return
  // }
}

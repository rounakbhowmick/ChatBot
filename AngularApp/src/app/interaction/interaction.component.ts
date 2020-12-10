import { MessageProperty } from './../../models/messageproperty';
import { SysteminfoService } from './../service/systeminfo/systeminfo.service';
import { UsersService } from '../service/users/users.service';
import { ItemsService } from '../service/items/items.service';
import * as imgdata from '../imageinfo.json';
import { Item } from '../../models/item';
import { Component, OnInit, Input } from '@angular/core';
import { error, element } from 'protractor';
import { DeviceDetectorService } from 'ngx-device-detector';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css'],
})
export class InteractionComponent implements OnInit {
  usermessageinfo: Array<MessageProperty> = [];
  botmessageinfo: Array<MessageProperty> = [];
  constructor(
    private itemsService: ItemsService,
    private userservice: UsersService,
    private systeminfo: SysteminfoService
  ) {}
  Items = [];
  current = 0;
  foodtype: any;
  purchasedItems;
  currentDate: Date;
  filteritems: any;
  filteredlist: any;
  imgname: any;
  length;
  locked = false;
  imagepath = '../../assets/images/bot.png';
  message = '';
  background = '';
  color = '';
  imgurl = '';
  imgprice;
  imglocked;
  imgstatus;
  rightarrow = 'assets/images/right-arrow.svg';
  botmessage(val, msgtype, type) {
    this.botmessageinfo.push({
      message: val,
      messagetype: msgtype,
      type: type,
      time: new Date(),
    });
  }
  listclick(val) {
    if (val.name == 'Place an Order' || val.name == 'Place a new Order') {
      this.botmessage('Place an Order', 'message', 'user');
    } else if (val.name == 'Veg') {
      this.botmessage('Veg', 'message', 'user');
    } else if (val.name == 'Non-Veg') {
      this.botmessage('Non-Veg', 'message', 'user');
    } else if (val.name == 'Track') {
      this.botmessage('Please enter your order id', 'message', 'bot');
    } else if (val.name == 'Offers') {
      this.botmessage(
        'All Users - Flat 35% OFF | Minimum Rs 200 Order',
        'message',
        'bot'
      );
      this.botmessage('afteroffers', 'list', 'bot');
    } else if (val.name == 'Exit') {
      this.botmessage(
        'Are you sure you want to leave this conversation?',
        'message',
        'bot'
      );
      this.botmessage('confirmation', 'list', 'bot');
      // this.exit();
    } else if (val.name == 'Yes') {
      this.botmessage('Yes', 'message', 'user');
      this.botmessage(
        'Please don’t hesitate to use our live chat service again in future. We’re always here to help.  I hope to hear from you soon.',
        'message',
        'bot'
      );
      this.exit();
    } else if (val.name == 'No') {
      this.botmessage('No', 'message', 'user');
      this.botmessage('startoptions', 'list', 'bot');
    }
    this.botmessageinfo.forEach((element) => {
      // console.log(element);
      this.userservice.addmessage([element]);
    });
    // this.userservice.addmessage(this.botmessageinfo);
    this.botmessageinfo = [];
  }
  startoptions = [
    {
      name: 'Place an Order',
    },
    {
      name: 'Track',
    },
    {
      name: 'Offers',
    },
  ];
  afteroffers = [
    {
      name: 'Place an Order',
    },
    {
      name: 'Track',
    },
  ];
  endoptions = [
    {
      name: 'Place a new Order',
    },
    {
      name: 'Track',
    },
    {
      name: 'Offers',
    },
    {
      name: 'Exit',
    },
  ];
  confirmation = [
    {
      name: 'Yes',
    },
    {
      name: 'No',
    },
  ];
  types = [
    {
      name: 'Veg',
    },
    {
      name: 'Non-Veg',
    },
  ];
  //Checking whether generated value exists in db or not
  async check(generatedvalue) {
    await this.userservice.getOrderid(generatedvalue).subscribe(
      (response) => {
        if (Object.keys(response).length == 0) {
          return true;
        } else return false;
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
    return false;
  }
  orderidgencontroller() {
    let finalvalue = '';
    while (true) {
      let generatedvalue = this.OrderIDGEN();
      if (this.check(generatedvalue)) {
        finalvalue = generatedvalue;
        break;
      }
    }

    return finalvalue;
  }

  changeImageType(i) {
    if (i.message == 'Veg' || i.message == 'Non-Veg') {
      i.message === 'Veg'
        ? (this.foodtype = imgdata.vegpizaa)
        : (this.foodtype = imgdata['non-vegpizaa']);
      this.imgurl = this.foodtype[this.current]['url'];
      this.imgname = this.foodtype[this.current]['name'];
      this.imgprice = this.foodtype[this.current]['price'];
      this.imgstatus = this.foodtype[this.current]['status'];
      this.imglocked = this.foodtype[this.current]['locked'];
      this.length = this.foodtype.length;
      return true;
    }
    return false;
  }
  disabled() {
    if (this.current == this.length - 1) return true;
  }
  alreadypurchasedstatus() {
    //Checking whether user purchased any goods or not,if yes then changing the status from "Buy" to "Purchased"
    this.userservice.getUserData(localStorage.getItem('email')).subscribe(
      (response: any) => {
        if (response != null && response.orderedItems != undefined) {
          console.log(response.orderedItems);
          this.purchasedItems = response.orderedItems.map((val) => ({
            name: val.name,
            foodtype: val.foodtype,
          }));

          this.changePurchasedValue();
        }
      },
      (error) => console.log(error)
    );
  }
  ngOnInit(): void {
    //console.log(this.orderidgencontroller());
    //Get Users IP Address
    // this.systeminfo.getIPAddress().subscribe(
    //   (response) => this.userservice.addinfo(response).subscribe(),
    //   (error) => console.log(error)
    // );
    //Shortcut
    this.alreadypurchasedstatus();
    this.systeminfo
      .getIPAddress()
      .pipe(switchMap((response) => this.userservice.addinfo(response)))
      .subscribe();

    const sysInfo = this.systeminfo.deviceinformation();
    const newObjectFormat = {
      systeminfo: {
        browser: sysInfo.browser,
        browser_version: sysInfo.browser_version,
        os: sysInfo.os_version,
      },
    };
    this.userservice.addinfo(newObjectFormat).subscribe();

    this.userservice.message.subscribe((value) => {
      this.filteritems = value;
    });

    this.currentDate = new Date();
  }

  //Disabling purchased button and changing it "Buy" to "Purchase"
  changePurchasedValue() {
    Object.values(this.purchasedItems).forEach((val: any) => {
      let purchasedtype;
      val.foodtype === 'Veg'
        ? (purchasedtype = imgdata['vegpizaa'])
        : (purchasedtype = imgdata['non-vegpizaa']);
      Object.values(purchasedtype).forEach((itemname: any) => {
        if (itemname.name == val.name) {
          itemname.status = 'Purchased';
          itemname.locked = true;
        }
      });
    });
  }

  exit() {
    this.userservice.exit.next(false);
  }

  //Changing type user and value in html
  changetype(val) {
    if (val.type == 'bot' && val.message == 'items') {
      return false;
    } else if (val.type == 'bot') {
      this.imagepath = '../../assets/images/woman.png';
      this.message = val.message;
      this.background = 'background: #558679';
      this.color = 'color: rgb(255, 255, 255)';
      return true;
    } else if (val.type == 'user') {
      this.imagepath = '../../assets/images/man.png';
      this.message = val.message;
      // this.background = 'background:#16697a';
      this.background = 'background:#D33F49';
      this.color = 'color: rgb(255, 255, 255)';
      //this.color = 'color:222831';
      return true;
    }
  }
  OrderIDGEN() {
    let generatedOrderId = 'OD';
    const validchars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * validchars.length);
      generatedOrderId += validchars[index];
    }
    return generatedOrderId;
  }
  //When users clicks the food item storing in db
  clickedProduct(i) {
    let id = this.orderidgencontroller();
    let obj = {
      orderedItems: {
        name: this.imgname,
        pic: this.imgurl,
        foodtype: i.message,
        price: this.imgprice,
        orderid: id,
      },
    };
    let text = `Hello ${localStorage.getItem(
      'name'
    )},Your order has been placed.Use this orderid to track your item ${id}`;
    this.botmessage(text, 'message', 'bot');
    this.botmessage('endoptions', 'list', 'bot');
    this.botmessageinfo.forEach((element) => {
      // console.log(element);
      this.userservice.addmessage([element]);
    });

    this.botmessageinfo = [];
    this.userservice.addinfo(obj).subscribe(
      (response) => {
        console.log(response);
        this.foodtype[this.current]['status'] = 'Purchased';
        this.foodtype[this.current]['locked'] = true;
      },
      (error) => console.log(error)
    );
  }
}

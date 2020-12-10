import { UsersService } from './../users/users.service';
import { Injectable } from '@angular/core';
import data from '../../predefinedmessage.json';

@Injectable({
  providedIn: 'root',
})
export class BotpredefinedmessagesService {
  constructor(private userservice: UsersService) {}
  temp;
  messages(value) {
    value = value.toLowerCase();
    console.log(value);
    value = value.replace(/"|'|-/gi, '');

    if (
      value.includes('hi') ||
      value.includes('hello') ||
      value.includes('hey') ||
      value.includes('whatsup')
    ) {
      return data.intro[Math.floor(Math.random() * data.intro.length)];
    } else if (value.includes('status') || value.includes('track')) {
      return 'startoptions';
    } else if (value.includes('thank')) {
      return data.thank[Math.floor(Math.random() * data.thank.length)];
    } else if (
      value.includes('bye') ||
      value.includes('good night') ||
      value.includes('by')
    ) {
      this.userservice.exit.next(false);
      return 'Please don’t hesitate to use our live chat service again in future. We’re always here to help.  I hope to hear from you soon.';
    } else if (value.includes('who'))
      return data.Ema[Math.floor(Math.random() * data.Ema.length)];
    else if (
      value.includes('how are you') ||
      value.includes('how are u') ||
      value.includes('how r u')
    )
      return data.greetings[Math.floor(Math.random() * data.greetings.length)];
    else if (value.includes('offer'))
      return data.offers[Math.floor(Math.random() * data.offers.length)];
    else if (value.includes('complaint') || value.includes('issue'))
      return data.complaints[
        Math.floor(Math.random() * data.complaints.length)
      ];
    else if (
      value.includes('ok') ||
      value.includes('fine') ||
      value.includes('got it')
    )
      return data.ok[Math.floor(Math.random() * data.ok.length)];
    else if (value.includes('hobbies')) {
      return data.hobbies[Math.floor(Math.random() * data.hobbies.length)];
    } else if (
      value.includes('items') ||
      value.includes('order piza') ||
      value.includes('popular pizza') ||
      value.includes('popular product') ||
      value.includes('order item') ||
      value.includes('oder') ||
      value.includes('food item') ||
      value.includes('place order') ||
      value.includes('order pizaa') ||
      value.includes('order pizza') ||
      value.includes('order')
    ) {
      return 'Place an Order';
    } else if (value.includes('nonveg')) {
      return 'Non-Veg';
    } else if (value.includes('veg')) {
      return 'Veg';
    } else {
      return 'Can you please rephrase the question?';
    }
    // return this.temp;
  }
}

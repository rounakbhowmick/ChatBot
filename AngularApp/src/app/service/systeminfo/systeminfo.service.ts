import { DeviceDetectorService } from 'ngx-device-detector';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SysteminfoService {
  deviceInfo = null;
  constructor(
    private http: HttpClient,
    private deviceService: DeviceDetectorService
  ) {}
  public getIPAddress() {
    return this.http.get('https://api.ipify.org/?format=json');
  }
  deviceinformation() {
    return this.deviceService.getDeviceInfo();
  }
}

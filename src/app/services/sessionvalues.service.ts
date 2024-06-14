import { Topics } from './../classes/infrastructure/topics';
import { Injectable, isDevMode } from "@angular/core";
import { Platform } from "@ionic/angular";
import { ServiceInjector } from "../classes/infrastructure/injector";
import { DeviceOrientations, PlatformTypes } from "../classes/infrastructure/enums";

@Injectable({
  providedIn: "root",
})
export class SessionValues {
  public static GetInstance(): SessionValues {
    return ServiceInjector.AppInjector.get(SessionValues)
  }

  public PlatformType: PlatformTypes = PlatformTypes.Mobile;
  public DeviceOrientation: DeviceOrientations = DeviceOrientations.Portrait;

  public IsFullScreenRequested: boolean = false;

  public VJLicenseKey: string = '';
  public ProjectName: string = 'Velojewel'

  private m_isLoggedIn: boolean = false;

  public set IsLoggedIn(value: boolean) {
    if (isDevMode()) {
      localStorage.setItem('IsLoggedIn', String(value));
    }
    else {
      this.m_isLoggedIn = value;
    }
  }

  public get IsLoggedIn() {
    if (isDevMode()) {
      return !!localStorage.getItem('IsLoggedIn');
    }
    else {
      return this.m_isLoggedIn;
    }
  }

  public get isConnectedLocally() {
    return this.apiRoot.includes("localhost")
      || this.apiRoot.includes("127.0.0.1");
  }

  public static getCustomerIdentifier() {
    let urlString = location.origin;

    if (urlString.includes('localhost')) {
      return '';
    }

    urlString = urlString.substring(8);

    let urlParts = urlString.split('.');

    if (urlParts.length > 0) {
      return urlParts[0];
    }
    else {
      return '';
    }
  }

  public static getCustomerCodeForTopic() {
    let cCode = SessionValues.getCustomerIdentifier();
    if (cCode.trim().length == 0) cCode = "VJTEST";
    return cCode.toUpperCase();
  }

  private formulateAPIUrlString() {
    let customerIdentifier = SessionValues.getCustomerIdentifier();
    if (customerIdentifier.length > 0) {
      return `https://enscloud.in/${customerIdentifier}-vj-web-api/request`;
    }
    else {
      return `https://enscloud.in/vjdev-vj-web-api/request`;
      // return "https://localhost:5001/request";

    }
  }

  public get apiRoot(): string {
    return this.formulateAPIUrlString();
  }

  public UserName: string = 'test';
  public FullName: string = 'test';
  public CurrentLoginToken: number = 80000002;
  public CustomerLicenseNo: number = 800000;
  public CustomerName: string = 'test';

  public ClearAllStateValues = () => {
    this.UserName = '';
    this.FullName = '';
    this.CustomerName = '';
    this.setLoginTokenAndLicenseNo();
  }

  private setLoginTokenAndLicenseNo = () => {
    let customerIdentifier = SessionValues.getCustomerIdentifier();

    if (customerIdentifier == 'vjdev')
    {
      this.CurrentLoginToken = 80000002;
      this.CustomerLicenseNo = 800000;
    }
    else if (customerIdentifier == 'vjtest')
    {
      this.CurrentLoginToken = 80000102;
      this.CustomerLicenseNo = 800001;
    }
    else if (customerIdentifier == 'vjtest2')
    {
      this.CurrentLoginToken = 80000202;
      this.CustomerLicenseNo = 800002;
    }
    else if (customerIdentifier == '')
    {
      this.CurrentLoginToken = 80000002;
      this.CustomerLicenseNo = 800000;
    }
  }

  constructor(private platform: Platform) {
    this.ReadBoundValues();
    this.setLoginTokenAndLicenseNo();
  }

  public ReadBoundValues = () => {

  }

  isAuthenticated() {
    return this.CurrentLoginToken !== 0;
  }
}

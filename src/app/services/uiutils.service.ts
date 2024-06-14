import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServiceInjector } from '../classes/infrastructure/injector';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { isNullOrUndefined } from '../../tools';

class SwalResult {
  isConfirmed: boolean = false;
  isDenied: boolean = false;
  isDismissed: boolean = false;
}

@Injectable({
  providedIn: 'root'
})
export class UIUtils {
  public static GetInstance(): UIUtils {
    return ServiceInjector.AppInjector.get(UIUtils)
  }

  constructor(private alertController: AlertController) { }

  public GlobalUIErrorHandler = async (errMsg: string) => {
    await this.showErrorMessage('Error', errMsg);
  }

  public async showErrorMessage(title: string, msg: string,
    okHandler: () => Promise<void> = null as any) {
    let result = await Swal.fire(title, msg, 'error') as SwalResult;
    if (result.isConfirmed) {
      if (!isNullOrUndefined(okHandler)) {
        await okHandler();
      }
    }
    // const alert = await this.alertController.create({
    //   header: title,
    //   message: msg,
    //   buttons: [{
    //     text: 'OK',
    //     handler: okHandler
    //   }],
    //   backdropDismiss: false
    // });

    // await alert.present();
  }

  public async showInformationalMessage(title: string, msg: string,
    okHandler?: () => Promise<void>) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'OK',
        handler: okHandler
      }],
      backdropDismiss: false
    });

    await alert.present();
  }

  // public async askForConfirmation(title: string, msg: string,
  //   yesHandler?: () => void, noHandler?: () => void) {
  //   const alert = await this.alertController.create({
  //     header: title,
  //     message: msg,
  //     backdropDismiss: false,
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: yesHandler
  //       },
  //       {
  //         text: 'No',
  //         handler: noHandler
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  public async askForConfirmation(title: string, msg: string,
    yesHandler: () => Promise<void> = null as any,
    noHandler: () => Promise<void> = null as any) {
    let result = await Swal.fire(<SweetAlertOptions>{
      title: title,
      html: msg,
      showConfirmButton: true,
      showDenyButton: true
    }) as SwalResult;

    if (result.isConfirmed) {
      if (!isNullOrUndefined(yesHandler)) {
        await yesHandler();
      }
    }
    else if (result.isDenied) {
      if (!isNullOrUndefined(noHandler)) {
        await noHandler();
      }
    }

    // const alert = await this.alertController.create({
    //   header: title,
    //   message: msg,
    //   backdropDismiss: false,
    //   buttons: [
    //     {
    //       text: 'No',
    //       handler: noHandler
    //     },
    //     {
    //       text: 'Yes',
    //       handler: yesHandler
    //     }
    //   ]
    // });

    // await alert.present();
  }
  public async askForModalConfirmation(title: string, msg: string,
    yesHandler: () => Promise<void> = null as any,
    noHandler: () => Promise<void> = null as any) {
    let result = await Swal.fire(<SweetAlertOptions>{
      title: title,
      html: msg,
      confirmButtonText: 'Yes',
      showDenyButton: true
    }) as SwalResult;

    if (result.isConfirmed) {
      if (!isNullOrUndefined(yesHandler)) {
        await yesHandler();
      }
    }
    else if (result.isDenied) {
      if (!isNullOrUndefined(noHandler)) {
        await noHandler();
      }
    }

    // const alert = await this.alertController.create({
    //   header: title,
    //   message: msg,
    //   backdropDismiss: false,
    //   buttons: [
    //     {
    //       text: 'No',
    //       handler: noHandler
    //     },
    //     {
    //       text: 'Yes',
    //       handler: yesHandler
    //     }
    //   ]
    // });

    // await alert.present();
  }
}

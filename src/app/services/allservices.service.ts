import { Injectable } from '@angular/core';
import { IconProviderService } from './icon-provider.service';
import { DTU } from './dtu.service';
import { RefAllocator } from './refallocator.service';
import { ServerCommunicatorService } from './server-communicator.service';
import { SessionControllerService } from './session-controller.service';
import { SessionValues } from './sessionvalues.service';
import { UIUtils } from './uiutils.service';
import { Utils } from './utils.service';
import { AppCommBus } from './app-comm-bus.service';
import { ServiceInjector } from '../classes/infrastructure/injector';

@Injectable({
  providedIn: 'root'
})
export class AllServices {
  public static GetInstance(): AllServices {
    return ServiceInjector.AppInjector.get(AllServices)
  }

  constructor(public readonly iconProvider: IconProviderService,
    public readonly dtu: DTU,
    public readonly refAllocator: RefAllocator,
    public readonly serverCommunicator: ServerCommunicatorService,
    public readonly sessionController: SessionControllerService,
    public readonly sessionValues: SessionValues,
    public readonly appCommBus: AppCommBus,
    public readonly uiUtils: UIUtils,
    public readonly utils: Utils) { }
}

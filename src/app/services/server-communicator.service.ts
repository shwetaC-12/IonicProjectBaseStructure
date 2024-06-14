import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionValues } from './sessionvalues.service';
import { TransactionResult } from '../classes/infrastructure/transactionresult';
import { TransportData } from '../classes/infrastructure/transportdata';
import { DataContainerService } from '../classes/infrastructure/datacontainer.service';
import { ServiceInjector } from '../classes/infrastructure/injector';
import { PayloadPacket } from '../classes/infrastructure/payloadpacket/payloadpacket';
import { FileTransferObject } from '../classes/infrastructure/filetransferobject';
import { isNullOrUndefined } from '../../tools';

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicatorService implements OnDestroy {
  public static GetInstance(): ServerCommunicatorService {
    return ServiceInjector.AppInjector.get(ServerCommunicatorService)
  }

  constructor(private http: HttpClient,
    private sessionValues: SessionValues) {

  }

  ngOnDestroy(): void {}

  public async FetchResult(apiRoot: string, method: string): Promise<TransactionResult>
  {
    try
    {
      let url = `${apiRoot}/${method}`;
      let request = this.http.get(url);

      let pktResult = await (request.toPromise()
          .then(resp => resp as PayloadPacket)
          .catch(err => {
            let tr: TransactionResult =
            {
              Successful: false,
              Message: err.statusText
            };

            return {
              Ref:1,
              PartNo: 1,
              TotalPartCount: 1,
              Sender: this.sessionValues.CurrentLoginToken,
              Topic: 'ServerToClientResponse',
              PayloadDescriptor: "TransactionResult",
              Payload: JSON.stringify(tr),
              TargetMethod: '',
              CoordinationId: 0
          };
          }));

      if (pktResult.PayloadDescriptor === "TransactionResult") {
        let result = (JSON.parse(pktResult.Payload) as TransactionResult);
        return result;
      }

      return null as any;
    }
    catch (error)
    {
      let result: TransactionResult =
      {
        Successful: false,
        Message: error as any
      }

      return result;
    }
  }

  private static readonly DocumentGenerationCodeCollectionName = "DocumentGenerationRequestCode";

  public async GetDocumentGenerationRequestCode(req: PayloadPacket) : Promise<TransactionResult>
  {
    let tr = await this.sendHttpRequest(req);
    if (!tr.Successful) return tr;

    let code = '';

    let td = JSON.parse(tr.Tag) as TransportData;
    let coll = DataContainerService.GetInstance().GetOrCreateCollection(td.MainData, ServerCommunicatorService.DocumentGenerationCodeCollectionName)!;
    for(let obj of coll.Entries)
    {
      code = (obj as any)["Code"] as string;
    }

    tr.Tag = code;

    return tr;
  }

  public async sendHttpRequest(pkt: PayloadPacket, method: string = 'acceptrequest',
    files: FileTransferObject[] = []) : Promise<TransactionResult> {
    try
    {
      let pktResult: PayloadPacket = null as any;

      let url = `${this.sessionValues.apiRoot}/${method}`;

      let strPkt = JSON.stringify(pkt);

      const formData = new FormData();

      let fileIndex = 0;

      for (let file of files)
      {
        if (!isNullOrUndefined(file))
        {
          if (file.id.length === 0)
          {
            fileIndex++;
            formData.append(`file_${fileIndex}`, file.rawFile as Blob, file.name);
          }
          else
          {
            formData.append(file.id, file.rawFile as Blob, file.name);
          }
        }
      }

      formData.append('info', strPkt);

      let request = this.http.post(url, formData);

      pktResult = await (request.toPromise()
          .then(resp => resp as PayloadPacket)
          .catch(err => {
            let tr: TransactionResult =
            {
              Successful: false,
              Message: err.statusText
            };

            return {
              Ref: 1,
              PartNo: 1,
              TotalPartCount: 1,
              Sender: this.sessionValues.CurrentLoginToken,
              Topic: 'ServerToClientResponse',
              PayloadDescriptor: "TransactionResult",
              Payload: JSON.stringify(tr),
              TargetMethod: ''
            };
          }));

      if (pktResult.PayloadDescriptor === "TransactionResult") {
        let result = (JSON.parse(pktResult.Payload) as TransactionResult);
        return result;
      }
    }
    catch (error)
    {
      let result: TransactionResult =
      {
        Successful: false,
        Message: error as any
      }

      return result;
    }

    return null as any;
  }

  public async GetRefs(apiRoot: string, req: PayloadPacket) : Promise<TransactionResult> {
    try
    {
      let url = `${apiRoot}/allocaterefs`;
      let body = JSON.stringify(req);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      let request = this.http.post(url, body, {headers: headers});

      let pktResult = await (request.toPromise()
          .then(resp => resp as PayloadPacket)
          .catch(err => {
            let tr: TransactionResult =
            {
              Successful: false,
              Message: err.statusText
            };

            return {
              Ref: 1,
              PartNo: 1,
              TotalPartCount: 1,
              Sender: this.sessionValues.CurrentLoginToken,
              Topic: 'ServerToClientResponse',
              PayloadDescriptor: "TransactionResult",
              Payload: JSON.stringify(tr),
              TargetMethod: '',
              CoordinationId: 0
          };
          }));

      if (pktResult.PayloadDescriptor === "TransactionResult") {
        let result = (JSON.parse(pktResult.Payload) as TransactionResult);
        return result;
      }

      return null as any;
    }
    catch (error)
    {
      let result: TransactionResult =
      {
        Successful: false,
        Message: error as any,
        Tag: null,
        TagType: ''
      }

      return result;
    }
  }

  public async GetProcessTokens(apiRoot: string, req: PayloadPacket) : Promise<TransactionResult> {
    try
    {
      let url = `${apiRoot}/allocateprocesstokens`;
      let body = JSON.stringify(req);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      let request = this.http.post(url, body, {headers: headers});

      let pktResult = await (request.toPromise()
          .then(resp => resp as PayloadPacket)
          .catch(err => {
            let tr: TransactionResult =
            {
              Successful: false,
              Message: err.statusText
            };

            return {
              Ref: 1,
              PartNo: 1,
              TotalPartCount: 1,
              Sender: this.sessionValues.CurrentLoginToken,
              Topic: 'ServerToClientResponse',
              PayloadDescriptor: "TransactionResult",
              Payload: JSON.stringify(tr),
              TargetMethod: ''
          };
          }));

      if (pktResult.PayloadDescriptor === "TransactionResult") {
        let result = (JSON.parse(pktResult.Payload) as TransactionResult);
        return result;
      }

      return null as any;
    }
    catch (error)
    {
      let result: TransactionResult =
      {
        Successful: false,
        Message: error as any,
        Tag: null,
        TagType: ''
      }

      return result;
    }
  }

  public async GetCurrentDateTime(apiRoot: string, req: PayloadPacket) : Promise<TransactionResult> {
    try
    {
      let url = `${apiRoot}/getcurrentdatetime`;
      let body = JSON.stringify(req);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      let request = this.http.post(url, body, {headers: headers});

      let pktResult = await (request.toPromise()
          .then(resp => resp as PayloadPacket)
          .catch(err => {
            let tr: TransactionResult =
            {
              Successful: false,
              Message: err.statusText
            };

            return {
              Ref: 1,
              PartNo: 1,
              TotalPartCount: 1,
              Sender: this.sessionValues.CurrentLoginToken,
              Topic: 'ServerToClientResponse',
              PayloadDescriptor: "TransactionResult",
              Payload: JSON.stringify(tr),
              TargetMethod: ''
          };
          }));

      if (pktResult.PayloadDescriptor === "TransactionResult") {
        let result = (JSON.parse(pktResult.Payload) as TransactionResult);
        return result;
      }

      return null as any;
    }
    catch (error)
    {
      let result: TransactionResult =
      {
        Successful: false,
        Message: error as any,
        Tag: null,
        TagType: ''
      }

      return result;
    }
  }

  public async LoginUser(apiRoot: string, req: PayloadPacket) : Promise<TransactionResult> {
    try
    {debugger
      let url = `${apiRoot}/loginsystemuser`;

      // let strPkt = JSON.stringify(req);

      // const formData = new FormData();

      // formData.append('info', strPkt);

      // let request = this.http.post(url, formData);

      let body = JSON.stringify(req);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let request = this.http.post(url, body, {headers: headers});

      let pktResult = await (request.toPromise()
          .then(resp => resp as PayloadPacket)
          .catch(err => {
            let tr: TransactionResult =
            {
              Successful: false,
              Message: err.statusText
            };

            return {
              Ref: 1,
              PartNo: 1,
              TotalPartCount: 1,
              Sender: this.sessionValues.CurrentLoginToken,
              Topic: 'ServerToClientResponse',
              PayloadDescriptor: "TransactionResult",
              Payload: JSON.stringify(tr),
              TargetMethod: ''
          };
          }));

      if (pktResult.PayloadDescriptor === "TransactionResult") {
        let result = (JSON.parse(pktResult.Payload) as TransactionResult);
        return result;
      }

      return null as any;
    }
    catch (error)
    {
      let result: TransactionResult =
      {
        Successful: false,
        Message: error as any,
        Tag: null,
        TagType: ''
      }

      return result;
    }
  }

  public async LogoutUser(apiRoot: string, req: PayloadPacket) : Promise<TransactionResult> {
    try
    {
      let url = `${apiRoot}/logoutsystemuser`;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      let request = this.http.post(url, req, {headers: headers});

      let pktResult = await (request.toPromise()
          .then(resp => resp as PayloadPacket)
          .catch(err => {
            let tr: TransactionResult =
            {
              Successful: false,
              Message: err.statusText
            };

            return {
              Ref: 1,
              PartNo: 1,
              TotalPartCount: 1,
              Sender: this.sessionValues.CurrentLoginToken,
              Topic: 'ServerToClientResponse',
              PayloadDescriptor: "TransactionResult",
              Payload: JSON.stringify(tr),
              TargetMethod: ''
          };
          }));

      if (pktResult.PayloadDescriptor === "TransactionResult") {
        let result = (JSON.parse(pktResult.Payload) as TransactionResult);
        return result;
      }

      return null as any;
    }
    catch (error)
    {
      let result: TransactionResult =
      {
        Successful: false,
        Message: error as any,
        Tag: null,
        TagType: ''
      }

      return result;
    }
  }

  public async GetDateTimeIntegerValue(apiRoot: string, dateString: string) : Promise<number> {
    try
    {
      let parts = dateString.split("/");
      let year = +parts[0];
      let month = +parts[1];
      let day = +parts[2];

      let url = `${apiRoot}/datetimeintegervalue/${year}/${month}/${day}`;

      let request = this.http.get(url);

      let result = await (request.toPromise()
          .then(resp => resp as number)
          .catch(_err => 0));

      return result;
    }
    catch (error)
    {
        return -1;
    }
  }

  public async GetDateTimeStringValue(apiRoot: string, dateValue: number) : Promise<string> {
    try
    {
      let url = `${apiRoot}/datetimestringvalue/${dateValue}`;

      let request = this.http.get(url);

      let result = await (request.toPromise()
          .then(resp => resp as string)
          .catch(err => err));

      return result;
    }
    catch (error)
    {
        return '';
    }
  }

  public async GetISOFormatDateTimeStringValue(apiRoot: string, dateValue: number) : Promise<string> {
    try
    {
      let url = `${apiRoot}/isoformatdatetimestringvalue/${dateValue}`;

      let request = this.http.get(url);

      let result = await (request.toPromise()
          .then(resp => resp as string)
          .catch(err => err));

      return result;
    }
    catch (error)
    {
        return '';
    }
  }
}

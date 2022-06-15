import { Injectable } from '@angular/core';
// import {PortalSession} from "../models/PortalSession";
import {User} from "../models/user";
// import {CryptoService} from "./crypto.service";
import {HttpClient} from "@angular/common/http";
import {Config} from "../models/config";

import {map} from "rxjs/operators";
import {Observable, Subject} from "rxjs";

import {AccountService} from "./account.service";

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {



  constructor( private http: HttpClient,
               private accountService: AccountService) { }


  // public connect(user: User, portal_secret: string) {
  //   // connect user to session
  //   // let connectresponse: any;
  //   // this.http.post(`${Config.phpUrl}/includes/connect.inc.php`, {User, portal_secret})
  //   //   .subscribe(
  //   //     data => {
  //   //       connectresponse = data;
  //   //     },
  //   //     error => {
  //   //       console.log(error);
  //   //     },
  //   //     () => {
  //   //       if(connectresponse.success) {
  //   //         // this.portal = connectresponse.portal;
  //   //         this.user = connectresponse.user;
  //   //       } else {
  //   //         console.log("error connecting to portal");
  //   //       }
  //   //     }
  //   //   );
  //
  // }

  //
  //
  // public setPortal(portal: PortalSession) {
  //   this.portal = portal;
  // }
  //
  // public getPortal(): PortalSession {
  //   return this.portal;
  // }
  //
  // public setUser(user: User) {
  //   this.user = user;
  // }
  //
  public getUser(): string {
    // @ts-ignore
    return this.accountService.getUsername();
  }

  public closePortal() {
    // close session
  }

  public sendMessage(messageText: string) {
    let message: any;
    // send message to portal session

    message = {
      "secret_key": this.accountService.getSecretKey(),
      "from_username": this.getUser(),
      "to_username": 'someone',
      "from_key": this.accountService.getSecretKey(),
      "to_key": this.accountService.getSecretKey(),
      "message_text": messageText
    }
    this.http.post(`${Config.phpUrl}/includes/sendmessage.inc.php`, JSON.stringify(message))
      .subscribe(
        data => {
          message = data;
        }
      );
   }

  public getMessages() {
    // get messages for portal session
    let message: any;
    message = {
      "secret_key": this.accountService.getSecretKey(),
      "username": this.getUser(),
    }

    return this.http.post(`${Config.phpUrl}/includes/getmessages.inc.php`, JSON.stringify(message));

  }

  public joinPortal(user: User, portal_secret: string) {
    // join portal session

  }

}

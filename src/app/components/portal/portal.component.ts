import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {Form, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {MessageService} from "../../services/message.service";
import {Inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";

import {Clipboard} from "@angular/cdk/clipboard";
import {User} from "../../models/user";

import {Message} from "../../models/message";
import {OnDestroy} from "@angular/core";

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit, OnDestroy {


  message: Message = {
    from_username: "SecurePortal",
    from_key: '',
    date_created: '',
    message_text: 'Welcome to the Portal!',
    id: 0,
  };

  messages: Array<Message> = [this.message];




  logged_in: boolean = false;
  private senderId: string | undefined;
  secret_key_help: any;
  messageContent: any;
  connected: boolean = false;

  interval: any;

  secret_key_form: any;
  secret_key_error: boolean = false;

  private chatAreaDiv!: ElementRef<HTMLElement>;

  constructor(private accountService: AccountService,
              private router: Router,
              private clipboard: Clipboard,
              private messageService: MessageService,
              @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit(): void {
    this.accountService.getConnectionStatus()
      .subscribe(
        (data: number) => {
          this.connected = data == 0;
        });

    this.router.events.subscribe((event) => {
      if(event.constructor.name === "NavigationEnd"){
        this.logged_in = this.accountService.getLoggedIn();
      }
    })
    if (this.accountService.getLoggedIn()){
      this.logged_in = true;
      // @ts-ignore
    }

    // check connectivity status

    // delete this.messages[0];
    // check for new messages every second
    this.interval = setInterval(() => {
        if (this.connected) {

          this.messageService.getMessages().subscribe(
            (data) => {
              for (let item in data) {
                // @ts-ignore
                if (data[item].id > this.messages[this.messages.length - 1].id) {
                  // @ts-ignore
                  this.messages = data;
                }
              }
            });
        }
      }
      , 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getName() {
    return this.accountService.getUsername();
  }

  isLoggedIn() {
    return this.accountService.getLoggedIn();
  }

  deleteKey() {
    this.connected = false;
    this.accountService.deleteSecretKey();
  }


  getSecretKey() {
    return this.accountService.getSecretKey();
  }

  copyKey() {
    // @ts-ignore
    this.clipboard.copy(this.getSecretKey());
    this.secret_key_help = "Copied to clipboard";
    // wait 10seconds and clear the message
    setTimeout(() => {
      this.secret_key_help = "";
    }
    , 10000);
  }

  sendMessage() {


    if(this.getSecretKey() == undefined){
      // please generate key message
    } else {
      this.messageService.sendMessage(this.messageContent);
      this.message.from_username = this.accountService.getUsername();
      // @ts-ignore
      this.message.from_key = this.getSecretKey();
      this.message.message_text= this.messageContent;
      this.message.date_created = new Date().toLocaleString();
      this.messages.push(this.message);

      this.messageContent = "";

    }

  }


  connectViaKey() {
    // check if the key is valid
    // if valid, connect to the portal
    this.secret_key_error = false;

    this.accountService.checkKey(this.secret_key_form).subscribe(
      (data)=>
      {
        if (data == 0){
          // key is valid
          this.connected = true;
          localStorage.setItem('secretKey', this.secret_key_form);
          if (this.accountService.getLoggedIn()) {
            this.accountService.setSecretKey(this.accountService.getUsername(), this.secret_key_form);
          }
          return;
        } else if (data == 1){
          this.connected = false;
          this.secret_key_error=true;
          return;
        }
      }
    );
  }


  getUsername() {
    return this.accountService.getUsername();
  }
  getEmail() {
    return this.accountService.getEmail();
  }


}

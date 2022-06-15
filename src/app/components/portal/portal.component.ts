import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {Form, FormBuilder, FormGroup, FormControl} from "@angular/forms";

import {MessageService} from "../../services/message.service";

import {Clipboard} from "@angular/cdk/clipboard";

import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit{

  message = {
    from_username: "",
    from_key: "",
    date_created: "",
    message_text: "Welcome to the chat!",
    id: 0
  }

  messages =  [
    this.message
  ];

  logged_in: boolean = false;
  username: string = "Guest";
  private senderId: string | undefined;
  secret_key_help: any;
  messageContent: any;

  secret_key_form: any;
  secret_key_error: any;


  constructor(private accountService: AccountService,
              private router: Router,
              private clipboard: Clipboard,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event.constructor.name === "NavigationEnd"){
        this.logged_in = this.accountService.getLoggedIn();
      }
    })
    if (this.accountService.getLoggedIn()){
      this.logged_in = true;
      // @ts-ignore
      this.username = this.accountService.getUsername();
    }

    // delete this.messages[0];

    // check for new messages every second
    setInterval(() => {
      this.messageService.getMessages().subscribe(
        (data) => {
          for (let item in data) {
            // @ts-ignore
            if(data[item].id > this.messages[this.messages.length-1].id){
              // @ts-ignore
              this.messages= data;
            }
            console.log(this.messages);
          }

        }
      );

    }, 5000);
  }


  getName() {
    return this.accountService.getUsername();
  }

  isLoggedIn() {
    return this.accountService.getLoggedIn();
  }

  deleteKey() {
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
    // send message to the server
    // clear the message
    console.log(this.messageContent);
    this.messageService.sendMessage(this.messageContent);
    // add message to the message array
    this.message.from_username = this.username;
    // @ts-ignore
    this.message.from_key = this.getSecretKey();
    this.message.message_text= this.messageContent;
    this.message.date_created = new Date().toLocaleString();
    this.messages.push(this.message);
    console.log(this.messages);

    this.message = {
      from_username: "",
      from_key: "",
      date_created: "",
      message_text: "",
      id: 0
    }
    this.messageContent = "";

  }


  connectViaKey() {
    // check if the key is valid
    // if valid, connect to the portal
    this.accountService.validateKey(this.secret_key_form).subscribe(
      (data) => {
        for (let item in data) {
          // @ts-ignore
          if (data[item] == true){
            console.log("valid key");
            this.accountService.setSecretKey(this.username, this.secret_key_form);
            this.router.navigate(['/portal']);
          }
          else {
            this.secret_key_form = "Invalid Key";
            console.log("invalid key");
            break;
          }
        }
        }
    );

  }
}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {PortalComponent} from "../portal.component";
import {MessageService} from "../../../services/message.service";
import {AccountService} from "../../../services/account.service";
import {ElementRef} from "@angular/core";

@Component({
  selector: 'app-chatarea',
  templateUrl: './chatarea.component.html',
  styleUrls: ['./chatarea.component.css']
})
export class ChatareaComponent implements OnChanges{


  @Input() parentData: any;

  constructor(public portal: PortalComponent,
              @Inject(DOCUMENT) private document: Document) { }



  ngOnChanges(changes: SimpleChanges) {
    console.log("scrolling");


  }




}

// code based on:
// https://github.com/wiringbits/safer.chat
import {Injectable, OnInit} from '@angular/core';

import { fromByteArray, toByteArray } from 'base64-js';


const NodeRSA = require('node-rsa');


@Injectable()
export class CryptoService implements OnInit{

  constructor() {

  }

  ngOnInit() {
  }



}

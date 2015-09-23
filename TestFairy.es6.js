import request from 'request'
import './TestFairyAndroid.js';
const server_endpoint = "http://app.testfairy.com";

export default class TestFairy {

  constructor(params) {
    this.api_key   = params.api_key;
    this.keystore  = params.keystore;
    this.storepass = params.storepass;
    this.alias     = params.alias;
    this.testers   = params.testers || [];
    this.notify    = params.notify ? "on" : "off";
    this.max_duration = params.max_duration || "10m";
    this.video = params.video ? "on" : "off";
    this.icon_watermark = params.watermark ? "on" : "off";
    this.comment = params.comment || "";
  }
  
  upload() {
  }

}

import request from 'request'
const server_endpoint = "http://app.testfairy.com";

export default class TestFairy {

  constructor(params) {
    this.api_key        = params.api_key;
    this.notify         = params.notify == "on" ? "on" : "off";
    this.max_duration   = params.max_duration || "10m";
    this.video          = params.video == "on" ? "on" : "off";
    this.icon_watermark = params.watermark ? "on" : "off";
    this.comment        = params.comment || "";
  }

  upload() {
    return null
  }

}

import semafor from 'semafor'

export default class TestFairy {

  constructor(params) {
    this.server_endpoint = "http://app.testfairy.com";
    this.api_key         = params.api_key;
    this.notify          = params.notify == "on" ? "on" : "off";
    this.max_duration    = params.max_duration || "10m";
    this.video           = params.video == "on" ? "on" : "off";
    this.icon_watermark  = params.watermark ? "on" : "off";
    this.comment         = params.comment || "";
    this.apk_file        = "";
    this.is_android      = false;
    this.ipa_file        = "";
    this.is_ios          = false;
    this.verbose         = params.verbose || false;
    this.logger          = params.logger || semafor();
  }
}

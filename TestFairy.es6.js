import semafor from 'semafor'

export default class TestFairy {

  constructor(params) {

    this.server_endpoint = "http://app.testfairy.com";
    this.api_key         = params.api_key;
    this.notify          = params.notify == "on" ? "on" : "off";
    this.max_duration    = params.max_duration || "10m";
    
    switch(params.video) {
      case "wifi": this.video = "wifi"; break;
      case "off" : this.video = "off"; break;
      default: this.video = "on"; break;
    }
    
    this.icon_watermark  = params.watermark ? "on" : "off";
    this.comment         = params.comment || "";
    this.apk_file        = "";
    this.is_android      = false;
    this.ipa_file        = "";
    this.is_ios          = false;
    this.verbose         = params.verbose || false;
    this.logger          = params.logger || semafor();
    this.auto_update     = params.auto_update || "on";
  }
}

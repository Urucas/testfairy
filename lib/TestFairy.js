import semafor from 'semafor'
import glue from 'glue-path'
import fs from 'fs'
import child_process from 'child_process'

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
    this.file            = undefined;
    this.verbose         = params.verbose || false;
    this.logger          = params.logger || semafor();
    this.auto_update     = params.auto_update || "on";
  }

  validate_min_params() {
    let logger = this.logger;
    if(this.verbose)
      logger.log("Checkin minimal params are setted")
    
    if(this.api_key == undefined)
      return new Error("Undefined api_key param");

    if(this.verbose)
      logger.ok("Checking api_key key is not undefined");

    if(this.file == undefined)
      return new Error("Undefined file param");

    this.file = glue([process.cwd(), this.file]);
    
    if(this.verbose)
      logger.ok("Checking file param is not undefined");

    try {
      let err = fs.accessSync(this.file, fs.R_OK);
      if(err) return err;

    }catch(e) {
      return new Error(e.message);
    }
    return null;
  }
  
  get_common_params() {
    let params = [
      '-s', this.server_endpoint+"/api/upload",
      '-F', 'api_key='+this.api_key,
    ];
    return params;
  }

  upload(params) {
    
    let logger = this.logger;
    if(this.verbose) 
      logger.log("Uploading apk to TestFairy");
      
    let child = child_process.spawnSync("curl", params);
    try {
      let response = child.stdout.toString();
      response = JSON.parse(response);
      if(response.status == "ok")
        return [null, response];

      return [new Error(response.message), response];

    }catch(e) {
      return [e, {}];
    }
    
  }
}

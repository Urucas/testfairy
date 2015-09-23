import TestFairy from './TestFairy.js'
import glue from 'glue-path'
import fs from 'fs'
import child_process from 'child_process'

export default class TestFairyAndroid extends TestFairy {
  
  constructor(params) {
    super(params)
    this.apk_file = params.apk_file;
    this.is_android = true;
  }

  validate_min_params() {
    let logger = this.logger;
    if(this.verbose)
      logger.log("Checkin minimal params are setted")
    
    if(this.api_key == undefined)
      return new Error("Undefined api_key param");

    if(this.verbose)
      logger.ok("Checking api_key key is not undefined");

    if(this.apk_file == undefined)
      return new Error("Undefined apk_file param");
    
    if(this.verbose)
      logger.ok("Checking api_key key is not undefined");

    this.apk_file = glue([process.cwd(), this.apk_file]);
    try {
      let err = fs.accessSync(this.apk_file, fs.R_OK);
      if(err) return err;
    }catch(e) {
      return new Error(e.message);
    }
    return null;
  }

  upload() {
    let logger = this.logger;
    if(this.verbose) 
      logger.log("Uploading apk to TestFairy");
      
    let params = [
      '-s', this.server_endpoint+"/api/upload",
      '-F', 'api_key='+this.api_key,
      '-F', 'apk_file=@'+this.apk_file
    ];
    let child = child_process.spawnSync("curl", params);
    let response = child.stdout.toString();
    try {
      response = JSON.parse(response);
      return [null, response];
    }catch(e) {
      return [e];
    }
  }

}

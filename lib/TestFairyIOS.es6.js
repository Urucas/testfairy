import TestFairy from './TestFairy.js'
import glue from 'glue-path'
import fs from 'fs'
import child_process from 'child_process'

export default class TestFairyIOS extends TestFairy {
  
  constructor(params) {
    super(params)
    this.ios_file = params.file;
    this.is_ios = true;
  }

  validate_min_params() {
    let logger = this.logger;
    if(this.verbose)
      logger.log("Checkin minimal params are setted")
    
    if(this.api_key == undefined)
      return new Error("Undefined api_key param");

    if(this.verbose)
      logger.ok("Checking api_key key is not undefined");

    if(this.ios_file == undefined)
      return new Error("Undefined file param");
    
    if(this.verbose)
      logger.ok("Checking file key is not undefined");

    this.ios_file = glue([process.cwd(), this.ios_file]);
    try {
      let err = fs.accessSync(this.ios_file, fs.R_OK);
      if(err) return err;
    }catch(e) {
      return new Error(e.message);
    }
    return null;
  }

  upload() {
    let logger = this.logger;
    if(this.verbose) 
      logger.log("Uploading ipa to TestFairy");
      
    let params = [
      '-s', this.server_endpoint+"/api/upload",
      '-F', 'api_key='+this.api_key,
      '-F', 'file=@'+this.ios_file
    ];

    let child = child_process.spawnSync("curl", params);
    let response = child.stdout.toString();
    try {
      response = JSON.parse(response);
      if(response.status == "ok")
        return [null, response];
      else 
        return [new Error(response.message), response];
    }catch(e) {
      return [e];
    }
  }

}
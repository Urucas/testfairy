import TestFairy from './TestFairy.js'
import glue from 'glue-path'
import fs from 'fs'

export default class TestFairyAndroid extends TestFairy {
  
  constructor(params) {
    super(params)
    this.apk_file = params.apk_file;
    this.is_android = true;
  }

  validate_min_params() {
    if(this.api_key == undefined)
      return new Error("Undefined api_key param");

    if(this.apk_file == undefined)
      return new Error("Undefined apk_file param");

    this.apk_file = glue([process.cwd(), this.apk_file]);

    try {
      let err = fs.accessSync(this.apk_file, fs.R_OK);
      if(err) return err;
    }catch(e) {
      return new Error(e.message);
    }
    
    return null;
  }
}

import TestFairyAndroid from './TestFairyAndroid.js'

export default class TestFairyUploader {

  constructor(params) {
    if(params.platform == "android") 
      this.uploader = new TestFairyAndroid(params)
  }

  run() {
    let err = this.uploader.validate_min_params();
    if(err) return err
    err = this.uploader.upload();
    if(err) return err;
  }
}

import TestFairyAndroid from './TestFairyAndroid.js'
import TestFairyIOS from './TestFairyIOS.js'

export default class TestFairyUploader {

  constructor(params) {
    if(params == undefined)
      this.uploader = null;
    else if(params.platform == "android") 
      this.uploader = new TestFairyAndroid(params)
    else if(params.platform == "ios")
      this.uploader = new TestFairyIOS(params)
    else this.uploader = null;
  }

  run() {
    if(this.uploader == null) 
      return [new Error("Undefined uploader params, could not create uploader class"), {}];
    let err = this.uploader.validate_min_params();
    if(err) 
      return [err, {}]
    return this.uploader.upload();
  }
}

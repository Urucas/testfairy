import TestFairyAndroid from './TestFairyAndroid.js'
import TestFairyIOS from './TestFairyIOS.js'

export default class TestFairyUploader {

  constructor(params) {
    if(params.platform == "android") 
      this.uploader = new TestFairyAndroid(params)
    else if(params.platform == "ios")
      this.uploader = new TestFairyIOS(params)
  }

  run() {
    let err = this.uploader.validate_min_params();
    if(err) return [err]
    return this.uploader.upload();
  }
}

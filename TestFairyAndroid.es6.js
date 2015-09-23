import TestFairy from './TestFairy.js'

export default class TestFairyAndroid extends TestFairy {
  
  constructor(params) {
    super(params)
    this.apk_file = params.apk_file;
    this.is_android = true;
  }
}

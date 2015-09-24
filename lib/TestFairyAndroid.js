import TestFairy from './TestFairy.js'

export default class TestFairyAndroid extends TestFairy {

  constructor(params) {
    super(params)
    this.file = params.file;
  }

  upload() {
    let params = super.get_common_params();
        params.push('-F');
        params.push('apk_file=@'+this.file);

    return super.upload(params);
  }
}

import TestFairyUploader from '../lib/TestFairyUploader.js'
import isPlainObj from 'is-plain-obj'
import fs from 'fs'

describe("Test TestFairyUploader", () => {
        
  it("uploader value should empty platform param", (done) => {
    let uploader = new TestFairyUploader();
    if(uploader.uploader != null) 
      throw new Error("uploader instance should be null");
    done();
  })    

  it("uploader should be instance of TestFairyAndroid", (done) => {
    let uploader = new TestFairyUploader({platform:"android"});
    if(uploader.uploader == null)
      throw new Error("uploader class is null and should be instance of TestFairyAndroid");
    let className = uploader.uploader.constructor.name;
    if(className != "TestFairyAndroid")
      throw new Error("uploader class instance is not TestFairyAndroid, className: "+className);
    done();
  })

  it("uploader should be instance of TestFairyIOS", (done) => {
    let uploader = new TestFairyUploader({platform:"ios"});
    if(uploader.uploader == null)
      throw new Error("uploader class is null and should be instance of TestFairyAndroid");
    let className = uploader.uploader.constructor.name;
    if(className != "TestFairyIOS")
      throw new Error("uploader class instance is not TestFairyIOS, className: "+className);
    done();
  })

  it("should return an error on empty api_key param with andrid platform", (done) => {
    let uploader = new TestFairyUploader({platform:"android"});
    let [err, result] = uploader.run();
    if(err == null)
      throw new Error("run failed to return an error on empty api_key param");
    if(err.message != "Undefined api_key param")
      throw new Error("error message on empty params is not correct, message:"+err.message);
    done();
  })

  it("should return an error on empty api_key param with ios platform", (done) => {
    let uploader = new TestFairyUploader({platform:"ios"});
    let [err, result] = uploader.run();
    if(err == null)
      throw new Error("run failed to return an error on empty api_key param");
    if(err.message != "Undefined api_key param")
      throw new Error("error message on empty params is not correct, message:"+err.message);
    done();
  })

  it("should return an error on empty file param with android platform", (done) => {
    let uploader = new TestFairyUploader({platform:"android", api_key:"xxxxx"});
    let [err, result] = uploader.run();
    if(err == null)
      throw new Error("run failed to return an error on empty file param");
    if(err.message != "Undefined file param")
      throw new Error("error message on empty params is not correct, message:"+err.message);
    done();
  })

  it("should return an error on empty file param with ios platform", (done) => {
    let uploader = new TestFairyUploader({platform:"ios", api_key:"xxxxx"});
    let [err, result] = uploader.run();
    if(err == null)
      throw new Error("run failed to return an error on empty file param");
    if(err.message != "Undefined file param")
      throw new Error("error message on empty params is not correct, message:"+err.message);
    done();
  })

  it("should return an error on not existing file with android platform", (done) => {
    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/test1.apk"
    });
    let [err, result] = uploader.run();
    if(err == null)
      throw new Error("run failed to return an error on empty file param");
    done();
  })
  
  it("should return an error on not existing file with ios platform", (done) => {
    let uploader = new TestFairyUploader({
      platform:"ios", 
      api_key:"xxxxx", 
      file: "./tests/test1.ipa"
    });
    let [err, result] = uploader.run();
    if(err == null)
      throw new Error("run failed to return an error on empty file param");
    done();
  })

  // options tests
  // notify param
  it("should set the notify param to 'off' with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk",
      notify: "off"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.notify != "off") 
      throw new Error("error setting notify, extected 'off' actual "+uploaderClass.notify);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('notify') == -1)
      throw new Error("notify param not added to get_common_params");
    
    done();
  })

  it("should set the notify param to 'on' with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk",
      notify: "on"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.notify != "on") 
      throw new Error("error setting notify, extected 'off' actual  "+uploaderClass.notify);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('notify') == -1)
      throw new Error("notify param not added to get_common_params");

    done();
  })

  it("should set the notify param to 'off' with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa",
      notify: "off"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.notify != "off") 
      throw new Error("error setting notify, extected 'off' actual "+uploaderClass.notify);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('notify') == -1)
      throw new Error("notify param not added to get_common_params");

    done();
  })

  it("should set the notify param to 'on' with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa",
      notify: "on"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.notify != "on") 
      throw new Error("error setting notify, extected 'off' actual  "+uploaderClass.notify);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('notify') == -1)
      throw new Error("notify param not added to get_common_params");

    done();
  })

  // auto_update param
  it("should set the auto_update param to 'off' with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk",
      auto_update: "off"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.auto_update != "off") 
      throw new Error("error setting notify, extected 'off' actual "+uploaderClass.auto_update);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('auto-update') == -1)
      throw new Error("auto-update param not added to get_common_params");

    done();
  })

  it("should set the auto_update param to 'on' with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk",
      auto_update: "on"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.auto_update != "on") 
      throw new Error("error setting notify, extected 'off' actual  "+uploaderClass.auto_update);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('auto-update') == -1)
      throw new Error("auto-update param not added to get_common_params");

    done();
  })
  
  it("should set the auto_update param to 'off' with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa",
      auto_update: "off"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.auto_update != "off") 
      throw new Error("error setting notify, extected 'off' actual "+uploaderClass.auto_update);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('auto-update') == -1)
      throw new Error("auto-update param not added to get_common_params");

    done();
  })

  it("should set the auto_update param to 'on' with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa",
      auto_update: "on"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.auto_update != "on") 
      throw new Error("error setting notify, extected 'off' actual  "+uploaderClass.auto_update);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('auto-update') == -1)
      throw new Error("auto-update param not added to get_common_params");

    done();
  })

  // video params tests
  it("should set the video param to 'off' with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk",
      video: "off"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.video != "off") 
      throw new Error("error setting notify, extected 'off' actual "+uploaderClass.video);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('video') == -1)
      throw new Error("video param not added to get_common_params");

    done();
  })

  it("should set the video param to 'on' with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk",
      video: "on"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.video != "on") 
      throw new Error("error setting notify, extected 'off' actual  "+uploaderClass.video);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('video') == -1)
      throw new Error("video param not added to get_common_params");

    done();
  })

  it("should set the video param to 'wifi' with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk",
      video: "wifi"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.video != "wifi") 
      throw new Error("error setting notify, extected 'off' actual  "+uploaderClass.video);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('video') == -1)
      throw new Error("video param not added to get_common_params");

    done();
  })

  it("should set the video param to 'off' with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa",
      video: "off"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.video != "off") 
      throw new Error("error setting notify, extected 'off' actual "+uploaderClass.video);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('video') == -1)
      throw new Error("video param not added to get_common_params");

    done();
  })

  it("should set the video param to 'on' with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa",
      video: "on"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.video != "on") 
      throw new Error("error setting notify, extected 'off' actual  "+uploaderClass.video);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('video') == -1)
      throw new Error("video param not added to get_common_params");

    done();
  })

  it("should set the video param to 'wifi' with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa",
      video: "wifi"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.video != "wifi") 
      throw new Error("error setting notify, extected 'off' actual  "+uploaderClass.video);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('video') == -1)
      throw new Error("video param not added to get_common_params");

    done();
  })

  // max_duration param tests 
  it("should set the max_duration default param to '10m' with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.max_duration != "10m") 
      throw new Error("error setting max_duration default value, actual "+uploaderClass.max_duration);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('max-duration') == -1)
      throw new Error("max-duration param not added to get_common_params");

    done();
  })

  it("should set the max_duration default param to '10m' with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"ios", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.max_duration != "10m") 
      throw new Error("error setting max_duration default value, actual "+uploaderClass.max_duration);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('max-duration') == -1)
      throw new Error("max-duration param not added to get_common_params");

    done();
  })

  it("should set the max_duration param with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk",
      max_duration : "15m"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.max_duration != "15m") 
      throw new Error("error setting max_duration default value, actual "+uploaderClass.max_duration);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('max-duration') == -1)
      throw new Error("max-duration param not added to get_common_params");

    done();
  })

  it("should set the max_duration param with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"ios", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa",
      max_duration : "15m"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.max_duration != "15m") 
      throw new Error("error setting max_duration default value, actual "+uploaderClass.max_duration);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('max-duration') == -1)
      throw new Error("max-duration param not added to get_common_params");

    done();
  })

  // icon_watermark param tests
  it("should set the icon_watermark to 'off' param with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk",
      icon_watermark : "off"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.icon_watermark != "off") 
      throw new Error("error setting max_duration default value, actual "+uploaderClass.icon_watermark);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('icon-watermark') == -1)
      throw new Error("icon-watermark param not added to get_common_params");

    done();
  })

  it("should set the icon_watermark to 'off' param with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"ios", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa",
      icon_watermark : "off"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.icon_watermark != "off") 
      throw new Error("error setting max_duration default value, actual "+uploaderClass.icon_watermark);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('icon-watermark') == -1)
      throw new Error("icon-watermark param not added to get_common_params");

    done();
  })

  it("should set the icon_watermark to 'on' param with android platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))

    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk",
      icon_watermark : "on"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.icon_watermark != "on") 
      throw new Error("error setting max_duration default value, actual "+uploaderClass.icon_watermark);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('icon-watermark') == -1)
      throw new Error("icon-watermark param not added to get_common_params");

    done();
  })

  it("should set the icon_watermark to 'on' param with ios platform", (done) => {
     // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))

    let uploader = new TestFairyUploader({
      platform:"ios", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa",
      icon_watermark : "on"
    });
    let uploaderClass = uploader.uploader;
    if(uploaderClass.icon_watermark != "on") 
      throw new Error("error setting max_duration default value, actual "+uploaderClass.icon_watermark);
    let params = uploaderClass.get_common_params().join(" ");
    if(params.indexOf('icon-watermark') == -1)
      throw new Error("icon-watermark param not added to get_common_params");

    done();
  })

  it("should return a destructured array on upload with android platform", (done) => {
    // create tmp.apk
    fs.closeSync(fs.openSync('./tests/dummy.apk','w+'))
    
    let uploader = new TestFairyUploader({
      platform:"android", 
      api_key:"xxxxx", 
      file: "./tests/dummy.apk"
    });
    let [err, result] = uploader.run();
    if(err != null && err.constructor.name != "Error")
      throw new Error("destructured response err is not null or Error");

    if(!isPlainObj(result))
      throw new Error("destructured response result is not plain object");

    done();
  })

  it("should return a destructured array on upload with ios platform", (done) => {
    // create tmp.ipa
    fs.closeSync(fs.openSync('./tests/dummy.ipa','w+'))
    
    let uploader = new TestFairyUploader({
      platform:"ios", 
      api_key:"xxxxx", 
      file: "./tests/dummy.ipa"
    });
    let [err, result] = uploader.run();
    if(err != null && err.constructor.name != "Error")
      throw new Error("destructured response err is not null or Error");

    if(!isPlainObj(result))
      throw new Error("destructured response result is not plain object");

    done();
  })

})

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

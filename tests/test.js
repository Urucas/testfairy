import TestFairyUploader from '../lib/TestFairyUploader.js'

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

  it("should return an error on empty api_key param", (done) => {
    let uploader = new TestFairyUploader({platform:"android"});
    let [err, result] = uploader.run();
    if(err == null)
      throw new Error("run failed to return an error on empty api_key param");
    if(err.message != "Undefined api_key param")
      throw new Error("error message on empty params is not correct, message:"+err.message);
    done();
  })

})

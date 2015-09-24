import TestFairyUploader from '../TestFairyUploader.es6.js'

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
})

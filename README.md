# testfairy [![Build Status](https://travis-ci.org/Urucas/testfairy.svg)](https://travis-ci.org/Urucas/testfairy)
testfairy upload cli-tool

#Install 
```bash
npm install -g testfairy
```

#Usage
```bash
testfairy 
  --platform=<android_or_ios> 
  --api_key=<your_api_key> 
  --file=<relative_path_to_your_apk_or_ipa>
```

**API**
```javascript
import TestFairyUploader from 'TestFairyUploader.js'
let uploader new TestFairyUploader({
  file:"relative_path_to_your_apk_or_ipa", 
  platofrm:"android_or_ios", 
  api_key:"your_api_key"
}
let [err, response] = uploader.run();
```

**params**


* ```platform```: [ "android" | "ios" ]
* ```api_key```: "your_api_key"
* ```file```: "relative_path_to_your_apk_or_ipa"
* ```grpups```: "group_you_want_to_notify" 
* ```notify```: ["on" | "off"] 
* ```max_duration```: "time" 
* ```video``` : [ "on" | "off" | "wifi" ]
* ```icon_watermark``` : [ "on" | "off" ]
* ```comment``` : "your_comment"
* ```verbose``` : [ true | false ]
* ```auto_update``` : [ "on" : "off" ]



#Requirements
* IPA file must be signed
 

#Related
[grunt-testfairy](https://github.com/Urucas/grunt-testfairy)

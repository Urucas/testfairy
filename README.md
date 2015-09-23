# testfairy
testfairy upload cli-tool

#Install 
```bash
npm install -g testfairy
```

#Usage
```bash
testfairy --platform=<android_or_ios> --api_key=<your_api_key> --apk_file=<relative_path_to_your_apk_or_ipa>
```

**API**
```javascript
import TestFairyUploader from 'TestFairyUploader.js'
let uploader new TestFairyUploader({
  apk_file:"relative_path_to_your_apk_or_ipa", 
  platofrm:"android_or_ios", 
  api_key:"your_api_key"
}
let [err, response] = uploader.run();
```

# app-icon-generator

Generates Xcode compatible `.appiconset` from single image file.

Created output is automatically recognized by Xcode.

For best results use at least 180x180 px image.

## usage

```JavaScript
const appIconGenerator = require('app-icon-generator');
const path = require('path');

// you must provide absolute paths for safety
const from = path.resolve(__dirname, 'image.png');
const to = path.resolve(__dirname, 'Project/Images.xcassets/AppIcon.appiconset')

appIcongenerator(from, to);

// that's all, now you have all possible icon sizes generated and imported
// into the Xcode project
```

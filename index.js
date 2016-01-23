/**
 * Copyright (c) 2016-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const gm = require('gm');
const path = require('path');
const Promise = require('bluebird');

function generateAppIcon(sourceImagePath, appIconsetPath, iconHeight, iconWidth, scale) {
  return Promise.fromCallback(function (cb) {
    return gm(sourceImagePath)
      .resize(iconWidth * scale, iconHeight * scale)
      .write(path.resolve(appIconsetPath, `icon-${iconWidth}x${iconHeight}@${scale}x.png`), cb);
  });
}

function generateAppIconset(fromFilePath, toFilePath) {
  const appIconsetPath = path.resolve(toFilePath);
  const sourceImagePath = path.resolve(fromFilePath);
  const sourceContentsFilePath = path.resolve(__dirname, 'Contents.json');
  const targetContentsFilePath = path.resolve(appIconsetPath, 'Contents.json');

  return Promise.fromCallback(cb => fs.mkdirs(appIconsetPath, cb))
    .then(function () {
      return Promise.all([
        Promise.fromCallback(cb => fs.copy(sourceContentsFilePath, targetContentsFilePath, cb)),
        generateAppIcon(sourceImagePath, appIconsetPath, 29, 29, 2),
        generateAppIcon(sourceImagePath, appIconsetPath, 29, 29, 3),
        generateAppIcon(sourceImagePath, appIconsetPath, 40, 40, 2),
        generateAppIcon(sourceImagePath, appIconsetPath, 40, 40, 3),
        generateAppIcon(sourceImagePath, appIconsetPath, 60, 60, 2),
        generateAppIcon(sourceImagePath, appIconsetPath, 60, 60, 3),
      ]);
    })
    .then(function () {
      return {
        appIconsetPath,
      };
    });
}

module.exports = generateAppIconset;

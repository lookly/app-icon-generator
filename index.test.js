/**
 * Copyright (c) 2016-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint func-names: 0 */
/* global after: false, describe: false, it: false */

const appIconGenerator = require('./index');
const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const temp = require('temp').track();

describe('mocha', function () {
  after(function (done) {
    temp.cleanup(done);
  });

  it('should run test files', function () {
    return Promise.fromCallback(cb => temp.mkdir('app-icon-generator', cb))
      .then(function (outputDirPath) {
        const from = './fixture-icon-square.jpeg';
        const to = path.resolve(outputDirPath, 'AppIcon.appiconset');

        return appIconGenerator(from, to);
      })
      .then(function (outputPaths) {
        return Promise.fromCallback(cb => fs.readdir(outputPaths.appIconsetPath, cb));
      })
      .then(function (fileList) {
        assert.sameMembers(fileList, [
          'Contents.json',
          'icon-29x29@2x.png',
          'icon-29x29@3x.png',
          'icon-40x40@2x.png',
          'icon-40x40@3x.png',
          'icon-60x60@2x.png',
          'icon-60x60@3x.png',
        ]);
      });
  });
});

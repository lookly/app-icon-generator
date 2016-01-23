/**
 * Copyright (c) 2016-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const eslint = require('gore-eslint');
const gulp = require('gulp');
const mocha = require('gore-mocha');

gulp.task('lint', function gulpLintTask() {
  return eslint('./*.js');
});

gulp.task('test', ['lint'], function gulpLintTask() {
  return mocha('./*.test.js');
});

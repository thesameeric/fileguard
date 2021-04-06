"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.last-index-of.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.parse-int.js");

var butter = {
  error: false,
  errorMessage: [],
  data: null,
  mimetypes: ['image/jpeg'],
  file: function file(uImage) {
    if (uImage) {
      this.data = uImage;
      this.error = false;
      this.errorMessage = [];
    } else {
      this.errorHandler(100);
    }

    return this;
  },
  type: function type(uTypes) {
    if (this.data) {
      if (Object.prototype.toString.call(uTypes) === '[object Array]') {
        var file = this.data; // eslint-disable-next-line no-bitwise

        var fileext = file.originalname.slice((file.originalname.lastIndexOf('.') - 1 >>> 0) + 2);

        if (fileext && !uTypes.includes(fileext)) {
          this.errorHandler(300);
        }
      } else {
        this.errorHandler(400);
      }
    } else {
      this.errorHandler(100);
    }

    return this;
  },
  size: function size(usize) {
    if (this.data) {
      if (parseInt(usize, 10)) {
        if (this.data.size / (1024 * 1024) > parseInt(usize, 10)) {
          this.errorHandler(200);
        }
      }
    }

    return this;
  },
  errorHandler: function errorHandler(code) {
    var errorMessages = {
      100: 'Invalid request body',
      200: 'File too large',
      300: 'Invalid file type',
      400: 'Invalid file format'
    };

    if (typeof code === 'number') {
      if (!this.errorMessage.includes(errorMessages[code])) {
        this.error = true;
        this.errorMessage.push(errorMessages[code]);
      }
    }
  }
};
var _default = butter;
exports["default"] = _default;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileGuard = void 0;
const fs = require("fs");
const path = require("path");
class FileGuard {
    constructor(inputFile) {
        if (inputFile) {
            if (typeof inputFile === 'string') {
                const buffer = Buffer.from(inputFile);
                const originalname = path.parse(inputFile).base;
                const { size } = fs.statSync(inputFile);
                const fileObject = {
                    originalname,
                    size,
                    path: inputFile,
                    Buffer: buffer,
                };
                this.file = fileObject;
            }
            if (typeof inputFile === 'object') {
                this.file = inputFile;
            }
            this.error = false;
            this.errorMessage = [];
        }
        else {
            this.errorHandler(100);
        }
    }
    type(allowedFileTypes) {
        if (this.file) {
            if (Object.prototype.toString.call(allowedFileTypes) === '[object Array]') {
                const file = this.file;
                const fileExtension = file.originalname.slice((file.originalname.lastIndexOf('.') - 1 >>> 0) + 2);
                if (fileExtension && !allowedFileTypes.includes(fileExtension)) {
                    this.errorHandler(300);
                }
            }
            else {
                this.errorHandler(400);
            }
        }
        else {
            this.errorHandler(100);
        }
        return this;
    }
    size(fileSize) {
        if (this.file) {
            if ((this.file.size / (1024 * 1024)) > fileSize) {
                this.errorHandler(200);
            }
        }
        return this;
    }
    errorHandler(code) {
        const errorMessages = {
            100: 'Invalid request body',
            200: 'File too large',
            300: 'Invalid file type',
            400: 'Invalid file format',
        };
        if (!this.errorMessage.includes(errorMessages[code])) {
            this.error = true;
            this.errorMessage.push(errorMessages[code]);
        }
    }
}
exports.FileGuard = FileGuard;
//# sourceMappingURL=index.js.map
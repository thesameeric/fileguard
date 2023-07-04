import * as fs from 'fs'
import * as path from 'path'

export class FileGuard {
    public file: any;
    public errorMessage: string[];
    public error: boolean;

    constructor(inputFile: any) {
        if (inputFile) {
            /**
             * If the input file is a string, the assumption is that it is a file path;
             */
            if (typeof inputFile === 'string') {
                const buffer = Buffer.from(inputFile);
                const originalname = path.parse(inputFile).base;
                const { size } = fs.statSync(inputFile);
                
                const fileObject = {
                    originalname,
                    size,
                    path: inputFile,
                    Buffer: buffer,
                }                				
                this.file = fileObject;
            }
            /**
             * A file upload from multer or busboy ...
             */
            if (typeof inputFile === 'object') {
                this.file = inputFile;
            }
			this.error = false;
			this.errorMessage = [];
		} else {
			this.errorHandler(100);
		}
    }

	public type(allowedFileTypes: string[]) {
		if (this.file) {
			if (Object.prototype.toString.call(allowedFileTypes) === '[object Array]') {
				const file = this.file;                
				// Getting file extension
				const fileExtension = file.originalname.slice((file.originalname.lastIndexOf('.') - 1 >>> 0) + 2);
				if (fileExtension && !allowedFileTypes.includes(fileExtension)) {
					this.errorHandler(300);
				}
			} else {
				this.errorHandler(400);
			}
		} else {
			this.errorHandler(100);
		}
		return this;
	}

    public size(fileSize: number) : this {
        if (this.file) {
			if ((this.file.size / (1024 * 1024)) > fileSize) {
				this.errorHandler(200);
			}
		}
        return this;
    }

    private errorHandler(code: number) {
		const errorMessages: { [key: number]: string } = {
			100: 'Invalid request body',
			200: 'File too large',
			300: 'Invalid file type',
			400: 'Invalid file format',
		} as const;

		if (!this.errorMessage.includes(errorMessages[code])) {
			this.error = true;
			this.errorMessage.push(errorMessages[code]);
		}
	}
}
Description
===========

A library for validating files. It can be used to validate local files and also files from formData.
Recommended to use as a middleware with;
- Multer
- or any other ```multipart/formdata``` parser.


Requirements
============

* [node.js](http://nodejs.org/) -- v14.x or newer


Install
=======
```shell
$ npm install --save @thesameeric/fileguard
```

Usage
========
```ts
// Validate local file
import { FileGuard } from '@thesameeric/filguard';
import * as path from 'path';

const filepath = path.join(__dirname, './Hotpot.png');
const { file, error } = new FileGuard(filepath).type(['epub', 'pdf']).size(1);

if (error) throw new Error('Custom error message');
```

## Usage with multer
```ts
import * as express from 'express';
import * as multer from 'multer';
import { FileGuard } from '@thesameeric/filguard';

const upload = multer({ dest: 'uploads/' })
const app = express()

app.post('/file', upload.single('avatar'), (req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const { file, error } = new FileGuard(req.file).type(['png', 'jpg', 'jpeg', 'gif']).size(3);
    if(error) {
        // Output error
    }
})
```
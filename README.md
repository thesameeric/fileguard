Description
===========

A node.js middleware for validating files. Best used as a middleware along with
- Multer
or any other ```multipart/formdata``` parser.


Requirements
============

* [node.js](http://nodejs.org/) -- v14.x or newer


Install
=======
```sh
$ npm install --save @thesameeric/fileguard
```

Usage
========
```javascript
const filegaurd = require('@thesameeric/filguard');

const validatedFile = fileguard.file(file).size(3).type(['png', 'jpg']);

if(validatedFile.error) {
    <!-- Rerturn error -->
}
```

## Usage with multer
```javascript
const express = require('express')
const multer  = require('multer')
const filegaurd = require('@thesameeric/filguard');
const upload = multer({ dest: 'uploads/' })

var app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const validatedFile = fileguard.file(req.file).size(3).type(['png', 'jpg']);

    if(validatedFile.error) {
        <!-- Rerturn error -->
    }
})
```
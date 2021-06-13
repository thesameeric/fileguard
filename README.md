Description
===========

A node.js middleware for validating files. Best used as a middleware along with
- Multer
or any other ```multipart/formdata``` parser.


Requirements
============

* [node.js](http://nodejs.org/) -- v4.5.0 or newer


Install
=======
    npm install @thesameeric/fileguard

Usage
========
    const filegaurd = require('@thesameeric/filguard');

    const validatedFile = fileguard.file(file).size(3).type(['png', jpg]);

    if(validatedFile.error) {
        <!-- Rerturn error -->
    }
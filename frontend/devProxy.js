// Need Local install of parcel-bundler so we and import it below.
const Bundler = require('parcel-bundler');
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();
// Paths we want to forward to the app server
const forward = ['/activities', '/login', '/logout', '/users'];
app.use(forward, createProxyMiddleware({target: 'http://127.0.0.1:1989'}));
// Instance of the parcel.js bundler with start file
const bundler = new Bundler('./index.html');
app.use(bundler.middleware());
app.listen(1234);
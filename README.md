# koa-pgsql-rest
![](https://img.shields.io/github/license/zhenyit/koa-pgsql-rest) 

A koajs back-end server providing RESTful Web Services with postgrSQL.

## Quick Start
Koa requires node v7.6.0 or higher for ES2015 and async function support.

Clone the project koa-pgsql-rest
```
$ git clone https://github.com/zhenyit/koa-pgsql-rest
```
Go into the directory and install the modules
```
$ npm install
```
As soon as the setup is finished, use the following command to run a server
```
node app
```
## Structure
```
├── controllers
├── routes
│   └── index.js
├── db
│   ├── models
│   ├── config.js
│   └── index.js
├── app.js
├── package.json
└── test
```

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/629bc664da714e73a0de87df6ad6c1b3)](https://app.codacy.com/manual/kimenyikevin/TaskForceAPI?utm_source=github.com&utm_medium=referral&utm_content=kimenyikevin/TaskForceAPI&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.org/kimenyikevin/TaskForceAPI.svg?branch=develop)](https://travis-ci.org/kimenyikevin/TaskForceAPI)
[![Coverage Status](https://coveralls.io/repos/github/kimenyikevin/TaskForceAPI/badge.svg?branch=ch-test-for-api)](https://coveralls.io/github/kimenyikevin/TaskForceAPI?branch=ch-test-for-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/44af1debbabed5f666bf/maintainability)](https://codeclimate.com/github/kimenyikevin/TaskForceAPI/maintainability)

# Employee management REST API

Here is a list of all API Endpoints that you will find:
* POST /api/v1/signup
* GET  /api/v1/verify **For better result please copy the link and paste it in browser or simply use postman** 
* POST /api/v1/login
* POST /api/v1/employees
* DELETE /api/v1/employees/:id
* PUT /api/v1/employees/:id
* PUT /api/v1/employees/:id/active
* PUT /api/v1/employees/:id/suspend
* POST /api/v1/employees/search

### Technology tools used in this Project
* Server side Framework : **Node/Express**
* Linting Library: **ESLint**
* Style Guide: **Airbnb**
* Testing Framework: **Mocha**
* Database: **Postgresql**
* Hosting API: **Heroku**
### Additional Tools
* JavaScript Es6 with Babel compiler
* TravisCI for Continous Integration
* nyc for test coverage

### Here there is important link you may visit
* [Employees Management](https://employment-employees.herokuapp.com/api-docs) Here is link  for APIs EndPoints
* For a better test you will need to use [POSTMAN](https://www.getpostman.com/)
### Setup project locally
* Install [git](https://git-scm.com/downloads)
* Install [Node js](https://nodejs.org/en/)
* Clone Repo [TaskForceAPI](https://github.com/kimenyikevin/TaskForceAPI)

```
$ To move into folder
```
$ cd TaskForceAPI
```
Install dependincies as they appear in package.json file by

```
$ npm install
```
To start the server do

```
$ npm run dev-start
```
To run the test do

```
$ npm run test
### Author
[Kevin KIMENYI](https://github.com/kimenyikevin)
### Acknowledgments
[Awesomity Task Force](https://awesomity.rw/)



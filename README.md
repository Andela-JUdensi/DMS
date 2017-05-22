# Hermes (Document Management System)

|         |        |
| :---      | :---      | 
| Semaphore | [![Build Status](https://semaphoreci.com/api/v1/ajudensi/dms/branches/feature-145816283-application-interface/badge.svg)](https://semaphoreci.com/ajudensi/dms)
| travis CI | [![Build Status](https://travis-ci.org/Andela-JUdensi/DMS.svg?branch=develop)](https://travis-ci.org/Andela-JUdensi/DMS)
| Coveralls | [![Coverage Status](https://coveralls.io/repos/github/Andela-JUdensi/DMS/badge.svg?branch=develop)](https://coveralls.io/github/Andela-JUdensi/DMS?branch=develop)
| 

#### About Hermes
Document Management System, complete with roles and privileges. Each document defines access rights; the document defines which roles can access it.

#### API features
The following features make up the Document Management System API:

##### Authentication
- It uses JSON Web Token (JWT) for authentication.
- It generates a token upon successul login / account creation and returns it to the client.
- It verifies the token to ensures a user is authenticated to access some endpoints.

##### Users
- It allows users to be created.
- It allows users to login and obtain a token
- It allows authenticated users to retrieve and edit their information only.
- All users can be retrieved, modified and deleted by the admin user.

##### Roles
- It ensures that users have roles.
- It ensures user roles could be admin or regular, or as created by the admin .
- It ensures roles can be created, retrieved, updated and deleted by an admin user.
- A non-admin user cannot create, retrieve, modify, or delete roles.

##### Documents
- It allows new documents to be created by authenticated users.
- It ensures all documents have access roles defined as public or private.
- It allows admin users to create, retrieve, modify, and delete documents.
- It allows the admin user to retrieve all documents.
- It allows private and public access documents to be retrieved by its owners.
- It ensures users can delete, edit and update documents that they own.
- It allows users to retrieve all documents they own.
- It allows users to set a type for any document they create.

##### Search
- It allows users to search public documents that belong to other users (as well as documents that belong to the user).
- It allows admin to retrieve all documents that matches search term, be it public or private.

#### Technology Stack
- [React] - A javascript library for building user interfaces
- [Redux] - A predictable state container for JavaScript apps.
- [Enzyme] - A JavaScript Testing utility for React
- [Material UI] - great UI boilerplate for modern web apps
- node.js - evented I/O for the backend
- Express - fast node.js network app framework
- [Webpack] - the streaming build system
- [Sequelize] - Sequelize is a promise-based ORM for Node.js and io.js.
- [JWT] - To authenticate routes
- [Postgresql and Sequelize ORM]


#### Local development
Hermes Document Mnagement System requires Node.js v6+ to run.
Install the dependencies and devDependencies and start the server.
```javascript
$ cd DMS
$ npm install -d
$ node app
$ Create Postgresql database and run migrations npm run db:setup.
$ Start the express server npm start.
$ Run test npm test.
```

#### Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/run-collection/:collection_id)


#### API Documentation
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

##### Authentication
Users are assigned a token when signup or signin. This token is needed for subsequent HTTP requests to the API for authentication and can be attached as values to the header's x-acess-token or authorization key. API requests made without authentication will fail with the status code 401: Unauthorized Access.

## Below are the API endpoints and their functions
EndPoint                      |   Functionality
------------------------------|------------------------
POST /users/login         |   Logs a user in.
POST /users/logout        |   Logs a user out.
POST /users/              |   Creates a new user.
GET /users/               |   Find matching instances of user.
GET /users/<id>           |   Find user.
PUT /users/<id>           |   Update user attributes.
DELETE /users/<id>        |   Delete user.
POST /documents/          |   Creates a new document instance.
GET /documents/           |   Find matching instances of document.
GET /documents/<id>       |   Find document.
PUT /documents/<id>       |   Update document attributes.
DELETE /documents/<id>    |   Delete document.
GET /users/<id>/documents |   Find all documents belonging to the user.
GET /search/users/<term>      |   Gets all users with full Names contain the search term
GET /search/document/:userId/:term| Get all document owned by `userId` with title containing the search term
GET /search/documents/:term | Get all documents with title containing the search term
GET /search/documents/:userId/:term |   Get all document owned or accessible by `userId` with title containing the search term
The following are some sample request and response from the API.
- [Roles](#roles)
  - [Get roles](#get-roles)
- [Users](#users)
  - [Create user](#create-user)
  - [Get user](#get-user)
- [Documents](#documents)
  - [Get All documents](#get-all-documents)
  - [Create document](#create-document)
  - [Get document](#get-document)
  - [Edit document](#edit-document)
  - [Delete document](#delete-document)
- [Search](#search)
  - [Search Documents](#search-documents)
  - [Search Users] (#search-users)
## Roles
Endpoint for Roles API.
### Get Roles
#### Request
- Endpoint: GET: `/roles`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "title": "Admin",
    "createdAt": "2016-12-06T06:44:54.792Z",
    "updatedAt": "2016-12-06T06:44:54.792Z"
  }, {
    "id": 2,
    "title": "Registered",
    "createdAt": "2016-12-06T06:44:54.792Z",
    "updatedAt": "2016-12-06T06:44:54.792Z"
  }
]
```
## Users
Endpoint for Users API.
### Create User
#### Request
- Endpoint: POST: `api/users`
- Body `(application/json)`
```json
{
  "username": "uniqueuser",
  "firstname": "Unique ",
  "lastname": "User",
  "email": "uniqueuser@unique.com",
  "RoleId": 1,
  "password": "password"
}
```
#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "user": {
    "id": 141,
    "username": "uniqueuser",
    "firstname": "Unique ",
    "lastname": "User",
    "email": "uniqueuser@unique.com",
    "RoleId": 1,
    "createdAt": "2017-02-19T17:34:19.992Z",
    "updatedAt": "2017-02-19T17:34:19.992Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE0MSwiUm9sZUlkIjoxLCJpYXQiOjE0ODc1MjU2NjAsImV4cCI6MTQ4NzY5ODQ2MH0.ddCQXZB2_woJ32xZNHqPBhNXfjBRg6T3ZsSmF8GCplA",
  "expiresIn": "1h"
}
```
### Get Users
#### Request
- Endpoint: GET: `api/users`
- Requires: Authentication, Admin Role
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "id": 140,
  "username": "uyi2",
  "firstname": "Unique ",
  "lastname": "User",
  "email": "uyi2@uyi.com",
  "RoleId": 1,
  "createdAt": "2017-02-17T19:41:30.837Z",
  "updatedAt": "2017-02-17T19:41:30.837Z"
},
{
  "id": 141,
  "username": "uniqueuser",
  "firstname": "Unique ",
  "lastname": "User",
  "email": "uniqueuser@unique.com",
  "RoleId": 1,
  "createdAt": "2017-02-19T17:34:19.992Z",
  "updatedAt": "2017-02-19T17:34:19.992Z"
}]
```
## Documents
Endpoint for document API.
### Get All Documents
#### Request
- Endpoint: GET: `/documents`
- Requires: Authentication, Admin Role
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
    "id": 45,
    "title": "Another new document",
    "content": "Test Epic things like lorem etc",
    "permission": "Public",
    "OwnerId": 29,
    "createdAt": "2017-02-17T17:40:45.146Z",
    "updatedAt": "2017-02-17T17:40:45.146Z"
  },
  {
    "id": 44,
    "title": "New Title",
    "content": "The unique content of a document does not lie in the presence of the word unique",
    "permission": "1",
    "OwnerId": 1,
    "createdAt": "2017-02-06T22:55:43.747Z",
    "updatedAt": "2017-02-06T22:55:43.747Z"
  }]
```
### Create Document
#### Request
- Endpoint: POST: `/documents`
- Requires: Authentication
- Body `(application/json)`
```json
{
  "title": "Just a Title",
  "content": "This placeholder should not always be a lorem generated document",
  "OwnerId": 1,
  "access": "private"
}
```
#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "id": 1,
  "title": "Just a Title",
  "content": "This placeholder should not always be a lorem ipsum generated document",
  "OwnerId": 1,
  "access": "private",
  "createdAt": "2017-02-05T05:51:51.217Z",
  "updatedAt": "2016-02-05T05:51:51.217Z"
}
```
### Get Document
#### Request
- Endpoint: GET: `/documents/:id`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 1,
  "title": "Just a Title",
  "content": "This placeholder should not always be a lorem ipsum generated document",
  "OwnerId": 1,
  "access": "private",
  "createdAt": "2017-02-05T05:51:51.217Z",
  "updatedAt": "2016-02-05T05:51:51.217Z"
}
```
### Edit Document
#### Request
- Endpoint: PUT: `/documents/:id`
- Requires: Authentication
- Body `(application/json)`:
```json
{
  "title": "Updated Title",
}
```
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
  {
    "id": 1,
    "title": "Updated Title",
    "content": "This placeholder should not always be a lorem ipsum generated document",
    "OwnerId": 1,
    "access": "private",
    "createdAt": "2017-02-05T05:51:51.217Z",
    "updatedAt": "2016-02-05T05:51:51.217Z"
  }
```
### Delete Document
#### Request
- Endpoint: DELETE: `/documents/:id`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Deleted Document with id:42"
}
```
### Search
#### Documents
#### Request
- Endpoint: GET: `/search/documents/:term`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
    "id": 45,
    "title": "Another new document",
    "content": "Test Epic things like lorem etc",
    "access": "Public",
    "OwnerId": 29,
    "createdAt": "2017-02-17T17:40:45.146Z",
    "updatedAt": "2017-02-17T17:40:45.146Z"
  },
  {
    "id": 44,
    "title": "New Title",
    "content": "The unique content of a document does not lie in the presence of the word unique",
    "access": "1",
    "OwnerId": 1,
    "createdAt": "2017-02-06T22:55:43.747Z",
    "updatedAt": "2017-02-06T22:55:43.747Z"
  }]
```
### Users
#### Request
- Endpoint: GET: `/search/users/:term`
- Requires: Authentication, Admin Role
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "id": 140,
  "username": "uyi2",
  "fullNames": "wuyi2AH",
  "email": "uyi2@uyi.com",
  "RoleId": 1,
  "createdAt": "2017-02-17T19:41:30.837Z",
  "updatedAt": "2017-02-17T19:41:30.837Z"
},
{
  "id": 141,
  "username": "uniqueuser",
  "fullNames": "Unique User",
  "email": "uniqueuser@unique.com",
  "RoleId": 1,
  "createdAt": "2017-02-19T17:34:19.992Z",
  "updatedAt": "2017-02-19T17:34:19.992Z"
}]
```

#### Limitations:
The limitations to the Document Management System API are as follows:

* Users can only create plain textual documents and retrieve same when needed.
* Users cannot share documents with people, but can make document `public` to make it available to other users.
* Users cannot delete their accounts unless via the action of an admin of the system.

#### _**Contributing**_
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:


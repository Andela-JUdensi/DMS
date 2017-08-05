'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDocumentUpdate = exports.validateDocumentInput = exports.validateDeleteDocument = undefined;

var _dependencies = require('./dependencies');

var Documents = _dependencies.models.Documents;
var Users = _dependencies.models.Users;

var validateDeleteDocument = function validateDeleteDocument(req, res, next) {
  Documents.findById(req.params.id).then(function (document) {
    if (!document) {
      return _dependencies.Response.notFound(res, 'document not found');
    }

    if ([1, 2].includes(req.locals.user.decoded.roleId) === false && req.locals.user.decoded.userId !== parseInt(document.ownerID, 10)) {
      return _dependencies.Response.unAuthorized(res, 'you cannot perform this action');
    }
    req.locals.documentToBeDeleted = document;
    next();
  });
};

var validateDocumentInput = function validateDocumentInput(req, res, next) {
  if (!req.body.title) {
    return _dependencies.Response.badRequest(res, 'enter valid title');
  }
  if (!req.body.access) {
    return _dependencies.Response.badRequest(res, 'enter valid access');
  }
  if (!req.body.body) {
    return _dependencies.Response.badRequest(res, 'enter valid content');
  }
  if (req.body.title.length <= 4 || req.body.title.length >= 100) {
    return _dependencies.Response.badRequest(res, 'document title must be between 5 and 100 characters');
  }
  Documents.findOne({ where: { title: req.body.title } }).then(function (document) {
    if (document) {
      return _dependencies.Response.badRequest(res, 'document with title already exist');
    }
    req.locals.documentInput = req.body;
    next();
  });
};

var validateDocumentUpdate = function validateDocumentUpdate(req, res, next) {
  Documents.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Users,
      attributes: ['id', 'roleId']
    }
  }).then(function (documentToUpdate) {
    if (!documentToUpdate) return _dependencies.Response.notFound(res, 'document not found');
    if (parseInt(req.locals.user.decoded.roleId, 10) < parseInt(documentToUpdate.dataValues.User.roleId, 10) || parseInt(req.locals.user.decoded.userId, 10) === parseInt(documentToUpdate.ownerID, 10)) {
      req.locals.documentToUpdate = documentToUpdate;
      return next();
    }
    return _dependencies.Response.unAuthorized(res, 'you are not authorized');
  }).catch(function () {
    return _dependencies.Response.badRequest();
  });
};

exports.validateDeleteDocument = validateDeleteDocument;
exports.validateDocumentInput = validateDocumentInput;
exports.validateDocumentUpdate = validateDocumentUpdate;
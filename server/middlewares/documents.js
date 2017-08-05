import {
  Response,
  models,
} from './dependencies';

const Documents = models.Documents;
const Users = models.Users;

const validateDeleteDocument = (req, res, next) => {
  Documents.findById(req.params.id)
    .then((document) => {
      if (!document) {
        return Response.notFound(res, 'document not found');
      }

      if ([1, 2].includes(req.locals.user.decoded.roleId) === false
        && req.locals.user.decoded.userId !== parseInt(document.ownerID, 10)) {
        return Response.unAuthorized(res, 'you cannot perform this action');
      }
      req.locals.documentToBeDeleted = document;
      next();
    });
};

const validateDocumentInput = (req, res, next) => {
  if (!req.body.title) {
    return Response.badRequest(res, 'enter valid title');
  }
  if (!req.body.access) {
    return Response.badRequest(res, 'enter valid access');
  }
  if (!req.body.body) {
    return Response.badRequest(res, 'enter valid content');
  }
  if (req.body.title.length <= 4 || req.body.title.length >= 100) {
    return Response.badRequest(res, 'document title must be between 5 and 100 characters');
  }
  Documents.findOne({ where: { title: req.body.title } })
    .then((document) => {
      if (document) {
        return Response.badRequest(res, 'document with title already exist');
      }
      req.locals.documentInput = req.body;
      next();
    });
};

const validateDocumentUpdate = (req, res, next) => {
  Documents.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Users,
      attributes: ['id', 'roleId'],
    }
  })
    .then((documentToUpdate) => {
      if (!(documentToUpdate)) return Response.notFound(res, 'document not found');
      if (parseInt(req.locals.user.decoded.roleId, 10)
        < parseInt(documentToUpdate.dataValues.User.roleId, 10)
        || parseInt(req.locals.user.decoded.userId, 10)
        === parseInt(documentToUpdate.ownerID, 10)) {
        req.locals.documentToUpdate = documentToUpdate;
        return next();
      }
      return Response.unAuthorized(res, 'you are not authorized');
    })
    .catch(() => Response.badRequest());
};

export {
  validateDeleteDocument,
  validateDocumentInput,
  validateDocumentUpdate
};

import jwt from 'jsonwebtoken';
import SERVER from '../configs';
import { Helpers, Response } from '../utils/';
import models from '../models/';

const Users = models.Users;
const Documents = models.Documents;

const auth = {
  verifyAuthentication(req, res, next) {
    req.locals = {};
    // const uid = req.headers['x-userId'];
    // const rid = req.headers['x-roleId'];
    const authorizationToken = req.headers.authorization;
    const userId = 0, roleId = 0; // = Helpers.getUserFromHeaders(uid, rid);
    Helpers.TokenIsBlacklisted(authorizationToken)
    .then((tokenIsBlacklisted) => {
      if (authorizationToken) {
        const token = authorizationToken.split(' ')[1];
        jwt.verify(token, SERVER.JWT_SECRET, (error, decoded) => {
          if (!(error) && tokenIsBlacklisted === false) {
            req.locals.user = { decoded, isAuthenticated: true };
            return next();
          }
          req.locals.user = { decoded: { userId, roleId }, isAuthenticated: false };
          return next();
        });
      } else {
        req.locals.user = { decoded: { userId, roleId }, isAuthenticated: false };
        return next();
      }
    });
  },

  verifyRouteAndMethod(req, res, next) {
    const forbiddenRequest = ['POST', 'PUT', 'DELETE', 'UPDATE'];
    const authRoutes = [
      '/api/users/login/',
      '/api/users/login',
      '/api/users/',
      '/api/users'
    ];

    if (req.path.includes('logout')) {
      Helpers.BlacklistToken(req.headers.authorization.split(' ')[1])
        .then((status) => {
          if (status === true) {
            req.locals.user = {};
            next();
          }
        });
    } else if (
    (!authRoutes.includes(req.path)
      && forbiddenRequest.includes(req.method)
      && !req.locals.user.isAuthenticated)
      || (req.locals.user.decoded.userId === 0 && req.method === 'GET'
      && (req.path.includes('users') || req.path.includes('roles'))
      )) {
      return res.status(401).json({ message: 'you are not signed in' });
    }
    req.locals.user;
    return next();
  },

  validateUserInput(req, res, next) {
    if (parseInt(req.body.roleId, 10) === 1) {
      return Response.badRequest(res, 'you cannot signup with this priviledge');
    }
    const username = /\w+/g.test(req.body.username);
    const firstname = /\w+/g.test(req.body.firstname);
    const lastname = /\w+/g.test(req.body.lastname);
    const email = /\S+@\S+\.\S+/.test(req.body.email);
    const password = /\w+/g.test(req.body.password);

    if (!firstname) {
      return Response.badRequest(res, 'enter a valid firstname');
    }
    if (!lastname) {
      return Response.badRequest(res, 'enter a valid lastname');
    }
    if (!email) {
      return Response.badRequest(res, 'enter a valid email');
    }
    if (!username) {
      return Response.badRequest(res, 'enter a valid username');
    }
    if (!password) {
      return Response.badRequest(res, 'enter a valid password');
    }
    if (req.body.password && req.body.password.length < 7) {
      return Response.badRequest(res, 'password must be greater than 7 characters');
    }

    Users.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          return Response.badRequest(res, 'email already exist');
        }
        Users.findOne({ where: { username: req.body.username } })
          .then((newUser) => {
            if (newUser) {
              return Response.badRequest(res, 'username already exist');
            }
            req.locals.userInput = req.body;
            next();
          });
      });
  },

  validateLoginInput(req, res, next) {
    if (!(req.body.identifier) || !(req.body.password)) {
      return Response.badRequest(res, 'username and password are required');
    }
    req.locals.userLogin = req.body;
    next();
  },

  validateUserUpdate(req, res, next) {
    if ([1, 2, 3].indexOf(parseInt(req.params.id, 10)) > 0) {
      return Response.badRequest(res, 'you cannot modify this user');
    }
    if (parseInt(req.locals.user.decoded.userId, 10)
        === parseInt(req.params.id, 10) ||
        (parseInt(req.locals.user.decoded.roleId, 10) === 1)) {
      Users.findById(req.params.id)
        .then((userToUpdate) => {
          if (!userToUpdate) {
            return Response.badRequest(res, 'user not found');
          }
          req.locals.userToUpdate = userToUpdate;
          return next();
        });
    } else {
      return Response.unAuthorized(res, 'you are not permitted');
    }
  },

  validateDeleteUser(req, res, next) {
    if ((req.locals.user.decoded.roleId) !== 1
      && req.locals.user.decoded.userId !== parseInt(req.params.id, 10)) {
      return Response.forbidden(res, 'you cannot perform this action');
    }
    Users.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return Response.notFound(res, 'user not found');
        }
        if (parseInt(user.roleId, 10) === 1 || [1, 2, 3].includes(user.id)) {
          return Response.forbidden(res, 'you can not perform this action');
        }
        req.locals.userToBeDeleted = user;
        next();
      });
  },

  validateUserUpdateAccess(req, res, next) {
    Documents.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Users,
        attributes: ['id', 'username', 'email', 'firstname', 'lastname', 'createdAt', 'roleId'],
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
  },

  validateDocumentInput(req, res, next) {
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
  }

};

export default auth;

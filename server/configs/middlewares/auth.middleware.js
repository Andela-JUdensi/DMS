import jwt from 'jsonwebtoken';
import SERVER from '../configs/server.config';
import Helpers from '../../utils/Helpers';

const auth = {
  verifyAuthentication(req, res, next) {
    req.locals = {};
    const uid = req.headers['x-userid'];
    const rid = req.headers['x-roleid'];
    const authorizationToken = req.headers.authorization;
    const { userID, roleID } = Helpers.getUserFromHeaders(uid, rid);
    Helpers.TokenIsBlacklisted(authorizationToken)
    .then((tokenIsBlacklisted) => {
      if (authorizationToken) {
        const token = authorizationToken.split(' ')[1];
        jwt.verify(token, SERVER.JWT_SECRET, (error, decoded) => {
          if (!(error) && tokenIsBlacklisted === false) {
            req.locals.user = { decoded, isAuthenticated: true };
            return next();
          }
          req.locals.user = { decoded: { userID, roleID }, isAuthenticated: false };
          return next();
        });
      } else {
        req.locals.user = { decoded: { userID, roleID }, isAuthenticated: false };
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
      || (!req.locals.user.isAuthenticated && req.method === 'GET'
      && (req.path.includes('users') || req.path.includes('roles'))
      )) {
      return res.status(401).json({ message: 'you are not signed in' });
    }
    req.locals.user;
    return next();
  }

};

export default auth;

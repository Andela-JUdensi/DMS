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
    if (authorizationToken) {
      const token = authorizationToken.split(' ')[1];
      jwt.verify(token, SERVER.JWT_SECRET, (error, decoded) => {
        if (!(error)) {
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
  },

  verifyRouteAndMethod(req, res, next) {
    const forbiddenRequest = ['POST', 'PUT', 'DELETE', 'UPDATE'];
    const authRoutes = [
      '/api/users/login/',
      '/api/users/login',
      '/api/users/',
      '/api/users'
    ];
    if (!(authRoutes.includes(req.path))
      && forbiddenRequest.includes(req.method)
      && (!req.locals.user.isAuthenticated)) {
      return res.status(401).json({ message: 'you are not signed in' });
    }
    return next();
  }

};

export default auth;

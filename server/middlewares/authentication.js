import {
  jwt,
  SERVER,
  Helpers,
  Response,
} from './dependencies';

const verifyAuthentication = (req, res, next) => {
  req.locals = {};
  const authorizationToken = req.headers.authorization;
  const userId = 0, roleId = 0;
  Helpers.TokenIsBlacklisted(authorizationToken)
  .then((tokenIsBlacklisted) => {
    if (authorizationToken) {
      const token = authorizationToken.split(' ')[1];
      jwt.verify(token, SERVER.JWT_SECRET, (error, decoded) => {
        if (!(error) && tokenIsBlacklisted === false) {
          req.locals.user = { decoded, isAuthenticated: true };
          return next();
        }
        req.locals.user = {
          decoded: { userId, roleId },
          isAuthenticated: false
        };
        return next();
      });
    } else {
      req.locals.user = {
        decoded: { userId, roleId },
        isAuthenticated: false
      };
      return next();
    }
  });
};

const verifyRouteAndMethod = (req, res, next) => {
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
};

const validateLoginInput = (req, res, next) => {
  if (!(req.body.identifier) || !(req.body.password)) {
    return Response.badRequest(res, 'username and password are required');
  }
  req.locals.userLogin = req.body;
  next();
};

export {
  verifyAuthentication,
  verifyRouteAndMethod,
  validateLoginInput
};



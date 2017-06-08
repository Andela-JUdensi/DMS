import {
  Response,
} from './dependencies';

export const validateRoleChange = (req, res, next) => {
  if (req.locals.user.decoded.roleId !== 1) {
    return Response.unAuthorized(res, 'you are not authorized');
  }
  if ([1, 2, 3].includes(parseInt(req.params.id, 10))) {
    return Response.badRequest(res, 'can not modify this role');
  }
  return next();
};

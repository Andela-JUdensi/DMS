import {
  usersCtrl,
  middlewares
} from './dependencies';

const userRoute = (router) => {
  router
    .route('/users')
    .post(middlewares.validateUserInput, usersCtrl.create)
    .get(usersCtrl.findAll);
  router
    .route('/users/:id')
    .get(usersCtrl.findOne)
    .put(middlewares.validateUserUpdate, usersCtrl.update)
    .delete(middlewares.validateDeleteUser, usersCtrl.delete);
  router
    .route('/users/login')
    .post(middlewares.validateLoginInput, usersCtrl.login);
  router
    .route('/users/logout')
    .post(usersCtrl.logout);
  router
    .route('/users/:id/documents')
    .get(usersCtrl.documentsByUser);
};

export default userRoute;

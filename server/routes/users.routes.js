import {
  UsersController,
  middlewares
} from './dependencies';

const userRoute = (router) => {
  router
    .route('/users')
    .post(middlewares.validateUserInput, UsersController.create)
    .get(UsersController.findAll);
  router
    .route('/users/:id')
    .get(UsersController.findOne)
    .put(middlewares.validateUserUpdate, UsersController.update)
    .delete(middlewares.validateDeleteUser, UsersController.delete);
  router
    .route('/users/login')
    .post(middlewares.validateLoginInput, UsersController.login);
  router
    .route('/users/logout')
    .post(UsersController.logout);
  router
    .route('/users/:id/documents')
    .get(UsersController.documentsByUser);
};

export default userRoute;

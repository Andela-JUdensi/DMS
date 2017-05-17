import {
  usersCtrl,
} from './dependencies';

const userRoute = (router) => {
  router
    .route('/users')
    .post(usersCtrl.create)
    .get(usersCtrl.findAll);
  router
    .route('/users/:id')
    .get(usersCtrl.findOne)
    .put(usersCtrl.update)
    .delete(usersCtrl.delete);
  router
    .route('/users/login')
    .post(usersCtrl.login);
  router
    .route('/users/logout')
    .post(usersCtrl.logout);
  router
    .route('/users/:id/documents')
    .get(usersCtrl.documentsByUser);
};

export default userRoute;

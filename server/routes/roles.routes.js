import {
  RolesController,
} from './dependencies';

const rolesRoute = (router) => {
  router
    .route('/roles')
    .post(RolesController.create)
    .get(RolesController.findAll);
  router
    .route('/roles/:id')
    .get(RolesController.findOne)
    .put(RolesController.update)
    .delete(RolesController.delete);
};

export default rolesRoute;

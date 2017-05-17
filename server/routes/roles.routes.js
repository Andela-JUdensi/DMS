import {
  rolesCtrl,
} from './dependencies';

const rolesRoute = (router) => {
  router
    .route('/roles')
    .post(rolesCtrl.create)
    .get(rolesCtrl.findAll);
  router
    .route('/roles/:id')
    .get(rolesCtrl.findOne)
    .put(rolesCtrl.update)
    .delete(rolesCtrl.delete);
};

export default rolesRoute;

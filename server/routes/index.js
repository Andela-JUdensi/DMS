import documentRoute from './documents.routes';
import userRoute from './users.routes';
import searchRoute from './search.routes';
import rolesRoute from './roles.routes';

const routes = (router) => {
  userRoute(router);
  documentRoute(router);
  searchRoute(router);
  rolesRoute(router);
};

export default routes;

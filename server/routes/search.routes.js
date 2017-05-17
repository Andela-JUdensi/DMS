import {
  searchCtrl,
} from './dependencies';


const searchRoute = (router) => {
  router
    .route('/search/users/')
    .get(searchCtrl.searchForAUser);
  router
    .route('/search/documents/')
    .get(searchCtrl.searchForAdocument);
};

export default searchRoute;

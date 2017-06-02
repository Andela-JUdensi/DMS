import {
  SearchController,
} from './dependencies';


const searchRoute = (router) => {
  router
    .route('/search/users/')
    .get(SearchController.searchForAUser);
  router
    .route('/search/documents/')
    .get(SearchController.searchForAdocument);
};

export default searchRoute;

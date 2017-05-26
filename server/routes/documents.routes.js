import {
  documentsCtrl,
  middlewares
} from './dependencies';

const documentRoute = (router) => {
  router
    .route('/documents')
    .post(middlewares.validateDocumentInput, documentsCtrl.create)
    .get(documentsCtrl.findAll);
  router
    .route('/documents/:id')
    .get(documentsCtrl.findOne)
    .put(middlewares.validateUserUpdateAccess, documentsCtrl.update)
    .delete(documentsCtrl.delete);
};

export default documentRoute;

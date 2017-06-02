import {
  DocumentsController,
  middlewares
} from './dependencies';

// console.log(DocumentsController.findAll);

const documentRoute = (router) => {
  router
    .route('/documents')
    .post(middlewares.validateDocumentInput, DocumentsController.create)
    .get(DocumentsController.findAll);
  router
    .route('/documents/:id')
    .get(DocumentsController.findOne)
    .put(middlewares.validateUserUpdateAccess, DocumentsController.update)
    .delete(DocumentsController.delete);
};

export default documentRoute;

import {
  documentsCtrl,
} from './dependencies';

const documentRoute = (router) => {
  router
    .route('/documents')
    .post(documentsCtrl.create)
    .get(documentsCtrl.findAll);
  router
    .route('/documents/:id')
    .get(documentsCtrl.findOne)
    .put(documentsCtrl.update)
    .delete(documentsCtrl.delete);
};

export default documentRoute;

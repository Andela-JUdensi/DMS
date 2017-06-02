import {
  DocumentsController,
  middlewares
} from './dependencies';


const documentRoute = (router) => {
  router
    .route('/documents')
    /**
     * @swagger
     * /documents:
     *   post:
     *     description: Creates a new document
     *     tags:
     *      - Create Document
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewDocument'
     *     responses:
     *       201:
     *         description: documents
     *         schema:
     *          type: object
     */
    .post(middlewares.validateDocumentInput, DocumentsController.create)
    /**
     * @swagger
     * /documents:
     *   get:
     *      description: Returns a list of all documents
     *      tags:
     *        - Get Documents List
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          description: A valid token
     *          in: header
     *          required: true
     *          type: string
     *      responses:
     *          200:
     *              description: documents
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/Document'
     */
    .get(DocumentsController.findAll);
  router
    .route('/documents/:id')
    /**
     * @swagger
     * /documents/{id}:
     *   get:
     *     description: Returns a document by Id
     *     tags:
     *      - Returns a document by Id
     *     produces:
     *      - application/json
     *     parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *     responses:
     *        200:
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Document'
     */
    .get(DocumentsController.findOne)
    /**
     * @swagger
     * /documents/{id}:
     *   put:
     *     description: Updates a document by Id
     *     tags:
     *      - Returns a updated document
     *     produces:
     *      - application/json
     *     parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *     responses:
     *        200:
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Document'
     */
    .put(middlewares.validateUserUpdateAccess, DocumentsController.update)
    /**
     * @swagger
     * /documents/{id}:
     *   delete:
     *     description: Removes a document by Id
     *     tags:
     *      - Removes a document by Id
     *     produces:
     *      - application/json
     *     parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *     responses:
     *        200:
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Document'
     */
    .delete(DocumentsController.delete);
};

export default documentRoute;

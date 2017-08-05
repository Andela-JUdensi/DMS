import {
  DocumentsController,
  middlewares
} from './dependencies';


const documentRoute = (router) => {
   /**
   * @swagger
   * definitions:
   *   NewDocument:
   *     type: object
   *     required:
   *        - title
   *        - body
   *        - access
   *     properties:
   *        title:
   *           type: string
   *        body:
   *           type: string
   *        access:
   *            type: string
   *   Document:
   *      allOf:
   *        - $ref: '#definitions/NewDocument'
   *        - required:
   *        - id:
   *              type: integer
   *              format: int64
   */
  router
    .route('/documents')
    /**
     * @swagger
     * /api/documents:
     *   post:
     *     description: Creates a new document
     *     tags:
     *      - Create Document
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - name: body
     *         description: Document object
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
     * /api/documents:
     *   get:
     *      description: Returns a list of all documents
     *      tags:
     *        - Get Documents List
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: false
     *          type: string
     *      responses:
     *          200:
     *              description: documents
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/NewDocument'
     */
    .get(DocumentsController.findAll);
  router
    .route('/documents/:id')
    /**
     * @swagger
     * /api/documents/{id}:
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
     *        - name: id
     *          description: Document Id
     *          in:  path
     *          required: true
     *          type: integer
     *     responses:
     *        200:
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/NewDocument'
     */
    .get(DocumentsController.findOne)
    /**
     * @swagger
     * /api/documents/{id}:
     *   put:
     *     description: Updates a document by Id
     *     tags:
     *      - Updates a document by Id
     *     produces:
     *      - application/json
     *     parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *        - name: id
     *          description: Document Id
     *          in:  path
     *          required: true
     *          type: integer
     *        - name: body
     *          description: Document object
     *          in:  body
     *          required: true
     *          type: string
     *          schema:
     *            $ref: '#/definitions/NewDocument'
     *     responses:
     *        200:
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/NewDocument'
     */
    .put(middlewares.validateDocumentUpdate, DocumentsController.update)
    /**
     * @swagger
     * /api/documents/{id}:
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
     *        - name: id
     *          description: Document Id
     *          in:  path
     *          required: true
     *          type: integer
     *     responses:
     *        200:
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/NewDocument'
     */
    .delete(middlewares.validateDeleteDocument, DocumentsController.delete);
};

export default documentRoute;

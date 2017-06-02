import {
  RolesController,
} from './dependencies';

const rolesRoute = (router) => {
  router
    .route('/roles')
    /**
     * @swagger
     * /roles:
     *   post:
     *     description: Creates a role
     *     tags:
     *      - Create Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .post(RolesController.create)
    .get(RolesController.findAll);
  router
    .route('/roles/:id')
     /**
     * @swagger
     * /roles/{id}:
     *   get:
     *     description: Returns a role
     *     tags:
     *      - Returns a Role by id
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .get(RolesController.findOne)
    /**
     * @swagger
     * /roles/{id}:
     *   put:
     *     description: Updates a role
     *     tags:
     *      - Updates a role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .put(RolesController.update)
     /**
     * @swagger
     * /roles/{id}:
     *   delete:
     *     description: Deletes a role
     *     tags:
     *      - Deletes a role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .delete(RolesController.delete);
};

export default rolesRoute;

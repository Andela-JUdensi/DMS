import {
  RolesController,
  middlewares
} from './dependencies';

const rolesRoute = (router) => {
  router
    .route('/roles')
    /**
     * @swagger
     * /api/roles:
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
     *       - name: roleName
     *         description: Role name
     *         in:  body
     *         required: true
     *         type: string
     *       - name: description
     *         description: Role description
     *         in:  body
     *         required: true
     *         type: string
     *     responses:
     *       201:
     *         description: roles
     */
    .post(middlewares.validateRoleChange, RolesController.create)
    /**
     * @swagger
     * /api/roles:
     *   get:
     *      description: Returns a list of all roles
     *      tags:
     *        - Get Role List
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *      responses:
     *          200:
     *              description: roles
     */
    .get(RolesController.findAll);
  router
    .route('/roles/:id')
     /**
     * @swagger
     * /api/roles/{id}:
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
     *       - name: id
     *         description: Role Id
     *         in:  path
     *         required: true
     *         type: integer
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .get(RolesController.findOne)
    /**
     * @swagger
     * /api/roles/{id}:
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
     *       - name: id
     *         description: Role Id
     *         in:  path
     *         required: true
     *         type: integer
     *       - name: body
     *         description: Role description
     *         in:  body
     *         required: false
     *         type: string
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .put(middlewares.validateRoleChange, RolesController.update)
     /**
     * @swagger
     * /api/roles/{id}:
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
     *       - name: id
     *         description: Role Id
     *         in:  path
     *         required: true
     *         type: integer
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .delete(middlewares.validateRoleChange, RolesController.delete);
};

export default rolesRoute;

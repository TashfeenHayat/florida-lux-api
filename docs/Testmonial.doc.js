/**
 * @swagger
 * components:
 *   schemas:
 *     Testmonial:
 *       type: object
 *       properties:
 *         Username:
 *           type: string
 *           description: Name of the Testmonial.
 *           trim: true
 *           required: true
 *         content:
 *           type: string
 *           description: Content of the Testmonial.
 *           required: true
 *         agentId:
 *           type: string
 *           description: ID of the associated agent.
 *           required: true
 *         rating:
 *           type: number
 *           description: Rating given to the Testmonial (1 to 5).
 *           minimum: 1
 *           maximum: 5
 *           required: true
 *
 * paths:
 *   /v1/testmonials:
 *     post:
 *       summary: Create a new Testmonial.
 *       tags:
 *         - Testmonial
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testmonial'
 *       responses:
 *         '201':
 *           description: Successfully created a new Testmonial.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Testmonial'
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '500':
 *           description: Internal server error.
 *
 *     get:
 *       summary: Retrieve Testmonials based on a provided agentId or return all Testmonials if no id is given.
 *       parameters:
 *         - in: query
 *           name: agentId
 *           schema:
 *             type: string
 *           description: Optional. The key to search for agents.
 *         - in: query
 *           name: limit
 *           description: The number of Testmonials to return per page.
 *           schema:
 *             type: integer
 *         - in: query
 *           name: page
 *           description: The page number of results to return.
 *           schema:
 *             type: integer
 *       tags:
 *         - Testmonial
 *       responses:
 *         '200':
 *           description: A list of Testmonials.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Testmonial'
 *         '500':
 *           description: Internal server error.
 *
 *   /v1/testmonials/{id}:
 *     get:
 *       summary: Retrieve a Testmonial by ID.
 *       tags:
 *         - Testmonial
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the Testmonial to retrieve.
 *       responses:
 *         '200':
 *           description: The Testmonial object.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Testmonial'
 *         '404':
 *           description: Testmonial not found.
 *         '500':
 *           description: Internal server error.
 *
 *     patch:
 *       summary: Update a Testmonial by ID.
 *       tags:
 *         - Testmonial
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the Testmonial to update.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testmonial'
 *       responses:
 *         '200':
 *           description: Successfully updated the Testmonial.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Testmonial'
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '404':
 *           description: Testmonial not found.
 *         '500':
 *           description: Internal server error.
 *
 *     delete:
 *       summary: Delete a Testmonial by ID.
 *       tags:
 *         - Testmonial
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the Testmonial to delete.
 *       responses:
 *         '200':
 *           description: Successfully deleted the Testmonial.
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '404':
 *           description: Testmonial not found.
 *         '500':
 *           description: Internal server error.
 */

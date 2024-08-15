/**
 * @swagger
 * components:
 *   schemas:
 *     Press:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Name of the Press
 *           trim: true
 *           required: true
 *         content:
 *           type: string
 *           description: Content of the Press
 *          photo:
 *           type: string
 *           description: The photo URL of the item.

 *
 * paths:
 *   /v1/press:
 *     post:
 *       summary: Create a new Press.
 *       tags:
 *         - Press
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 * 
 *             schema:
 *               $ref: '#/components/schemas/Press'
 *       responses:
 *         '201':
 *           description: Successfully created a new post.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Press'
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '500':
 *           description: Internal server error.
 *
 *     get:
 *       summary: Retrieve Presss based on a provided agentId or return all Presss if no id is given.
 *       parameters:
 *         - in: query
 *           name: agentId
 *           schema:
 *             type: string
 *           description: Optional. The key to search for posts.
 *         - in: query
 *           name: limit
 *           description: The number of agents to return per page.
 *           schema:
 *             type: integer
 *         - in: query
 *           name: page
 *           description: The page number of results to return.
 *           schema:
 *             type: integer
 *       tags:
 *         - Press
 *       responses:
 *         '200':
 *           description: A list of Press.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Press'
 *         '500':
 *           description: Internal server error.
 *
 *   /v1/press/{id}:
 *     get:
 *       summary: Retrieve a Press by ID.
 *       tags:
 *         - Press
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the Press to retrieve.
 *       responses:
 *         '200':
 *           description: The Press object.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Press'
 *         '404':
 *           description: Press not found.
 *         '500':
 *           description: Internal server error.
 *
 *     patch:
 *       summary: Update a Press by ID.
 *       tags:
 *         - Press
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the Press to update.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Press'
 *       responses:
 *         '200':
 *           description: Successfully updated the Press.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Press'
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '404':
 *           description: Press not found.
 *         '500':
 *           description: Internal server error.
 *
 *     delete:
 *       summary: Delete a Press by ID.
 *       tags:
 *         - Press
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the Press to delete.
 *       responses:
 *         '200':
 *           description: Successfully deleted the Press.
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '404':
 *           description: Filter not found.
 *         '500':
 *           description: Internal server error.
 */

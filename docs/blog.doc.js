/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Name of the blog
 *           trim: true
 *           required: true
 *         content:
 *           type: string
 *           description: Content of the blog
 *         agentId:
 *           type: string
 *           description: Description of the blog
 *
 * paths:
 *   /v1/blog:
 *     post:
 *       summary: Create a new blog.
 *       tags:
 *         - Blog
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       responses:
 *         '201':
 *           description: Successfully created a new blog.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Blog'
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '500':
 *           description: Internal server error.
 *
 *     get:
 *       summary: Retrieve blogs based on a provided agentId or return all blogs if no id is given.
 *       parameters:
 *         - in: query
 *           name: agentId
 *           schema:
 *             type: string
 *           description: Optional. The key to search for agents.
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
 *         - Blog
 *       responses:
 *         '200':
 *           description: A list of blogs.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Blog'
 *         '500':
 *           description: Internal server error.
 *
 *   /v1/blog/{id}:
 *     get:
 *       summary: Retrieve a blog by ID.
 *       tags:
 *         - Blog
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the blog to retrieve.
 *       responses:
 *         '200':
 *           description: The blog object.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Blog'
 *         '404':
 *           description: Blog not found.
 *         '500':
 *           description: Internal server error.
 *
 *     patch:
 *       summary: Update a blog by ID.
 *       tags:
 *         - Blog
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the blog to update.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       responses:
 *         '200':
 *           description: Successfully updated the blog.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Blog'
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '404':
 *           description: Blog not found.
 *         '500':
 *           description: Internal server error.
 *
 *     delete:
 *       summary: Delete a blog by ID.
 *       tags:
 *         - Blog
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the blog to delete.
 *       responses:
 *         '200':
 *           description: Successfully deleted the blog.
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '404':
 *           description: Filter not found.
 *         '500':
 *           description: Internal server error.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Filter:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the filter.
 *         name:
 *           type: string
 *           trim: true
 *           description: The name of the filter.
 *         code:
 *           type: string
 *           description: The code of the filter.
 *         description:
 *           type: string
 *           description: The description of the filter.
 *         photo:
 *           type: string
 *           description: The URL of the filter's photo.
 *
 * paths:
 *   /v1/filter:
 *     post:
 *       summary: Create a new filter.
 *       tags:
 *         - Filters
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filter'
 *       responses:
 *         '201':
 *           description: Successfully created a new filter.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Filter'
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '500':
 *           description: Internal server error.
 * 
 *     get:
 *       summary: Retrieve filters based on a provided key or return all agents if no key is given.
 *       parameters:
 *         - in: query
 *           name: key
 *           schema:
 *             type: string
 *           description: Optional. The key to search for agents.

 *       tags:
 *         - Filters
 *       responses:
 *         '200':
 *           description: A list of filters.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Filter'
 *         '500':
 *           description: Internal server error.
 *
 *   /v1/filter/{id}:
 *     get:
 *       summary: Retrieve a filter by ID.
 *       tags:
 *         - Filters
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the filter to retrieve.
 *       responses:
 *         '200':
 *           description: The filter object.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Filter'
 *         '404':
 *           description: Filter not found.
 *         '500':
 *           description: Internal server error.
 *
 *     patch:
 *       summary: Update a filter by ID.
 *       tags:
 *         - Filters
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the filter to update.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filter'
 *       responses:
 *         '200':
 *           description: Successfully updated the filter.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Filter'
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '404':
 *           description: Filter not found.
 *         '500':
 *           description: Internal server error.
 */
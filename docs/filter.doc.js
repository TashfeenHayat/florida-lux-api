/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     Filter:
 *       type: object
 *       properties:
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
 * /v1/filters:
 *   get:
 *     summary: Get all filters
 *     description: Retrieve a list of all filters.
 *     tags:
 *       - Filters
 *     responses:
 *       200:
 *         description: A list of filters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filter'
 *       500:
 *         description: Internal server error
 * 
 *   post:
 *     summary: Create a new filter
 *     description: Create a new filter.
 *     tags:
 *       - Filters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Filter'
 *     responses:
 *       201:
 *         description: Filter created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 * 
 */
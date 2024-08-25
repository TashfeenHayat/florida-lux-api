/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Name of the Report
 *           trim: true
 *           required: true
 *         content:
 *           type: string
 *           description: Content of the Report

 *
 * paths:
 *   /v1/Report:
 *     post:
 *       summary: Create a new Report.
 *       tags:
 *         - Report
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       responses:
 *         '201':
 *           description: Successfully created a new Final_report.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Report'
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '500':
 *           description: Internal server error.
 *
 *     get:
 *       summary: Retrieve Report based on a provided agentId or return all Report if no id is given.
 *       parameters:
 *         - in: query
 *           name: agentId
 *           schema:
 *             type: string
 *           description: Optional. The key to search for report.
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
 *         - Report
 *       responses:
 *         '200':
 *           description: A list of Report.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Report'
 *         '500':
 *           description: Internal server error.
 *
 *   /v1/Report/{id}:
 *     get:
 *       summary: Retrieve a Report by ID.
 *       tags:
 *         - Report
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the Report to retrieve.
 *       responses:
 *         '200':
 *           description: The Report object.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Report'
 *         '404':
 *           description: Report not found.
 *         '500':
 *           description: Internal server error.
 *
 *     patch:
 *       summary: Update a Report by ID.
 *       tags:
 *         - Report
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the Report to update.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       responses:
 *         '200':
 *           description: Successfully updated the Report.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Report'
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '404':
 *           description: Report not found.
 *         '500':
 *           description: Internal server error.
 *
 *     delete:
 *       summary: Delete a Report by ID.
 *       tags:
 *         - Report
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the Report to delete.
 *       responses:
 *         '200':
 *           description: Successfully deleted the Report.
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '404':
 *           description: Filter not found.
 *         '500':
 *           description: Internal server error.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Inquiry:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User's name
 *         lastName:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         message:
 *           type: string
 *           description: Message from the user
 * 
 * paths:
 *  /v1/inquiry:
 *    post:
 *      summary: Submit an Inquiry
 *      description: Submits an inquiry with user's name, email, and message
 *      tags: 
 *        - Inquiry
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Inquiry'
 *      responses:
 *        '201':
 *          description: Inquiry submitted successfully
 *        '400':
 *          description: Invalid request body
 *        '500':
 *          description: Internal server error
 *
 *    get:
 *      summary: Get All Inquiries
 *      description: Retrieves all inquiries
 *      tags: 
 *        - Inquiry
 *      responses:
 *        '200':
 *          description: List of inquiries
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Inquiry'
 *        '500':
 *          description: Internal server error
 */


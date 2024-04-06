/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           description: The username
 *         email:
 *           type: string
 *           description: The email
 *         password:
 *           type: string
 *           description: The paassword
 *         firstName:
 *           type: string
 *           description: The first name
 *         lastName:
 *           type: string
 *           description: The last name 
 *         phoneNumber:
 *           type: string
 *           description: The phone number
 *         roleId:
 *           type: string
 *           description: The role identifier
 *         uerStatus:
 *           type: string
 *           description: The user status
 *
 * 
 * /v1/user/login:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate a user with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   description: The user object
 *                 token:
 *                   type: string
 *                   description: Authentication token for the user.
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *       '500':
 *         description: Internal server error.
 * 
 * /v1/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with username, password, and email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Successfully registered.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 * /v1/user/profile:
 *   get:
 *     summary: Get loggedin user profile
 *     description: Retrieve the profile information of the authenticated user.
 *     responses:
 *       '200':
 *         description: Successfully registered.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */


/**
 * @swagger
 * /v1/upload:
 *   post:
 *     summary: Uploads a file to Firebase Storage and makes it publicly accessible.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: file
 *         in: formData
 *         description: The file to upload.
 *         required: true
 *         type: file
 *     responses:
 *       '200':
 *         description: File uploaded successfully. Returns the public URL of the uploaded file.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The publicly accessible URL of the uploaded file.
 *       '400':
 *         description: Bad request. Indicates that the file upload failed.
 */

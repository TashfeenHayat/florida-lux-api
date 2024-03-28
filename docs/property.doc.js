/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the property.
 *           example: "Beautiful Villa"
 *         code:
 *           type: string
 *           description: The code of the property.
 *           example: "PROP123"
 *         description:
 *           type: string
 *           description: The description of the property.
 *           example: "Spacious villa with stunning views"
 *         status:
 *           type: string
 *           enum: ["for_sale", "sold", "incoming", "for_rent"]
 *           description: The status of the property.
 *           example: "for_sale"
 *         media:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               smUrl:
 *                 type: string
 *                 description: The URL of the small-sized media.
 *               mdUrl:
 *                 type: string
 *                 description: The URL of the medium-sized media.
 *               xlUrl:
 *                 type: string
 *                 description: The URL of the extra-large-sized media.
 *         neighborhood:
 *           type: string
 *           description: The neighborhood of the property.
 *         addressLine1:
 *           type: string
 *           description: The address line 1 of the property.
 *         addressLine2:
 *           type: string
 *           description: The address line 2 of the property.
 *         state:
 *           type: string
 *           description: The state of the property.
 *         city:
 *           type: string
 *           description: The city of the property.
 *         country:
 *           type: string
 *           description: The country of the property.
 *         zipCode:
 *           type: string
 *           description: The zip code of the property.
 *         longitude:
 *           type: string
 *           description: The longitude of the property.
 *         latitude:
 *           type: string
 *           description: The latitude of the property.
 *         area:
 *           type: string
 *           description: The area of the property.
 *         areaUnit:
 *           type: string
 *           description: The unit of area measurement of the property.
 *         leasePeriod:
 *           type: string
 *           description: The lease period of the property.
 *         salePrice:
 *           type: string
 *           description: The sale price of the property.
 *         reducedPrice:
 *           type: string
 *           description: The reduced price of the property.
 *         currency:
 *           type: string
 *           description: The currency used for price.
 *         visitHours:
 *           type: string
 *           description: The visit hours of the property.
 *         bedroomCount:
 *           type: string
 *           description: The number of bedrooms in the property.
 *         bathCount:
 *           type: string
 *           description: The number of bathrooms in the property.
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: The tags associated with the property.
 *         reference:
 *           type: string
 *           description: The reference code of the property.
 *         agentId:
 *           type: string
 *           description: The ID of the agent associated with the property.
 *         filters:
 *           type: array
 *           items:
 *             type: string
 *           description: The IDs of filters associated with the property.
 * 
 * /v1/property:
 *   post:
 *     summary: Create a new property
 *     description: Create a new property listing.
 *     security:
 *       - AccessToken: []
 *     tags:
 *       - Property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       '201':
 *         description: Property created successfully
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error 
 * 
 * 
 *   get:
 *     summary: Get loggedin Property profile
 *     description: Retrieve the profile information of the authenticated Property.
 *     tags:
 *       - Property
 *     responses:
 *       '200':
 *         description: Successfully registered.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 * 
 * /v1/property/{id}:
 *   get:
 *     summary: Get property by ID
 *     description: Retrieve an property by its ID.
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Property
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the agent to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       '404':
 *         description: Property not found
 *       '500':
 *         description: Internal server error
 * 
 *   patch:
 *     summary: Update a property
 *     description: Update a property.
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       '201':
 *         description: Property created successfully
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 * 
 */

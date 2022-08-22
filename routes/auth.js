const express = require('express');
const { login } = require('../controllers/users');

const router = express.Router();

router.post('/login', login);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *      Users:
 *        type: object
 *        properties:
 *          _id:
 *            type: number
 *            description: the auto-generated id of users
 *          email:
 *            type: string
 *            description: email of user
 *          password:
 *            type: string
 *            description: password of user
 *          required:
 *            - email
 *            - password
 *        example:
 *            id: 62ffb58fa39558560d1f5486
 *            email: user@example.com
 *            password: EncodedPassword
 *
 *      UserNotFound:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            description: Message for not found user
 *          statusCode:
 *           type: number
 *           description: Http Status Code
 *        example:
 *          message: User not found
 *          statusCode: 404
 *
 *      Unauthorized:
 *        properties:
 *          message:
 *            type: string
 *            description: Message for unauthorized user
 *          code:
 *           type: number
 *           description: Http Status Code
 *        example:
 *          code: 401
 *          message: JWT must be provided
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                type: string
 *                description: user email
 *                required: true
 *               password:
 *                type: string
 *                required: true
 *     responses:
 *        200:
 *          description: Successful response - Token Received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                properties:
 *                  code:
 *                    type: number
 *                    format: number
 *                  status:
 *                    type: boolean
 *                    format: boolean
 *                  message:
 *                    type: string
 *                    format: string
 *                  body:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        format: string
 *                example:
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        401:
 *          description: Error response - Error Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *        500:
 *          description: Error response - Internal server error
 */

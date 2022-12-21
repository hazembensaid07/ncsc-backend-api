const express = require("express");
const router = express.Router();
const {
  addbooking,
  loadBookings,
  loadBooking,
  Transportplaces,
  getRooms,
  getAvailableRooms_Transport,
  addAvailableRooms_Transport,
  loadBookingByUserEmail,
  deleteBooking,
  deleteRoomMate,
} = require("../controllers/booking");

const { hotelValidator } = require("../validators/hotel");
const { admin, isAuth } = require("../middlewares/SignIn");
const { bookingValidator } = require("../validators/booking");
const { runValidation } = require("../validators");
/**
 * @swagger
 * components:
 *   schemas:
 *     addbooking:
 *       type: object
 *       required:
 *         - room
 *       properties:
 *         room:
 *           type: Number
 *           description: the room type
 *           example: 1 for single 2 for double 3 for triple
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     roommate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: String
 *           description: the roommate id
 *           example:  autogenareted id from mongodb
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     hotel:
 *       type: object
 *       required:
 *         - rooms
 *         - transport
 *       properties:
 *         rooms:
 *           type: Number
 *           description: the number of available rooms in the hotel
 *           example: 300
 *         transport:
 *           type: Number
 *           description: the number of available transport places in the bus
 *           example: 300
 */
/**
 * @swagger
 * tags:
 *   name: booking
 *   description: booking  API
 */
/**
 * @swagger
 * /api/booking/add:
 *   post:
 *     summary: add booking for all the roomates
 *     tags: [booking]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/addbooking'
 *     parameters:
 *            - in: header
 *              name: authorization
 *              description: user   token (store it in local storage )
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: booking added.
 *       401:
 *         description: can not save it
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 */
router.post(
  "/booking/add",
  isAuth,
  bookingValidator,
  runValidation,
  addbooking
);
/**
 * @swagger
 * /api/booking/all:
 *   get:
 *     summary: get all bookings
 *     tags: [booking]
 *     parameters:
 *            - in: header
 *              name: authorization
 *              description: admin  token (admin protected route)
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: booking found
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 *       401:
 *         description: can not get bookings
 *
 */
router.get("/booking/all", admin, loadBookings);
/**
 * @swagger
 * /api/booking/one/{id}:
 *   get:
 *     summary: get booking by id
 *     tags: [booking]
 *     parameters:
 *            - in: header
 *              name: authorization
 *              description: user  token
 *              required: true
 *              schema:
 *               type: string
 *            - in: path
 *              name: id
 *              description: user booking id
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: booking found
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 *       401:
 *         description: there is no booking
 */
router.get("/booking/one/:id", isAuth, loadBooking);
/**
 * @swagger
 * /api/booking/rooms/:
 *   get:
 *     summary: get booked rooms by category single double triple
 *     tags: [booking]
 *     parameters:
 *            - in: header
 *              name: authorization
 *              description: admin   token (admin protected route)
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: rooms per category
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 *       401:
 *         description: can not get rooms
 */
router.get("/booking/rooms", admin, getRooms);
/**
 * @swagger
 * /api/booking/available/:
 *   get:
 *     summary: get available  rooms
 *     tags: [booking]
 *     parameters:
 *            - in: header
 *              name: authorization
 *              description: admin   token (admin protected route)
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: rooms per category
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 *       401:
 *         description: can not get rooms
 */
router.get("/booking/available", isAuth, getAvailableRooms_Transport);
/**
 * @swagger
 * /api/booking/add_available:
 *   post:
 *     summary: add hotel rooms and transport places
 *     tags: [booking]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/hotel'
 *     parameters:
 *            - in: header
 *              name: authorization
 *              description: admin    token (admin protected route)
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: hotel added.
 *       401:
 *         description: can not save it
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 */
router.post(
  "/booking/add_available",
  admin,
  hotelValidator,
  addAvailableRooms_Transport
);
/**
 * @swagger
 * /api/booking/delete:
 *   post:
 *     summary: delete booking by user
 *     tags: [booking]
 *     parameters:
 *            - in: header
 *              name: authorization
 *              description: user    token
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: booking deleted.
 *       401:
 *         description: can not get bookings
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 */
router.post("/booking/delete", isAuth, deleteBooking);
/**
 * @swagger
 * /api/booking/byuseremail:
 *   get:
 *     summary: get booking by user email
 *     tags: [booking]
 *     parameters:
 *            - in: header
 *              name: authorization
 *              description: user  token
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: booking found
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 *       401:
 *         description: there is no booking
 */
router.get("/booking/byuseremail", isAuth, loadBookingByUserEmail);
/**
 * @swagger
 * /api/booking/deleteMate:
 *   post:
 *     summary: delete roommate
 *     tags: [booking]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/roommate'
 *     parameters:
 *            - in: header
 *              name: authorization
 *              description: user    token
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: roomMate deleted.
 *       401:
 *         description: can not delete
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 */
router.post("/booking/deleteMate", isAuth, deleteRoomMate);

module.exports = router;

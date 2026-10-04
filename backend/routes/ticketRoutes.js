const express = require("express");
const multer = require("multer");
const {
  createTicket,
  getUserTickets,
  getSingleTicket,
  getAllTickets,
  deleteTicket
} = require("../controllers/ticketController");

const Ticket = require('../models/Ticket');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});
const upload = multer({ storage: storage });

/**
 * POST /api/tickets/ (create a ticket)
 */
router.post("/", upload.single("attachment"), createTicket);

/**
 * GET /api/tickets/user/tickets?username=demoUser
 * Get tickets for a specific user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await Ticket.find({ userId }); // match by userId
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user tickets" });
  }
});

/**
 * GET /api/tickets/admin/all (get all tickets - admin)
 */
router.get("/admin/all", getAllTickets);

/**
 * GET /api/tickets/ (default route - not used)
 */
router.get("/", getUserTickets);

/**
 * GET /api/tickets/:id (get single ticket)
 */
router.get("/:id", getSingleTicket);

/**
 * DELETE /api/tickets/:id (delete ticket)
 */
router.delete("/:id", deleteTicket);

module.exports = router;

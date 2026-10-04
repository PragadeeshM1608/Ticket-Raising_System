const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const {
      userId,
      ticketName,
      priority,
      title,
      department,
      description,
      customerName,
      email
    } = req.body;

    if (!ticketName || !priority || !title || !department || !customerName || !email) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const attachment = req.file ? req.file.filename : "file not uploaded";

    const newTicket = new Ticket({
      userId,
      ticketName,
      priority,
      title,
      department,
      description,
      customerName,
      email,
      attachment
    });
    console.log("from > ticketcontroller",userId,attachment);

    await newTicket.save();
    res.status(201).json({ message: "Ticket created successfully!" });

  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getUserTickets = async (req, res) => {
  const { email } = req.query;

  try {
    const tickets = await Ticket.find({ email });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getSingleTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Ticket deleted" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = {
  createTicket,
  getUserTickets,
  getSingleTicket,
  getAllTickets,
  deleteTicket
};


console.log("this is form ticketController.js");



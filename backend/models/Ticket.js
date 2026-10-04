const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId:String,
  ticketName:String,
  title: String,
  priority: String,
  department: String,
  description: String,
  customerName:String,
  email: String,
  attachment:String,
  createdBy: String, // username of the person who created the ticket
  status: {
    type: String,
    default: 'open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);

console.log("hey i am Ticket.js");
  
module.exports = function(io) {
const express = require('express');
const router = express.Router();

router.put('/topup/:id', (req, res) => {
  const { id } = req.params;
  const { saldo } = req.body;

  // Emit a top-up event with the updated balance
  io.emit('top_up', id, { saldo });

  res.json({ saldo });
});

router.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { order } = req.body;

    // Emit a new_order event with the order details
    io.emit('new_order', id, { order });

    res.json({ order });
});

router.put('/orders/:id/pick_location', (req, res) => {
    const { id } = req.params;
    const { order } = req.body;

    // Emit a order_pick_location event with the order details
    io.emit('order_pick_location', id, { order });

    res.json({ order });
});

router.put('/orders/:id/pick_location_arrive', (req, res) => {
    const { id } = req.params;
    const { order } = req.body;

    // Emit a order_pick_location_arrive event with the order details
    io.emit('order_pick_location_arrive', id, { order });

    res.json({ order });
});

router.put('/orders/:id/complete', (req, res) => {
    const { id } = req.params;
    const { order } = req.body;

    // Emit a order_complete event with the order details
    io.emit('order_complete', id, { order });

    res.json({ order });
});

router.put('/orders/:id/cancel_accept', (req, res) => {
    const { id } = req.params;
    const { order } = req.body;

    // Emit a order_cancel_accept event with the order details
    io.emit('order_cancel_accept', id, { order });

    res.json({ order });
});

router.put('/orders/:id/cancel_reject', (req, res) => {
    const { id } = req.params;
    const { order } = req.body;

    // Emit a order_cancel_reject event with the order details
    io.emit('order_cancel_reject', id, { order });

    res.json({ order });
});

router.put('/orders/depart/:id', (req, res) => {
    const { id } = req.params;
    const { order } = req.body;

    // Emit a order_driver_departure event with the order details
    io.emit('order_driver_departure', id, { order });

    res.json({ order });
});

router.put('/orders/:id/accept', async (req, res) => {
    const { id } = req.params;
    const { order } = req.body;

    // Emit an order_accept event with the order details
    io.emit('order_accept', id, { order });

    console.log("Order accepted successfully");
    res.json({ success: true, message: 'You have accepted the order', order: order });
});

router.get('/topup/:id', (req, res) => {
  const { id } = req.params;
  // Fetch the balance for the given id from your database
  // For now, let's just send a dummy response
  res.json({ id, saldo: 1000 });
});

// Create a chat
router.post('/passenger/chats', (req, res) => {
  // Replace with actual code to create a chat
  const chat = {
    id: Date.now(), // Dummy id
    passengerId: req.body.passengerId,
    driverId: req.body.driverId,
    createdAt: new Date()
  };

  // Emit a WebSocket event
  io.emit('chat_created', chat);

  res.json(chat);
});

// Create a chat for drivers
router.post('/chats', (req, res) => {
  // Replace with actual code to create a chat
  const chat = {
    id: Date.now(), // Dummy id
    driverId: req.body.driverId,
    passengerId: req.body.passengerId,
    createdAt: new Date()
  };

  // Emit a WebSocket event
  io.emit('chat_created', chat);

  res.json(chat);
});

// Send a message
router.post('/passenger/chats/:chat/messages', (req, res) => {
  // Replace with actual code to send a message
  const message = {
    id: Date.now(), // Dummy id
    chatId: req.params.chat,
    senderId: req.body.senderId,
    content: req.body.content,
    createdAt: new Date()
  };

  // Emit a WebSocket event
  io.emit('message_sent', message);

  res.json(message);
});

// Send a message for drivers
router.post('/chats/:chat/messages', (req, res) => {
  // Replace with actual code to send a message
  const message = {
    id: Date.now(), // Dummy id
    chatId: req.params.chat,
    senderId: req.body.senderId,
    content: req.body.content,
    createdAt: new Date()
  };

  // Emit a WebSocket event
  io.emit('message_sent', message);

  res.json(message);
});

// Update a chat
router.put('/passenger/chat/:chat', (req, res) => {
  // Replace with actual code to update a chat
  const chat = {
    id: req.params.chat,
    updatedAt: new Date()
    // Other fields to update...
  };

  // Emit a WebSocket event
  io.emit('chat_updated', chat);

  res.json(chat);
});

// Update a chat for drivers
router.put('/chat/:chat', (req, res) => {
  // Replace with actual code to update a chat
  const chat = {
    id: req.params.chat,
    updatedAt: new Date()
    // Other fields to update...
  };

    // Emit a WebSocket event
  io.emit('chat_updated', chat);


  res.json(chat);
});

// Delete a chat
router.delete('/passenger/chat/:chat', (req, res) => {
  // Replace with actual code to delete a chat
  const chatId = req.params.chat;

  // Emit a WebSocket event
  io.emit('chat_deleted', chatId);

  res.json({ success: true, chatId });
});



  // Test GET route
  router.get('/topup', (req, res) => {
    res.json({ message: 'Test GET API is working' });
  });

  return router;
}
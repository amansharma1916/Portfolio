import express from 'express';
import Protect from '../middle/auth.middleware.js';
import {sendMessage, getMessages, deleteMessage} from './contact.controller.js';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/messages', Protect, getMessages);
router.delete('/messages/:id', Protect, deleteMessage);

export default router;
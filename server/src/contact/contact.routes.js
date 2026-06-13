import express from 'express';
import Protect from '../middle/auth.middleware.js';
import {contactRateLimit} from './contact.rateLimit.js';
import {sendMessage, getMessages, deleteMessage} from './contact.controller.js';

const router = express.Router();

router.post('/send', contactRateLimit, sendMessage);
router.get('/messages', Protect, getMessages);
router.delete('/messages/:id', Protect, deleteMessage);

export default router;
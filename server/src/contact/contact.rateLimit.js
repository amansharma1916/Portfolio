import rateLimit from 'express-rate-limit';

export const contactRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, 
  
  max: 5, 

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many messages sent. Please try again after 10 minutes.",
  },
});
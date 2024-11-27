const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const routes = require('./routes');
const logger = require('./logger');
const apiKeyValidator = require('./middleware/apiKeyValidator');

const app = express();
const PORT = process.env.PORT || 5000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {"error":"Too many requests from this IP, please try again later."},
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res, options) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(options.statusCode).json(options.message);
    },
});

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use('/api', apiKeyValidator, routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

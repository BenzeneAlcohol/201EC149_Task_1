const express = require('express');
const {dashboard, getUser} = require('../controllers/usercontroller');
const {auth} = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, dashboard);
router.get('/:id', getUser);

module.exports = router;
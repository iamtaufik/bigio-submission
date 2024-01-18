const router = require('express').Router();

router.use('/stories', require('./story.route'));

module.exports = router;
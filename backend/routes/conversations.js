const router = require('express').Router();
const {
  newConversation,
  getConversation,
} = require('../controllers/conversationsControllers');

router.post('/', newConversation);
router.get('/:userId', getConversation);

module.exports = router;
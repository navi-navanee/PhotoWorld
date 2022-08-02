const router = require("express").Router();
const {getMessage,savedMessage}=require('../controllers/messagesControllers');

router.post('/',savedMessage );
router.get('/:conversationId',getMessage);
module.exports = router;
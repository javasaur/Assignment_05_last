import * as express from 'express';
import * as controllers from '../controllers/';

const router = express.Router();

router.post('/', express.json(), controllers.Messages.getAllDialogueMessages);
router.post('/add', express.json(), controllers.Messages.addMessage);

export default router;
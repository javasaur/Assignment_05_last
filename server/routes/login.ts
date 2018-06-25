import * as express from 'express';
import * as controllers from '../controllers/';

const router = express.Router();

// GET users
router.post('/', express.json(), controllers.Login.checkMatch);

export default router;
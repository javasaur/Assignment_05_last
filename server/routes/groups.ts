import * as express from 'express';
import * as controllers from '../controllers/';

const router = express.Router();

// GET users
router.post('/', express.json(), controllers.Groups.addGroup);
router.post('/adduser', express.json(), controllers.Groups.addUserToGroup)

export default router;
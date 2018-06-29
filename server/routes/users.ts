import * as express from 'express';
import * as controllers from '../controllers/';

const router = express.Router();

router.get('/', express.json(), controllers.Users.getAllUsers);
router.get('/:id', controllers.Users.getUser);
router.post('/', express.json(), controllers.Users.addUser);
router.put('/', express.json(), controllers.Users.updateUser);
router.delete('/', controllers.Users.removeUser)

export default router;
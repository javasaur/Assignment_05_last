import * as express from 'express';
import * as controllers from '../controllers/';

const router = express.Router();

router.post('/', express.json(), controllers.Tree.buildJSONTree);

export default router;
const express = require ('express');
const router = express.Router();
const taskController = require('../controllers/tasks');
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth,taskController.create_new_task);

router.get('/:projectID', taskController.get_all_tasks);

router.patch('/:taskID',checkAuth, taskController.update_task);

router.delete('/:taskID',checkAuth, taskController.delete_task);

module.exports = router;
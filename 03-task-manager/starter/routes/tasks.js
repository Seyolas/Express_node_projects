const express = require('express')
const router = express.Router();

const {getAllTasks,createTasks,getTask,updateTask,deleteTask} = require('../controllers/tasks')

// router.route('/').get((req,res)=>{
//     res.send('all items')
// })


router.route('/').get(getAllTasks).post(createTasks)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)




module.exports = router


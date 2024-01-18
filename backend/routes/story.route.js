const router = require('express').Router();
const { createStory, getStories, getStoryById, editStory,deleteStory} = require('../controllers/story.controller');

router.post('/', createStory);
router.get('/', getStories);
router.get('/:id', getStoryById);
router.put('/:id', editStory);
router.delete('/:id', deleteStory);

module.exports = router;

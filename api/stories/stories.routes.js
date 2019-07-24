const storiesService = require('./stories.service');
const router = require('express').Router();


router.get('/stories/all', async (req, res) => {
  await storiesService.storiesAll(req, res)
    .then(data => data)
    .then(stories => res.json(stories))
    .catch(err => {
      res.status(500);
      res.statusMessage = "Internal Server Error";
    });
});

router.get('/story/:id', async (req, res) => {
  await storiesService.storyByID(req, res)
    .then(story => story)
    .then(data => res.json(data))
    .catch(err => {
      res.status(500);
      res.statusMessage = "Internal Server Error";
    })
});

router.post('/story/new', async (req, res) => {
  await storiesService.storyNew(req, res)
    .then(data => res.json(data))
    .catch(err => {
      res.status(500);
      res.statusMessage = "Internal Server Error";
    })
});

router.put('/story/update/:id', async (req, res) => {
  await storiesService.storyUpdate(req, res)
    .then(data => data)
    .then(storyUpdated => res.json(storyUpdated))
    .catch(err => {
      res.status(500);
      res.statusMessage = "Internal Server Error";
    })
});

router.delete(`/story/delete/:id`, async (req, res) => {
  await storiesService.storyDelete(req, res)
    .then(data => data)
    .then(deleteStory => res.json(deleteStory))
    .catch(err => {
      res.status(500);
      res.statusMessage = "Internal Server Error";
    })
});

module.exports = router;

const express = require('express');
const router = express.Router();
const answerController = require('../Controllers/answerController');

// Bir kullanıcının bir quiz sorusuna verdiği cevabı kaydet
router.post('/', answerController.submitCompleteQuiz);

// Bir kullanıcının verdiği tüm cevapları listele
// router.get('/:userId', answerController.getAnswersByUser);

module.exports = router;

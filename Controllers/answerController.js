const AnswerModel = require("../Models/answerModel");
const db = require("../Config/dbConfig");
const QuizModel = require("../Models/quizModel");
const UserPoi = require("../Models/userPoiModel");

// two different scenarios
// first solve the quiz
exports.submitCompleteQuiz = async (req, res) => {
  const userId = req.userId;
  const { poiId, answers } = req.body;
  // --------------------------------------------------
  // each check answer to be inserted in the database
  answers.map(async (answer) => {
    const obj = {
      user_id: userId,
      quiz_id: answer.quiz_id,
      selected_option: answer.selected_option,
    };
    await AnswerModel.submitAnswer(obj);
  });
  // --------------------------------------------------
  // get  questions related to the current point
  const quizes = await QuizModel.getQuizzesByPOI(poiId);
    let score = 0;
    // console.log(quizes[0].length);
    const totalCorrect = quizes[0].forEach((question, index) => {
      const correct = question.correct_option; //correct answer
      if (answers[index].selected_option === correct) {
        score++;
      }
      // scores added successfully
      // UserPoi.createUserPOI(poiId, userId, score);
    });

  res.status(200).json({ message: "Answers submitted successfully" });
};

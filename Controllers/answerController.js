const AnswerModel = require("../Models/answerModel");
const db = require("../Config/dbConfig");
const QuizModel = require("../Models/quizModel");
const UserPoi = require("../Models/userPoiModel");

exports.submitCompleteQuiz = async (req, res) => {
  const userId = req.userId;
  const { poiId, answers } = req.body;
  // --------------------------------------------------
  const promises = answers.map(async (answer) => {
    const obj = {
      user_id: userId,
      quiz_id: answer.quiz_id,
      selected_option: answer.selected_option,
    };
    return await AnswerModel.submitAnswer(obj);
  });
  const results = await Promise.all(promises);
  // --------------------------------------------------

  QuizModel.getQuizzesByPOI = (poiId)=>{

        let score = 0;
        const totalCorrect = data.forEach((question,index)=>{
          const correct = question.correct_option;
          console.log(correct);
          if(answers[index].selected_option===correct){
            score++;
          }
          // scores added successfully
          UserPoi.createUserPOI(poiId,userId,score)
        })
    }
  
    res.status(200).json({ message: 'Answers submitted successfully' })
};

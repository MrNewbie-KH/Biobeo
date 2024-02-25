const db = require("../Config/dbConfig");

const Answer = {};

// Create Answer related to a question
Answer.submitAnswer = async (newAnswer) => {
  // const exists = await db.query(
  //   `SELECT * FROM Answers WHERE quiz_id='${newAnswer.quiz_id}'`
  //   );
          await db.query("INSERT INTO Answers (quiz_id,user_id,selected_option) VALUES (?)", [[newAnswer.quiz_id,newAnswer.user_id,newAnswer.selected_option]]);
          const res = await db.query(`SELECT * FROM Answers`)
          console.log("submitted answer: ", { id: res.insertId, ...newAnswer });
  
  return res
};
// this can be useful for calculating total score of the user
Answer.getAnswersByUser = async (userId, result) => {
  try {
    const res = await db.query("SELECT * FROM Answers WHERE user_id = ?", [
      userId,
    ]);
    console.log("answers: ", res);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};
Answer.getAnswersPerQuiz = async (userId, result) => {
  try {
    const res = await db.query(`SELECT * FROM answer WHERE user_id = '${userId}'
    AND question_id IN (
        SELECT id
        FROM question
        WHERE Poi_id = `);
    console.log("answers: ", res);
    result(null, res);
  } catch (error) {}
};

module.exports = Answer;

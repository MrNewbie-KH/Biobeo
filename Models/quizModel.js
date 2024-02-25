// quizModel.js

const db = require("../Config/dbConfig");

const Quiz = {};

Quiz.createQuiz = async (newQuiz, result) => {
  try {
    const data = await db.query("INSERT INTO Quizzes SET ?", newQuiz);

    console.log("created quiz: ", { id: data.insertId, ...newQuiz });
    result(null, { id: data.insertId, ...newQuiz });
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
};

Quiz.getQuizzesByPOI = async (poiId, result) => {
  try {
    const res = await db.query("SELECT * FROM Quizzes WHERE poi_id = ?", [
      poiId,
    ]);
    console.log("quizzes: ", res);
    result(null, res[0]); //res[0] to only return the data no garbage
  } catch (error) {
    console.log("error: ", error);
    result(null, error);
    return;
  }
};

Quiz.deleteQuiz = async (quizId, result) => {
  try {
    const res = await db.query("DELETE FROM Quizzes WHERE id = ?", [quizId]);
    console.log("deleted quiz with id: ", quizId);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
};

Quiz.updateQuiz = async (quizId, updatedQuiz, result) => {
  try {
    const res = await db.query("UPDATE Quizzes SET ? WHERE id = ?", [
      updatedQuiz,
      quizId,
    ]);

    console.log("updated quiz with id: ", quizId);
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

module.exports = Quiz;

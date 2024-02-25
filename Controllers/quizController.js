// quizController.js

const QuizModel = require("../Models/quizModel");

exports.createQuiz = (req, res) => {
  const {
    poi_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
  } = req.body;

  if (
    !poi_id ||
    !question ||
    !option_a ||
    !option_b ||
    !option_c ||
    !correct_option
  ) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const newQuiz = {
    poi_id,
    question,
    option_a,
    option_b,
    option_c,
    correct_option,
  };
  // option_d is optional
  if (option_d) {
    newQuiz.option_d = option_d;
  }

  QuizModel.createQuiz(newQuiz, (error, data) => {
    if (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Quiz.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getQuizzesByPOI = async (req, res) => {
  try {
    const quizes = await QuizModel.getQuizzesByPOI(req.params.poiId);
    res.send(quizes[0]);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving quizzes.",
    });
  }
};

exports.deleteQuiz = (req, res) => {
  QuizModel.deleteQuiz(req.params.quizId, (error, data) => {
    if (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while deleting the quiz.",
      });
    } else {
      res.send({ message: "Quiz deleted successfully!" });
    }
  });
};

exports.updateQuiz = (req, res) => {
  const { poi_id, question, option_a, option_b, option_c, correct_option } =
    req.body;

  if (
    !poi_id ||
    !question ||
    !option_a ||
    !option_b ||
    !option_c ||
    !correct_option
  ) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const updatedQuiz = {
    poi_id,
    question,
    option_a,
    option_b,
    option_c,
    correct_option,
  };

  QuizModel.updateQuiz(req.params.quizId, updatedQuiz, (error, data) => {
    if (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while updating the quiz.",
      });
    } else {
      res.send(data);
    }
  });
};

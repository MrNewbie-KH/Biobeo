const StatisticsModel = require('../Models/statisticsModel');

exports.getTotalVisitedPOIs = (req, res) => {
    const userId = req.params.userId;

    StatisticsModel.getTotalVisitedPOIs(userId, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving total visited POIs."
            });
        } else {
            res.send({ total_visited_pois: data });
        }
    });
};

exports.checkRouteCompletion = (req, res) => {
    const userId = req.params.userId;
    const routeId = req.params.routeId;

    StatisticsModel.checkRouteCompletion(userId, routeId, (error, routeCompleted) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while checking route completion."
            });
        } else {
            res.send({ routeCompleted });
        }
    });
};

exports.getTopVisitedRoutes = (req, res) => {
    const limit = req.query.limit || 10; // Varsayılan olarak 10 kullanıcıyı getir
    StatisticsModel.getTopVisitedRoutes(limit, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving top visited routes."
            });
        } else {
            res.send(data);
        }
    });
};

exports.getTopScores = (req, res) => {
    const limit = req.query.limit || 10; // Varsayılan olarak 10 kullanıcıyı getir
    StatisticsModel.getTopScores(limit, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving top scores."
            });
        } else {
            res.send(data);
        }
    });
};

const db = require('../Config/dbConfig');

const Statistics = {};

Statistics.getTotalVisitedPOIs = (userId, result) => {
    db.query("SELECT COUNT(DISTINCT poi_id) AS total_visited_pois FROM User_POI_Visits WHERE user_id = ?", userId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Total visited POIs: ", res[0].total_visited_pois);
        result(null, res[0].total_visited_pois);
    });
};

Statistics.checkRouteCompletion = (userId, routeId, result) => {
    db.query(
        "SELECT COUNT(*) AS total_pois FROM POIs WHERE route_id = ?",
        routeId,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            const totalPOIs = res[0].total_pois;

            db.query(
                "SELECT COUNT(DISTINCT poi_id) AS visited_pois FROM User_POI_Visits WHERE user_id = ? AND poi_id IN (SELECT id FROM POIs WHERE route_id = ?)",
                [userId, routeId],
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }

                    const visitedPOIs = res[0].visited_pois;

                    // Tüm POI'ler ziyaret edildiyse rotayı bitir
                    const routeCompleted = totalPOIs === visitedPOIs;

                    result(null, routeCompleted);
                }
            );
        }
    );
};

Statistics.getTopVisitedRoutes = (limit, result) => {
    db.query(
        "SELECT user_id, COUNT(DISTINCT route_id) AS total_visited_routes FROM User_POI_Visits INNER JOIN POIs ON User_POI_Visits.poi_id = POIs.id GROUP BY user_id ORDER BY total_visited_routes DESC LIMIT ?",
        limit,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Top visited routes: ", res);
            result(null, res);
        }
    );
};

Statistics.getTopScores = (limit, result) => {
    db.query(
        "SELECT user_id, SUM(score) AS total_score FROM Answers GROUP BY user_id ORDER BY total_score DESC LIMIT ?",
        limit,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Top scores: ", res);
            result(null, res);
        }
    );
};


module.exports = Statistics;

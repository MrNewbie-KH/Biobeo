const db = require("../Config/dbConfig");

const UserPoi = {};

UserPoi.createUserPOI = async (poiId, userId, score) => {
  const newVisit = {
    poi_id: poiId,
    user_id: userId,
    score: score,
  };
  try {
    const res = await db.query("INSERT INTO User_POI_Visits SET ?", newVisit);

    console.log("Visited POI: ", { id: res.insertId, ...newVisit });
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};
UserPoi.getAllUserPOIs = async (result) => {
  try {
    const res = await db.query("SELECT * FROM POIs");
    console.log("POIs: ", res);
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(null, err);
    return;
  }
};

module.exports = UserPoi;

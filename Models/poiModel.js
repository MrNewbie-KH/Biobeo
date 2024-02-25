const db = require("../Config/dbConfig");

const POI = {};

POI.createPOI = async (newPOI, result) => {
  try {
    const res = await db.query("INSERT INTO POIs SET ?", newPOI);

    console.log("created POI: ", { id: res.insertId, ...newPOI });
    result(null, { id: res.insertId, ...newPOI });
  } catch (error) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

POI.getAllPOIs = async (result) => {
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

// Belirli bir POI'yi güncelle
POI.updatePOI = (poiId, updatedPOI, result) => {
  db.query(
    "UPDATE POIs SET ? WHERE id = ?",
    [updatedPOI, poiId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("updated POI: ", { id: poiId, ...updatedPOI });
      result(null, { id: poiId, ...updatedPOI });
    }
  );
};

// Belirli bir POI'yi sil
POI.deletePOI = (poiId, result) => {
  db.query("DELETE FROM POIs WHERE id = ?", poiId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("deleted POI with id: ", poiId);
    result(null, res);
  });
};

// Get POIs by route
POI.getPOIsByRoute = async (routeId) => {
  const res = await db.query("SELECT * FROM POIs WHERE route_id = ?", routeId);
  console.log("POIs by route: ", res);
  return res[0];
};

module.exports = POI;

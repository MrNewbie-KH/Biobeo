const db = require("../Config/dbConfig");

const Route = {};

Route.getAllRoutes = async () => {
  try {
    const res = await db.query("SELECT * FROM Routes");
    console.log("routes: ", res);
    return res.length ? res : 0 
  } catch (error) {
    console.log("error: ", error);
  }
};

Route.createRoute = async (newRoute, result) => {
  try {
    const res = db.query("INSERT INTO Routes SET ?", newRoute);
    console.log("created route: ", { id: res.insertId, ...newRoute });
    result(null, { id: res.insertId, ...newRoute });
  } catch (error) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  }
};

Route.updateRoute = (updatedRoute, result) => {
  const { id, name, description, photo, city } = updatedRoute;
  db.query(
    "UPDATE Routes SET name = ?, description = ?, photo = ?, city = ? WHERE id = ?",
    [name, description, photo, city, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("updated route: ", { id, ...updatedRoute });
      result(null, { id, ...updatedRoute });
    }
  );
};

Route.deleteRoute = (id, result) => {
  db.query("DELETE FROM Routes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("deleted route with id: ", id);
    result(null, res);
  });
};

module.exports = Route;

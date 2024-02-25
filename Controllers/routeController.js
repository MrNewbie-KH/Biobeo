const RouteModel = require('../Models/routeModel');

// Rota listeleme
exports.listRoutes = async (req, res) => {
    const routes =await RouteModel.getAllRoutes()
    console.log(routes);
    res.send(routes[0]);
};

// Yeni rota oluşturma
exports.createRoute = (req, res) => {
    const { name, description, photo, city,is_adult } = req.body;

    if (!name) {
        return res.status(400).send({
            message: "Route name cannot be empty!"
        });
    }

    const newRoute = {
        name,
        description,
        photo,
        city,
        is_adult
    };

    RouteModel.createRoute(newRoute, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the Route."
            });
        } else {
            res.send(data);
        }
    });
};

exports.updateRoute = (req, res) => {
    const { id } = req.params;
    const { name, description, photo, city } = req.body;

    if (!name) {
        return res.status(400).send({
            message: "Route name cannot be empty!"
        });
    }

    const updatedRoute = {
        id,
        name,
        description,
        photo,
        city
    };

    RouteModel.updateRoute(updatedRoute, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while updating the Route."
            });
        } else {
            res.send(data);
        }
    });
};

// Rota silme
exports.deleteRoute = (req, res) => {
    const { id } = req.params;

    RouteModel.deleteRoute(id, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while deleting the Route."
            });
        } else {
            res.send({ message: "Route deleted successfully!" });
        }
    });
};

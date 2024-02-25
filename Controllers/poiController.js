const POIModel = require('../Models/poiModel');

exports.createPOI = (req, res) => {
    // Request body'den POI bilgilerini al
    const { route_id, name, latitude, longitude, description } = req.body;

    // POI bilgilerini kontrol et
    if (!route_id || !name || !latitude || !longitude) {
        return res.status(400).send({
            message: "Required fields can not be empty!"
        });
    }

    // POI object content
    const newPOI = {
        route_id,
        name,
        latitude,
        longitude,
        description,
        // photo
    };

    // Modeli kullanarak yeni POI'yi veritabanına kaydet
    POIModel.createPOI(newPOI, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the POI."
            });
        } else {
            res.send(data);
        }
    });
};

exports.getAllPOIs = (req, res) => {
    POIModel.getAllPOIs((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving POIs."
            });
        } else {
            res.send(data[0]);
        }
    });
};

// Belirli bir rota ID'sine göre POI'leri listele
exports.getPOIsByRoute = (req, res) => {
    const routeId = req.params.routeId;

    // Rota ID'sine göre POI'leri getir
    POIModel.getPOIsByRoute(routeId, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving POIs by route."
            });
        } else {
            res.send(data);
        }
    });
};

// Belirli bir POI'yi güncelle
exports.updatePOI = (req, res) => {
    const poiId = req.params.poiId;
    const updatedPOI = req.body;

    // POI'yi güncelle
    POIModel.updatePOI(poiId, updatedPOI, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while updating the POI."
            });
        } else {
            res.send(data);
        }
    });
};

// Belirli bir POI'yi sil
exports.deletePOI = (req, res) => {
    const poiId = req.params.poiId;

    // POI'yi sil
    POIModel.deletePOI(poiId, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while deleting the POI."
            });
        } else {
            res.send({ message: "POI was deleted successfully!" });
        }
    });
};

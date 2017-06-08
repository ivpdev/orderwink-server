var express = require('express');
var PointService = require('../services/point/PointService');
var router = express.Router();

//TODO vairable in route
router.get('/:pointId/menu', function(req, res, next) {
    var pointId = req.params.pointId;


   PointService.getMenuData(pointId).then((menuData) => res.send(menuData));
});

module.exports = router;
var express = require('express');
var PointService = require('../services/point/PointService');
var router = express.Router();

router.get('/:pointId/menu', function(req, res, next) {
   var pointId = req.params.pointId;

   PointService.getMenuData(pointId).then((menuData) => res.send(menuData));
});

//TODO post
router.get('/:pointId/msg/:msg', function(req, res, next) {
   var pointId = req.params.pointId;
   var msg = req.params.msg;

   PointService.sendMsg(pointId, msg); //TODO then ok

   res.send('OK')

});

module.exports = router;
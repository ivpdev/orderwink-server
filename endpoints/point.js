const express = require('express');
const PointService = require('../services/point/PointService');
const MenuFilterer = require('../services/menu/filter/MenuFilterer')
const router = express.Router();

router.get('/:pointId/menu', function(req, res, next) {
   const pointId = req.params.pointId;

   PointService.getMenuData(pointId).then((menuData) => res.send(menuData));
});

//TODO post
router.get('/:pointId/msg/:msg', function(req, res, next) {
   const pointId = req.params.pointId;
   const msg = req.params.msg;

   PointService.sendMsg(pointId, msg); //TODO then ok

   res.send('OK')
});

router.get('/:pointId/menu/search', function(req, res, next) {
   const pointId = req.params.pointId;

   PointService
        .getMenuData(pointId)
        .then((menuData) => {
            const filteredMenu = MenuFilterer.filter(menuData, ['halal'])
            res.send(filteredMenu)
        })
});

router.get('/:pointId/menu/search/traits/:traits', function(req, res, next) {
   const pointId = req.params.pointId
   const traitsParam = req.params.traits
   const traits = traitsParam.split(',')

   PointService
        .getMenuData(pointId)
        .then((menuData) => {
            const filteredMenu = MenuFilterer.filter(menuData, traits)
            res.send(filteredMenu)
        })
});

module.exports = router;
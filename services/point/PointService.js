let fromFile = require('../db/fromFile')
let MenuService = require('../menu/MenuService')

var PointService = {
    getMenuData: function(pointId) {
        return MenuService.getMenuForPointId(pointId)
        //return fromFile();
    },

    sendMsg: function(pointId, msg) {

    }
}

module.exports = PointService;
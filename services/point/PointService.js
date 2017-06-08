let Promise = require('bluebird')
let MenuService = require('../menu/MenuService')

var PointService = {
    getMenuData: function(pointId) {
        return MenuService.getMenuForPointId(pointId)
    },

    sendMsg: function(pointId, msg) {
        var cafeP = MenuService.getCafeP(pointId);

        Promise.map(cafeP, (cafe) => console.log('Sent message "' + msg + ' to cafe "' + cafe.name + '"'))
    }
}

module.exports = PointService;
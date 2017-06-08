let fromFile = require('../db/fromFile')
let Promise = require('bluebird')
let _ = require('lodash')

let MenuService = {
    getCafeP: function(pointId) {
        var cafesP = fromFile();

        var cafeP = Promise.filter(cafesP,
                    function(cafe) {
                        return _.find(cafe.points, (point) => point.id == pointId) });

        return cafeP;

    },

    getMenuForPointId: function(pointId) {
        var cafeP = this.getCafeP(pointId);

        return Promise.map(cafeP, (cafe) => cafe.menu ).then(_).call("flatten").call("value");
    }
}

module.exports = MenuService;
let fromFile = require('../db/fromFile')
let Promise = require('bluebird')
let _ = require('lodash')

let MenuService = {
    getMenuForPointId: function(pointId) {
        var cafesP = fromFile();

        return Promise.map(cafesP,
                    (cafes) =>
                        _.filter(cafes,
                            (cafe) => _.find(cafe.points,
                                (point) => point.id === pointId )))
    },

    sendMsg: function(pointId, msg) {

    }
}

module.exports = MenuService;
const fromFile = require('../db/fromFile')
const Promise = require('bluebird')
const _ = require('lodash')

const MenuService = {
    getCafeP: (pointId) => {
        const cafesP = fromFile();
        return Promise
                  .filter(cafesP,
                          cafe => _.find(cafe.points, point => String(point.id) === pointId) )},

    getMenuForPointId: function(pointId) {
        const cafeP = this.getCafeP(pointId)
        return Promise
                 .map(cafeP, (cafe) => cafe.menu)
                 .then(_)
                 .call("flatten")
                 .call("value") }

    }

module.exports = MenuService
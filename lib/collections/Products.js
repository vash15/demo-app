
var _             = require('underscore');
var AppCollection = require('./AppCollection');
var Product       = require('../models/Product');

var Products = module.exports = AppCollection.extend({

	model: Product,

	url: function () {
		return 'assets/data/products.json';
	}

});

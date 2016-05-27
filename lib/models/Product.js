
var _        = require('underscore');
var Backbone = require('backbone');
var AppModel = require('./AppModel');

var Product = module.exports = AppModel.extend({
	idAttribute: '_id',

	getCoverImage: function () {
		var images = this.get('images') || [];
		return _.isString(images[0]) ? 'assets/' + images[0] : null;
	},

	getImages: function () {
		var collection = new Backbone.Collection();
		var images     = this.get('images') || [];
		for (var i = 0; i < images.length; i++) {
			collection.add({ url: 'assets/' + images[i], index: 0 });
		}
		return collection;
	},

	getMeasures: function () {
		var a = [];
		var measures = this.get('measures') || [];
		for (var i = 0; i < measures.length; i++) {
			a.push( {value: measures[i], label: __('Size')+'('+ measures[i] + ')' });
		}
		return a;
	}

});

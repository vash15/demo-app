
var _        = require('underscore');
var fs       = require('fs');

var ListView               = require('backbone.uikit').listviews.ListView;
var ProductsListItemView   = require('./ProductsListItemView');
// var ProductsListFooterView = require('./ProductsListFooterView');

var ProductsListView = module.exports = ListView.extend({

	className: 'products-list',

	// template: _.template(fs.readFileSync('templates/view.html', 'utf8')),

	initialize: function initialize(options) {
		ProductsListView.__super__.initialize.call(this, options);

		// Events
		// this.addEvents({});

		// this.views.footer = new ProductsListFooterView();

	},

	// render: function render() {
	// 	ProductsListView.__super__.render.apply(this, arguments);
	//
	// 	this.addFooter();
	//
	// 	return this;
	// },

	getItemViewAtIndexWithOptions: function getItemViewAtIndexWithOptions(index, options) {
		return new ProductsListItemView(options);
	}


});

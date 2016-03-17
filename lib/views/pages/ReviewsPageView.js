var _        = require('underscore');
var fs       = require('fs');
var PageView = require('backbone.uikit').PageView;

var IosBarView = require('backbone.uikit').navigations.IosBarView;


var ReviewsPageView = module.exports = PageView.extend({

	addClass: 'reviews',

	initialize: function initialize(options) {
		ReviewsPageView.__super__.initialize.apply(this, arguments);

		this.views.navigationBar = new IosBarView({
			left: __('Indietro'),
			center: __('REVIEWS')
		});
	},

	render: function render() {
		ReviewsPageView.__super__.render.apply(this, arguments);
		this.$el.empty().append('<h1>Reviews</h1>');
		return this;
	},

	getNavigationBar: function getNavigationBar(){
		return this.views.navigationBar;
	}

});

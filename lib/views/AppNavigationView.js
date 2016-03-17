var _              = require('underscore');
var NavigationView = require('backbone.uikit').navigations.NavigationView;

var AppNavigationView = module.exports = NavigationView.extend({

	initialize: function initialize(options) {
		AppNavigationView.__super__.initialize.apply(this, arguments);
	},

	render: function render() {
		AppNavigationView.__super__.render.apply(this, arguments);
		return this;
	}

});

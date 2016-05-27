var _       = require('underscore');
var fs      = require('fs');
var AppView = require('../AppView');

var FooterView = module.exports = AppView.extend({

	addClass: 'footer-demo-app',

	template: _.template(fs.readFileSync('templates/pages/footer.html', 'utf8')),

	initialize: function initialize(options) {
		FooterView.__super__.initialize.call(this, options);
	},

	render: function render() {
		this.$el.html(this.template());
		return this;
	}
});

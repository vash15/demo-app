
var _          = require('underscore');
var _s         = require('underscore.string');
var fs         = require('fs');
var accounting = require('accounting');

var ListItemView = require('backbone.uikit').listviews.ListItemView;
var ImageView    = require('backbone.uikit').ImageView;
var RateView     = require('backbone.uikit').RateView;

var ProductsListItemView = module.exports = ListItemView.extend({

	className: 'products-list-litem',

	template: _.template(fs.readFileSync('templates/products/products-list-litem.html', 'utf8')),

	initialize: function initialize(options) {
		ProductsListItemView.__super__.initialize.call(this, options);

		// Events
		// this.addEvents({
		//
		// });

		this.views.image = new ImageView({
			src:  this.model.getCoverImage(),
			// placeholder: ''
			size: 'cover'
		});
		this.views.rate = new RateView({
			rate: this.model.get('rating'),
			chars: {
				empty: "c",
				half: "b",
				full: "a"
			}
		});

	},

	render: function render() {
		var data = {
			model: this.model.toJSON(),
			h: _s.escapeHTML,
			formatMoney: accounting.formatMoney
		};
		this.$el
			.empty()
			.append(this.template(data) );

		this.cache.$thumb   = this.$el.find('.thumb');
		this.cache.$info    = this.$el.find('.info');
		this.cache.$reviews = this.cache.$info.find('.products-list-litem-reviews');

		this.cache.$thumb.append( this.views.image.el );
		this.views.image.render();

		this.views.rate.$el.insertAfter(this.cache.$reviews);
		this.views.rate.render();

		return this;
	}
});

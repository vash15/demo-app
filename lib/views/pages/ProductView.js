var _          = require('underscore');
var _s         = require('underscore.string');
var fs         = require('fs');
var accounting = require('accounting');

var PageView        = require('backbone.uikit').PageView;
var IosBarView      = require('backbone.uikit').navigations.IosBarView;
var ImageView       = require('backbone.uikit').ImageView;
var RateView        = require('backbone.uikit').RateView;
var CarouselView    = require('backbone.uikit').carousel.CarouselView;
var SelectFieldView = require('backbone.uikit').forms.SelectFieldView;

var ProductView = module.exports = PageView.extend({

	// url: 'view',

	addClass: 'product',

	template: _.template(fs.readFileSync('templates/products/product.html', 'utf8')),

	initialize: function initialize(options) {
		ProductView.__super__.initialize.call(this, options);
		var ctx = this.getContext();
		var vp  = ctx.device.getViewport();

		// Events
		this.addEvents({
			'click .js-read-reviews': 'onClickReadReviews'
		});

		this.views.navigationBar = new IosBarView({
			left: __('Back'),
			center: __('PRODUCT')
		});

		this.views.carousel = new CarouselView({
			collection: this.model.getImages(),
			getItemFromModel: function (model) {
				return new ImageView({
					src: model.get("url"),
					size: 'cover',
					viewport: { width: vp.width, height: vp.width }
				});
			}
		});
		this.views.carousel.$el.css({width: vp.width, height: vp.width  });

		var optionsRateView = {
			rate: this.model.get('rating'),
			chars: {
				empty: "c",
				half: "b",
				full: "a"
			}
		};
		this.views.rate     = new RateView(optionsRateView);
		this.views.bigRate  = new RateView(optionsRateView);
		this.views.measures = new SelectFieldView({
			collection: this.model.getMeasures(),
			field: 'measures'
		});

	},

	render: function render(options) {
		ProductView.__super__.render.call(this, options);
		var data = {
			model: this.model.toJSON(),
			h: _s.escapeHTML,
			formatMoney: accounting.formatMoney
		};
		this.$el.html(this.template(data));

		this.cache.$productWrapperCarousel = this.$el.find('.product-wrapper-carousel');
		this.cache.$productPriceRating     = this.$el.find('.product-price-rating');
		this.cache.$productBigRating       = this.$el.find('.product-big-rating');
		this.cache.$productMeasures        = this.$el.find('.product-measures');

		this.cache.$productWrapperCarousel.append( this.views.carousel.el );
		this.views.carousel.render();

		this.cache.$productPriceRating.append( this.views.rate.el );
		this.cache.$productBigRating.prepend( this.views.bigRate.el );
		this.cache.$productMeasures.prepend( this.views.measures.el );
		this.views.rate.render();
		this.views.bigRate.render();
		this.views.measures.render();

		return this;
	},

	getNavigationBar: function getNavigationBar(){
		return this.views.navigationBar;
	},

	onClickReadReviews: function onClickReadReviews() {
		console.log('onClickReadReviews');
	}

});

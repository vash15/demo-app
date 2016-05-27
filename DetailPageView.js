var _        = require('underscore');
var fs       = require('fs');
var PageView = require('backbone.uikit').PageView;

var ReviewsPageView = require('./ReviewsPageView');
var TitleBarView = require('backbone.uikit').navigations.TitleBarView;
var IosBarView = require('backbone.uikit').navigations.IosBarView;


var ListView = require('backbone.uikit').listviews.ListView;

var DetailPageView = module.exports = PageView.extend({

	addClass: 'detail',

	template: _.template(fs.readFileSync('templates/pages/detail.html', 'utf8')),

	initialize: function initialize(options) {
		DetailPageView.__super__.initialize.apply(this, arguments);

		this.addEvents({
			'click': 'onClick'
		});

		this.views.navigationBar = new IosBarView({
			left: __('Back'),
			center: __('PRODUCT DETAIL')
		});

		this.views.list = new ListView({});

	},

	render: function render() {
		DetailPageView.__super__.render.apply(this, arguments);
		this.$el.empty().append(this.template());
		return this;
	},

	getNavigationBar: function getNavigationBar(){
		return this.views.navigationBar;
	},

	onClick: function onClick(){
		var ctx = this.getContext();
		var v   = new ReviewsPageView({swipeBack: true});
		ctx.viewstack.pushView( v );
	},

	onBeforePush: function() {
		console.log("DetailPage: onBeforePush");
	},

	onPush: function() {
		console.log("DetailPage: onPush");
	},

	onBeforeActivate: function() {
		console.log("DetailPage: onBeforeActivate");
	},

	onActivate: function() {
		console.log("DetailPage: onActivate");
	},

	onBeforeDeactivate: function() {
		console.log("DetailPage: onBeforeDeactivate");
	},

	onDeactivate: function() {
		console.log("DetailPage: onDeactivate");
	}

});

var _              = require('underscore');
var fs             = require('fs');
var PageView       = require('backbone.uikit').PageView;
var TitleBarView   = require('backbone.uikit').navigations.TitleBarView;
var IosBarView     = require('backbone.uikit').navigations.IosBarView;

var DetailPageView = require('./DetailPageView');

var HomePageView = module.exports = PageView.extend({

	className: 'page home-page',

	template: _.template(fs.readFileSync('templates/pages/home_page.html', 'utf8')),


	initialize: function initialize(options) {
		HomePageView.__super__.initialize.apply(this, arguments);

		this.addEvents({
			'click': 'onClickNextPage'
		});

		this.views.navigationBar = new IosBarView({
			center: __('HOME')
		});

	},

	render: function render() {
		HomePageView.__super__.render.apply(this, arguments);

		this.$el.empty()
				.append(
					this.template()
				 );

		return this;
	},

	getNavigationBar: function getNavigationBar(){
		return this.views.navigationBar;
	},

	onClickNextPage: function onClickNextPage(){
		var ctx        = this.getContext();
		var detailView = new DetailPageView({swipeBack: true});
		ctx.viewstack.pushView( detailView, {animated: true} );
	},

	onBeforePush: function() {
		console.log("HomePage: onBeforePush");
	},

	onPush: function() {
		console.log("HomePage: onPush");
	},

	onBeforeActivate: function() {
		console.log("HomePage: onBeforeActivate");
	},

	onActivate: function() {
		console.log("HomePage: onActivate");
	},

	onBeforeDeactivate: function() {
		console.log("HomePage: onBeforeDeactivate");
	},

	onDeactivate: function() {
		console.log("HomePage: onDeactivate");
	}

});

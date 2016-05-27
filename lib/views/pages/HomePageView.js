var _              = require('underscore');
var $              = require('jquery');
var fs             = require('fs');

var PageView         = require('backbone.uikit').PageView;
var IosBarView       = require('backbone.uikit').navigations.IosBarView;
var ProductsListView = require('./ProductsListView');
var ProductView      = require('./ProductView');

var HomePageView = module.exports = PageView.extend({

	className: 'page home-page',

	// template: _.template(fs.readFileSync('templates/pages/home_page.html', 'utf8')),

	initialize: function initialize(options) {
		HomePageView.__super__.initialize.apply(this, arguments);

		this.views.navigationBar = new IosBarView({
			addClass: 'logo-bar',
			center: $('<i />').addClass('icon-nike-logo')
		});

		this.views.list = new ProductsListView({
			collection: this.collection
		});

		this.listenTo( this.views.list, "selectItem", this.onSelectItem );

	},

	render: function render() {
		HomePageView.__super__.render.apply(this, arguments);

		this.$el.empty().append(
			this.views.list.el
		);

		this.views.list.render();

		return this;
	},

	getNavigationBar: function getNavigationBar(){
		return this.views.navigationBar;
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
	},

	onSelectItem: function onSelectItem(itemView){
		console.log("itemView", itemView);

		var ctx         = this.getContext();
		var productView = new ProductView({
			model: itemView.model,
			swipeBack: true
		});
		ctx.viewstack.pushView(productView, {animated: true});

	}

});

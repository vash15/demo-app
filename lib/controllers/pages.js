
var AppNavigationView = require('../views/AppNavigationView');
var HomePageView      = require('../views/pages/HomePageView');

var PagesController = module.exports = {

	navigationController: function(ctx, next){
		if ( !ctx.views.navigation){
			ctx.views.navigation = new AppNavigationView();
			ctx.viewstack.pushView( ctx.views.navigation );
		}
		return next();
	},

	home: function (ctx, next) {
		var view = new HomePageView({
			swipeBack: false,
			animated: false,
			navigation: ctx.views.navigation
		});
		ctx.viewstack.pushView(view, {animated: false});
	}
};

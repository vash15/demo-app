var $        = require('jquery');
var Backbone = require('backbone');
var pkg      = require('../package.json');

// Globals
global.env = {
	APP_ENV: pkg['eve-configs']['env']
};

// Backbone
Backbone.$ = $;

if (global.env.APP_ENV === 'development') {
	var devMessage = '      _                                  _                    ' + '\n' +
					 '   __| | _____   __  _ __ ___   ___   __| | ___    ___  _ __  ' + '\n' +
					 '  / _` |/ _ \\ \\ / / | \'_ ` _ \\ / _ \\ / _` |/ _ \\  / _ \\| \'_ \\ ' + '\n' +
					 ' | (_| |  __/\\ V /  | | | | | | (_) | (_| |  __/ | (_) | | | |' + '\n' +
					 '  \\__,_|\\___| \\_/   |_| |_| |_|\\___/ \\__,_|\\___|  \\___/|_| |_|' + '\n' +
					 '                                                              ' + '\n';
	console.log(devMessage);
}

// Translations
var translations;
var fs        = require('fs');
var translate = require('translate');

try {
	translations = {
		'default': {
			'it_IT': JSON.parse(fs.readFileSync('locales/it_IT/default.json', 'utf8')),
			'en_EN': JSON.parse(fs.readFileSync('locales/en_EN/default.json', 'utf8'))
		},
		'errors': {
			'it_IT': JSON.parse(fs.readFileSync('locales/it_IT/errors.json', 'utf8')),
			'en_EN': JSON.parse(fs.readFileSync('locales/en_EN/errors.json', 'utf8'))
		}
	};
}
catch (err) {
	throw new Error('Failed while parsing locales');
}

translate.setTranslations(translations);
translate.setLocale('it_IT');
require('moment-it_IT');
global.__  = translate.__;
global.__n = translate.__n;

// Libraries
var Page      = require('page');
var Device    = require('device-utils');
var Cache     = require('cache');
var PubSub    = require('pubsub');
var Settings  = require('settings');
var ViewStack = require('viewstack');
var Network   = require('network');

// Page
var page = new Page();

page.use(Device.middleware());
page.use(Cache.middleware());
page.use(PubSub.middleware());
page.use(Settings.middleware());
page.use(Network.middleware({
	backbone: Backbone
}));
page.use(ViewStack.middleware({ el: "#application" }));

page.use(function(ctx, next){

	// Init context
	ctx.views       = {};
	ctx.collections = {};


	// Collections
	var Products = require('./collections/Products');

	ctx.collections.products = new Products();

	return next();
});


page.use(function(ctx, next){

	if ( global.env.APP_ENV === 'development' ){
		window._$   = $;
		window._ctx = ctx;
	}

	return next();
});

// Routes
var pagesController    = require('./controllers/pages');
var productsController = require('./controllers/products');

page.url(
	'*',
	productsController.fetch
);

page.url({ url: '', name: 'home' },
	pagesController.navigationController,
	pagesController.home
);

page.start();

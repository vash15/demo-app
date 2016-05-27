

var ProductsController = module.exports = {

	fetch: function(ctx, next){

		ctx.collections.products.fetch({
			"network": "products"
		});

		return next();
	}

};

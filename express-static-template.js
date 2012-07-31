var fs = require("fs"),
	url = require("url");

module.exports = function(server, options) {
	var engine = server.settings["view engine"],
		views = server.settings.views;

	return function(req, res, next) {
		// overkill? sure
		var filename = url.parse(req.url).pathname.split("/").pop().split(".").shift();
		if(filename === "" && options.index)
			filename = options.index;

		fs.stat(views + "/" + filename + "." + engine, function(err, stat) {
			if(err) return next();

			// req.locals can be populated by any previous route and passed in
			res.render(filename, req.locals);
		});
	};
};

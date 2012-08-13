var tap = require("tap"),
	test = tap.test,
	express = require("express"),
	request = require("request"),

	PORT = 18111;

var server = express.createServer();

server.set("view engine", "ejs");
server.set("views", __dirname + "/views");
server.set("view options", {
	layout: false
});

function getUserInfo(uid) {
	return {
		name: "herp"
	}
};

server.use(function(req, res, next) {
	res.locals = {
		userInfo: getUserInfo(0)
	};

	next();
});

server.use(require("..")(server, { index: "index" }));

server.use(function(req, res, next) {
	res.send("done");
});

server.listen(PORT);

tap.output.on("end", function() {
	server.close();
});

test("Handling template with default data", function(t) {
	t.plan(1);
	request.get("http://localhost:" + PORT, function(err, res, body) {
		t.equal(body, "Hello, herp\n", "Template rendered with default data");
	});
});

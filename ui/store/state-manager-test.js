/* jshint mocha: true */

var assert = require("assert"),
	core = new (require("ebus"))(),
	store = require("./store-manager.js")(core),
	data = require("./data.json");

describe("state manager apis", function() {
	it("should accept a setstate", function(done) {
		core.emit("setstate", data, function(err) {
			assert.ifError(err);
			done();
		});
	});
	it("should return threads", function() {
		var threads = store.getThreads("numix", null, -3);
		// console.log(threads);
		assert(threads.length == 3 && threads[0] == 'missing');
	});

	it("should return texts", function() {
		var texts = store.getTexts("numix", "thread1", null, -3);
		assert(texts.length == 3);
	});
});
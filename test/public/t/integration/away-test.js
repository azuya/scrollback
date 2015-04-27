/*global describe*/
/*global it*/
/*global uid*/
/*global assert*/
/*global SockJS*/
/*global scrollback*/
/*global beforeEach*/
/*global afterEach*/

describe('Action: AWAY ', function() {
	var socket,
		b = {
		from: "sbtestinguser",
		type: 'back',
		to: "scrollback"
	};
	beforeEach(function(done) {
		socket = new SockJS(scrollback.host + "/socket");
		var sessionId = "web://" + uid();
		var init = {
			"id": sessionId,
			"type": "init",
			"to": "me",
			"suggestedNick": "sbtestinguser",
			"session": "web://" + uid(),
			"resource": uid(),
			"origin": {
				domain: "scrollback.io",
				verified: true
			}
		};
		socket.onopen = function() {
			socket.send(JSON.stringify(init));
			done();
		};
	});

	it("away action with all property ", function(done) {
		socket.onmessage = function(message) {
			var a = {
				type: 'away',
				to: "scrollback"
			};
			message = JSON.parse(message.data);
			console.log(message.type);
			if (message.type === 'init') {
				socket.send(JSON.stringify(b));
				return;
			}
			if (message.type === 'back') {
				socket.send(JSON.stringify(a));
				return;
			}
			assert(message.type !== 'error', "away action failed");
			done();
		};
	});

	it("away action without 'to' property ", function(done) {
		socket.onmessage = function(message) {
			var a = {
				type: 'away',
			};
			message = JSON.parse(message.data);
			console.log(message.type);
			if (message.type === 'init') {
				socket.send(JSON.stringify(b));
				return;
			}
			if (message.type === 'back') {
				socket.send(JSON.stringify(a));
				return;
			}
			assert(message.type === 'error', "away action success without 'to' ");
			done();
		};
	});

	it("away action with a wrong user", function(done) {
		socket.onmessage = function(message) {
			var a = {
				type: 'away',
				to: "facebook",
				from: "testinguser"
			};
			message = JSON.parse(message.data);
			console.log(message.type);
			if (message.type === 'init') {
				socket.send(JSON.stringify(b));
				return;
			}
			if (message.type === 'back') {
				socket.send(JSON.stringify(a));
				return;
			}
			assert(message.type === 'error', "away action success with wrong user ");
			done();
		};
	});

	afterEach(function() {
		socket.close();
	});

});
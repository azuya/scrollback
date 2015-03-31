module.exports = function(core, config) {
	core.on('text', function(txt, next){
		var user = txt.from,
			room = txt.to;
		var replyText = user + " helo";
		core.emit('text', {
			to: room,
			from: "admin",
			time: Date.now(),
			text: replyText
		});
		next();
	}, 300);
}
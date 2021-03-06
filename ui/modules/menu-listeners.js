/* jshint browser: true */
/* global $ */

module.exports = function(core) {
	var menuShown = false;

	$(document).on("popoverInited popoverDismissed", function(e, popover) {
		if (/menu-[a-z\-]+/.test(popover.attr("class"))) {
			menuShown = (e.type === "popoverInited");
		}
	});

	core.on("statechange", function(changes, next) {
		if (menuShown && changes.nav && ("mode" in changes.nav || "view" in changes.nav)) {
			$.popover("dismiss");
		}

		next();
	}, 100);
};

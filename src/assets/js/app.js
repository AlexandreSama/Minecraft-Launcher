const { ipcRenderer } = require("electron");

(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);


ipcRenderer.on('dataPlayer', (event, e) => {
	console.log(e)
	document.getElementById('usernamePlayer').value += e
})
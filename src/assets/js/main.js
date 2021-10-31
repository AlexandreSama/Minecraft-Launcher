const { ipcRenderer, Remote } = require("electron");

(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$(".toggle-password").click(function() {

	  $(this).toggleClass("fa-eye fa-eye-slash");
	  var input = $($(this).attr("toggle"));
	  if (input.attr("type") == "password") {
	    input.attr("type", "text");
	  } else {
	    input.attr("type", "password");
	  }
	});

})(jQuery);

ipcRenderer.send('page-load')

ipcRenderer.on('infosaved', (event, data) => {
	document.getElementById('emailInput').value = data.email
})

document.getElementById('loginBtn').addEventListener('click', () => {
	let email = document.getElementById('emailInput').value
	let password = document.getElementById('password-field').value
	if(email && password){
		ipcRenderer.send("login", {email, password})
	}else{
		Remote.dialog.showErrorBox('Erreur !', 'Veuillez écrire un mot de passe et un Email !');
	}
})

ipcRenderer.on('Error-Login', (event) => {
	Remote.dialog.showErrorBox('Erreur !', 'Veuillez vérifier votre mot de passe ou votre email !')
})

$(document).ready(function() {

	$('body').fadeIn(4000).removeClass('hidden');

	$( '.nextbutton').click(function() {
	  	$('body').fadeOut( 500, function() {
 			window.location.href = 'introduction/introduction.html';
		});
	});
});
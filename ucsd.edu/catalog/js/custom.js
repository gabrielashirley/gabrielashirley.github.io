// Define our viewportWidth variable
var viewportWidth;

// Set/update the viewportWidth value
var setViewportWidth = function () {
	viewportWidth = window.innerWidth || document.documentElement.clientWidth;
}

// Log the viewport width into the console
var logWidth = function () {
	if (viewportWidth > 991) {
		// set timeout onDomReady
		document.addEventListener("DOMContentLoaded", function(){
			setTimeout(desktop_delayedFragmentTargetOffset, 500);
		});

		// add scroll offset to fragment target (if there is one)
		desktop_delayedFragmentTargetOffset();
	} 
	
	if (viewportWidth > 767 && viewportWidth < 992) {
		// set timeout onDomReady
		document.addEventListener("DOMContentLoaded", function(){
			setTimeout(tablet_delayedFragmentTargetOffset, 500);
		});

		// add scroll offset to fragment target (if there is one)
		tablet_delayedFragmentTargetOffset();
	}
		
	if (viewportWidth > 493 && viewportWidth < 768) {
		// set timeout onDomReady
		document.addEventListener("DOMContentLoaded", function(){
			setTimeout(mobile_delayedFragmentTargetOffset, 500);
		});

		// add scroll offset to fragment target (if there is one)
		mobile_delayedFragmentTargetOffset();
	}
		
	if ((viewportWidth > 0 && viewportWidth < 494)) {
		// set timeout onDomReady
		document.addEventListener("DOMContentLoaded", function(){
			setTimeout(small_delayedFragmentTargetOffset, 500);
		});

		// add scroll offset to fragment target (if there is one)
		small_delayedFragmentTargetOffset();
	}
}

// Set our initial width and log it
setViewportWidth();
logWidth();

// On resize events, recalculate and log
window.addEventListener('resize', function () {
	setViewportWidth();
	logWidth();
}, false);


//////////////////// FUNCTIONS

// desktop
function desktop_delayedFragmentTargetOffset(){
	var offset = $('a:target').offset();
	if (offset) {
		var scrollto = offset.top - 150; // minus fixed header height
		$('html, body').animate({scrollTop:scrollto}, 0);
	}
}

// tablet
function tablet_delayedFragmentTargetOffset(){
	var offset = $('a:target').offset();
	if (offset) {
		var scrollto = offset.top - 160; // minus fixed header height
		$('html, body').animate({scrollTop:scrollto}, 0);
	}
}

// mobile
function mobile_delayedFragmentTargetOffset(){
	var offset = $('a:target').offset();
	if (offset) {
		var scrollto = offset.top - 178; // minus fixed header height
		$('html, body').animate({scrollTop:scrollto}, 0);
	}
}

// x-small
function small_delayedFragmentTargetOffset(){
	var offset = $('a:target').offset();
	if (offset) {
		var scrollto = offset.top - 195; // minus fixed header height
		$('html, body').animate({scrollTop:scrollto}, 0);
	}
}
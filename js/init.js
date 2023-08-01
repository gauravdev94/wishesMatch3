
function windowReady() {
	window_ready = true;
	try_start();
}
function fontReady() {
	font_ready = true;
	try_start();
}

WebFontConfig = {
	    google: {
	      families: ['Courgette'] // 'Marcellus' 
	    },
		active: function()
		{
			fontReady();
		}
	};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();

window.fbAsyncInit = function() {
	FB.init({
		appId      : '251581765344139',
		xfbml      : true,
		version    : 'v2.9'
	});
	FB.AppEvents.logPageView();
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


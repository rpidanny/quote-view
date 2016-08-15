var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

function fullscreenFix(){
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function(i){
        if($(this).innerHeight() > h){
            $(this).closest(".fullscreen").addClass("overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();


function backgroundResize(){
    var windowH = $(window).height();
    $(".background").each(function(i){
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if(path.hasClass("parallax")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/*

$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
	{
	  tags: "landscape,technology,hd",
	  format: "json"
	},

	//The callback function
	function(data) {
		var randomPhoto = data.items[Math.floor(Math.random() * data.items.length)];  
		$(".background").css({'background':'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('+randomPhoto.media.m+') no-repeat center center fixed','-webkit-background-size':'cover','-moz-background-size':'cover','-o-background-size':'cover','background-size':'cover'});
		$.ajax({
		    url: "https://random-quotes-api.herokuapp.com/",
		    type: "GET",
		    dataType: "json",
		    success: function (data) {
		        console.log("[Quote] : "+data.quote+" [From Network]");
		        $('.quote-body').html('<blockquote>'+data.quote+'</blockquote>');
		        $('.quote-author').html(data.author);
		        $('#content-a').css('display','table');
		        $('#content-a').addClass("animated zoomIn");
		    }
		});
	}
);

*/
$.ajax({
	url:"https://unsplash.it/1920/1080/?random",
	type:"GET",
	dataType:"image",
	success:function(data){
		$(".background").css({'background':'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(https://unsplash.it/1920/1080/?random) no-repeat center center fixed','-webkit-background-size':'cover','-moz-background-size':'cover','-o-background-size':'cover','background-size':'cover'});
		$.ajax({
		    url: "https://random-quotes-api.herokuapp.com/",
		    type: "GET",
		    dataType: "json",
		    success: function (data) {
		        console.log("[Quote] : "+data.quote+" [From Network]");
		        $('.quote-body').html('<blockquote>'+data.quote+'</blockquote>');
		        $('.quote-author').html(data.author);
		        $('#content-a').css('display','table');
		        $('#content-a').addClass("animated zoomIn").one(animationEnd,function(){
		        	$('#content-a').removeClass("animated zoomIn");
		        });
		    }
		});
	}
});

setInterval(function(){
	$(".background").css({'background':'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(https://unsplash.it/1920/1080/?random) no-repeat center center fixed','-webkit-background-size':'cover','-moz-background-size':'cover','-o-background-size':'cover','background-size':'cover'});
		$.ajax({
		    url: "https://random-quotes-api.herokuapp.com/",
		    type: "GET",
		    dataType: "json",
		    success: function (data) {
		        console.log("[Quote] : "+data.quote+" [From Network]");
		        $('#content-a').addClass("animated zoomOut").one(animationEnd,function(){
		        	$('#content-a').removeClass("animated zoomOut");
		        });
		        $('.quote-body').html('<blockquote>'+data.quote+'</blockquote>');
		        $('.quote-author').html(data.author);
		        $('#content-a').addClass("animated lightSpeedIn").one(animationEnd,function(){
		        	$('#content-a').removeClass("animated lightSpeedIn");
		        });
		    }
		});
},10000);
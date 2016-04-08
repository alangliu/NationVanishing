var winHeight = $(window).height();

$('.section').css( {
    height: winHeight,
    width: '100%'
 });

 $('.bar').css( {
    height: winHeight,
 });

 var currentIndex = 1;

$(document).ready(function() {
    if ($('meta#dots-diamonds').length > 0) {
        $('#fullpage').fullpage( {
        	onLeave: function(index, nextIndex, direction) {
        	},
        	afterLoad: function(anchorLink, index) {
            	$('.iconset').html(dotTemplate);
                var x = $('.side-dot')[index-1];
                $(x).prepend($('.selected'));

                currentIndex = index;
        	},

        });
    }




    $(".menu-icon").on("click", function(e) {
        var pageWidth = $('#fullpage').width();
        var indexOffset = $($('.section')[currentIndex-1]).position();
        $('#fullpage').prepend(overlay);

        $('#menuwrapper').css({
            width: pageWidth - 95,
            top: indexOffset.top,
            opacity: 0,
        });

        $("#menuwrapper").animate({
            opacity: 1,
        }, 500, function() {
            $('#menuwrapper').show();
        });

        // Toggle Wave button
        $('.menu-icon').animate({
            opacity: 0
        }, 250, function() {
            $('.menu-icon').hide();
            $('.close-icon').css({
                opacity: 0
            });
            $('.close-icon').show();
            
            $('.close-icon').animate({
                opacity: 1
            }, 250);
        });

        setSideBar('diamond');
    });

    $(".close-icon").on("click", function(e) {
        $("#menuwrapper").animate({
            opacity: 0,
        }, 500, function() {
            $("#menuwrapper").remove();
        });


        // Toggle Cancel button
        
        $('.close-icon').animate({
            opacity: 0
        }, 250, function() {
            $('.close-icon').hide();
            $('.menu-icon').css({
                opacity: 0
            });
            $('.menu-icon').show();

            $('.menu-icon').animate({
                opacity: 1
            }, 250);
        });

        setSideBar('dot');
    });

});

function setSideBar(choice) {

    if (choice == "diamond") {
        $('.iconset').animate({
            opacity: 0
        }, 250, function() {
            $(this).html(diamondTemplate);
            $(".diamond")
                .mouseenter(function() {
                    this.src = '../menu/section-icon-after.png'

                    var index = parseInt(this.id);
                    $($('.strip')[index]).find('.filter').hide();            
                })
                .mouseleave(function() {
                    this.src = '../menu/section-icon-before.png'
                    
                    var index = parseInt(this.id);
                    $($('.strip')[index]).find('.filter').show();
                });
        }).animate({
            opacity: 1    
        }, 250);

        $.fn.fullpage.setMouseWheelScrolling(false);
        $.fn.fullpage.setAllowScrolling(false);
    } else if (choice == 'dot') {
        
        $('.iconset').animate({
            opacity: 0
        }, 250, function() {
            $(this).html(dotTemplate);
        }).animate({
            opacity: 1    
        }, 250);

        var x = $('.side-dot')[currentIndex-1];
        $(x).prepend($('.selected'));

        $.fn.fullpage.setMouseWheelScrolling(true);
        $.fn.fullpage.setAllowScrolling(true);
    }
}

$( window ).resize(function() {
	var h = $(window).height();

 	$('.bar').css({
        height: h,
 	});
    var pageWidth = $('#fullpage').width();
    $('#menuwrapper').css({
        width: pageWidth - 95
    });
});

var overlay = `
    <div id="menuwrapper">
        <a href="../introduction/introduction.html"><div id="intro-strip" class="strip"> 
            <div class="section-name">
                Introduction
            </div>
            <div class="strip-name">
                Rising Waters
            </div>
            <div class="filter">
            </div>
        </div></a>
        <div id="lands-strip" class="strip">
            <div class="section-name">
                Lands
            </div>
            <div class="strip-name">
                Islands on the Brink
            </div>
            <div class="filter">
            </div>
        </div>
        <div id="government-strip" class="strip">
            <div class="section-name">
                Government
            </div>
            <div class="strip-name">
                The Last Resort
            </div>
            <div class="filter">
            </div>
        </div>
        <div id="people-strip" class="strip">
            <div class="section-name">
                People
            </div>
            <div class="strip-name">
                Vanishing Stories
            </div>
            <div class="filter">
            </div>
        </div>
        <div id="future-strip" class="strip">
            <div class="section-name">
                Future
            </div>
            <div class="strip-name">
                The Need for Change
            </div>
            <div class="filter">
            </div>
        </div>
    </div>
`;

var diamondTemplate = `
    <a href="../introduction/introduction.html"><img class="icon diamond" id="0" src='../menu/section-icon-before.png'></a>
    <img class="icon diamond" id="1" src='../menu/section-icon-before.png'>
    <img class="icon diamond" id="2" src='../menu/section-icon-before.png'>
    <img class="icon diamond" id="3" src='../menu/section-icon-before.png'>
    <img class="icon diamond" id="4" src='../menu/section-icon-before.png'>
`;

var dotTemplate = `
            <div class="side-dot">
                <img class="selected" src="subsection-icon-selected.png">
                <img class="icon" src='subsection-icon.png'></div>
            <div class="side-dot"><img class="icon" src='subsection-icon.png'></div>
            <div class="side-dot"><img class="icon" src='subsection-icon.png'></div>
            <div class="side-dot"><img class="icon" src='subsection-icon.png'></div>
`;











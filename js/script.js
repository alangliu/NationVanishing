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
    
    //Fade In and Out

    $('body').fadeIn(500).removeClass('hidden');

    fadeOutLink('#intro-strip', '../introduction/introduction.html');
    fadeOutLink('#lands-strip', '../lands/lands.html');
    fadeOutLink('#government-strip', '../government/government.html');
    fadeOutLink('#people-strip', '../people/people.html');
    fadeOutLink('#future-strip', '../future/future.html');

    if ($('meta#dots-diamonds').length > 0) {
        $('#fullpage').fullpage( {
        	onLeave: function(index, nextIndex, direction) {
        	},
        	afterLoad: function(anchorLink, index) {
                currentIndex = index;
            	setSideBar('dot', false);
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
        });

        var delay = 100;
        $('.strip').css({ opacity: 0 });
        $($(".strip").get().reverse()).each(function() {
            $(this).animate({
                opacity: 1
            }, delay);
            delay += 200;
        });

        // $("#menuwrapper").animate({
        //     opacity: 1,
        // }, 500, function() {
        //     $('#menuwrapper').show();
        // });

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

        setSideBar('diamond', true);
    });

    $(".close-icon").on("click", function(e) {
        var delay = 100;
        var stripCount = $('.strip').length;
        $('.strip').each(function(index) {
            $(this).animate({
                opacity: 0
            }, delay, function() {
                if (index === stripCount - 1) {
                $('#menuwrapper').remove();
            }
            });
            delay += 200;


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

        setSideBar('dot', true);
    });
});

function fadeOutLink(elementLink, destination) {
    $('body').on('click', elementLink,function() {
        $('body').fadeOut(500, function() {
            window.location.href = destination;
        });
    });
}

function setSideBar(choice, animate) {
    if (choice == "diamond") {
        $('.iconset').animate({
            opacity: 0
        }, 250, function() {
            $(this).html(diamondTemplate);
            $(".diamond")
                .mouseenter(function() {
                    this.src = this.src.replace('before', 'after');

                    var index = parseInt(this.id);
                    $($('.strip')[index]).find('.filter').hide();            
                })
                .mouseleave(function() {
                    this.src = this.src.replace('after', 'before');
                    
                    var index = parseInt(this.id);
                    $($('.strip')[index]).find('.filter').show();
                });
        }).animate({
            opacity: 1    
        }, 250);

        $.fn.fullpage.setMouseWheelScrolling(false);
        $.fn.fullpage.setAllowScrolling(false);
    } else if (choice == 'dot') {
        var fullTemplate = `
            <div class='side-dot'>
                <img class='selected' src='../menu/subsection-icon-selected.png'>
                <img class='sub-icon' src='../menu/subsection-icon.png'></div>`;
        for (var i = 0; i < $('.section').length - 1; i++) {
            fullTemplate += "<div class='side-dot'><img class='sub-icon' src='../menu/subsection-icon.png'></div>";
        }

        if (animate) {
            $('.iconset').animate({
                opacity: 0
            }, 250, function() {
                $(this).html(fullTemplate);
            }).animate({
                opacity: 1    
            }, 250);
        }

        else {
            $('.iconset').html(fullTemplate);
        }

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
        <a><div id="intro-strip" class="strip"> 
            <div class="section-name">
                Introduction
            </div>
            <div class="strip-name">
                Rising Waters
            </div>
            <div class="filter">
            </div>
        </div></a>
        <a><div id="lands-strip" class="strip">
            <div class="section-name">
                Lands
            </div>
            <div class="strip-name">
                Islands on the Brink
            </div>
            <div class="filter">
            </div>
        </div></a>
        <a><div id="government-strip" class="strip">
            <div class="section-name">
                Government
            </div>
            <div class="strip-name">
                The Last Resort
            </div>
            <div class="filter">
            </div>
        </div></a>
        <a><div id="people-strip" class="strip">
            <div class="section-name">
                People
            </div>
            <div class="strip-name">
                Vanishing Stories
            </div>
            <div class="filter">
            </div>
        </div></a>
        <a><div id="future-strip" class="strip">
            <div class="section-name">
                Future
            </div>
            <div class="strip-name">
                The Need for Change
            </div>
            <div class="filter">
            </div>
        </div></a>
    </div>
`;

var diamondTemplate = `
    <a href="../introduction/introduction.html"><img class="icon diamond" id="0" src='../menu/intro-icon-before.png'></a>
    <a href="../lands/lands.html"><img class="icon diamond" id="1" src='../menu/lands-icon-before.png'></a>
    <a href="../government/government.html"><img class="icon diamond" id="2" src='../menu/government-icon-before.png'></a>
    <a href="../people/people.html"><img class="icon diamond" id="3" src='../menu/people-icon-before.png'></a>
    <a href="../future/future.html"><img class="icon diamond" id="4" src='../menu/future-icon-before.png'></a>
`;











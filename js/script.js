var winHeight = $(window).height();

$('.section').css( {
    height: winHeight,
    width: '100%'
 });

 $('.bar').css( {
    height: winHeight,
 });

 var currentIndex = 1;
 var isPlay = false;

var thermNums = ['+ .12', '+ .11', '+ .10', '+ .09', '+ .08'];

var cop21Content = [
    {
        title: 'Climate Change',
        text: 'The 2015 United Nations Climate Change Conference, or COP 21,was held in Paris, France, from November 30th to December 12th.The conference was attended by over 190 countries and set alandmark goal of limiting global temperature increase to 1.5degrees Celsius.',
    },
    {
        title: 'Cop21',
        text: 'I think it\'s a conference',
    },
    {
        title: 'Cop22',
        text: 'Probably the following conference',
    },
    {
        title: 'Cop23',
        text: 'The Final Conference',
    },
]

$(document).ready(function() {
    $('#cop21-links p').click(function() {
        var index = $(this).index();

        $('#cop21-content h4').text(cop21Content[index].title);
        $('#cop21-content p').text(cop21Content[index].text);

        $('.cop21-active').removeClass('cop21-active');
        $(this).addClass('cop21-active');
    });

    var origThermTop =  parseInt($('#yellow-bar').css('top'), 10);
    $('#temp-numbers p').click(function() {
        var index = $(this).index();

        var yPos =  getOffset(this).top + 15;
        var thermHeight = origThermTop - yPos;
        if (this == $('#temp-numbers p')[$('#temp-numbers p').length - 1]) {
            thermHeight = 0;
            yPos = origThermTop;
        }

        $('#yellow-bar').animate({
            top: yPos,
            height: thermHeight
        }, 1000);

        $('#temp-box').animate({
            top: yPos - 27,
        }, 1000, function() {
            $('#temp-box p').text(thermNums[index]);
        });
    });

    $('#above-graphic').click(function() {
        setIcebergCard();
        $(this).css("background-image", "url(../introduction/above-selected.png)");
        $('#below-graphic').css("background-image", "url(../introduction/below-faded.png)");
        $('#iceberg-title').text('Above');
        $('#iceberg-text').text('Mountain glaciers and polar ice caps are melting. The runoff water is added to the world’s ocean supply.');
    });

    $('#below-graphic').click(function() {
        setIcebergCard();
        $(this).css("background-image", "url(../introduction/below-selected.png)");
        $('#above-graphic').css("background-image", "url(../introduction/above-faded.png)");
        $('#iceberg-title').text('Below');
        $('#iceberg-text').text('Warmer ocean temperatures expand water molecules in a process called thermal expansion. The expanded water has nowhere to go but up!');
    });

    $('#play1').click(function() {
        if (isPlay) {
            document.getElementById('audio1').pause();
            $(this).removeClass('pause');
            isPlay = false;
        } else {
            document.getElementById('audio1').play();
            $(this).addClass('pause');
            isPlay = true;
        }
    });

    $('#play2').click(function() {
        if (isPlay) {
            document.getElementById('audio2').pause();
            $(this).removeClass('pause');
            isPlay = false;
        } else {
            document.getElementById('audio2').play();
            $(this).addClass('pause');
            isPlay = true;
        }
    });

    //Fade In and Out
    $('body').fadeIn(600).removeClass('hidden');

    fadeOutLink('#intro-strip', '../introduction/introduction.html');
    fadeOutLink('#lands-strip', '../lands/lands.html');
    fadeOutLink('#government-strip', '../government/government.html');
    fadeOutLink('#people-strip', '../people/people.html');
    fadeOutLink('#future-strip', '../future/future.html');

    fadeOutLink('#intro-nextbutton', '../lands/lands.html');
    fadeOutLink('#lands-nextbutton', '../government/government.html');
    fadeOutLink('#government-nextbutton', '../people/people.html');
    fadeOutLink('#people-nextbutton', '../future/future.html');

    if ($('meta#dots-diamonds').length > 0) {
        $('#fullpage').fullpage( {
            anchors:['1', '2', '3', '4', '5', '6', '7', '8'],
            onLeave: function(index, nextIndex, direction) {
                $('h1, h2, h3, h4, h5, h6, hr, .graphic, .nextbutton, .end-icon, .card').css({'visibility': 'hidden'});
                $('h1, h2, h3, h4, h5, h6, hr, .graphic, .nextbutton, .end-icon, .card').removeClass('animated fadeInUp');
                $('p, .story-overlay').css({'visibility': 'hidden'});
                //Keep content on page almost
                //this.find('h4').css({'visibility': 'visibile'});
                $('p, .story-overlay').removeClass('animated fadeIn');
                $('.play').removeClass('pause');
            },
            afterLoad: function(anchorLink, index) {
                currentIndex = index;
                setSideBar('dot', false);
                $('h1, h2, h3, h4, h5, h6, hr, .graphic, .nextbutton, .end-icon, .card').css({'visibility': 'visible'});
                $('h1, h2, h3, h4, h5, h6, hr, .graphic, .nextbutton, .end-icon, .card').addClass('animated fadeInUp');
                $('p, .story-overlay').css({'visibility': 'visible'});
                $('p, .story-overlay').addClass('animated fadeIn');
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
        $('body').fadeOut(600, function() {
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
                <a href="#1"><img class='sub-icon' src='../menu/subsection-icon.png'></a>
            </div>`;
        for (var i = 0; i < $('.section').length - 1; i++) {
            fullTemplate += "<div class='side-dot'><a href='#" + (i + 2) + "'><img class='sub-icon' src='../menu/subsection-icon.png'></a></div>";
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

function setIcebergCard() {
    if ($('.why-default').length > 0) {
        $('.why-default').replaceWith(icebergTermplate);
    }
}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

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

var icebergTermplate = `
    <div class="card-container">
        <div class="card-content">
            <h4 id="iceberg-title"></h4>
            <hr>
            <p id="iceberg-text"></p>
        </div>
    </div>
`









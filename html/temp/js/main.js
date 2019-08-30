$(document).ready(function () {

    var preloader = $('.preloader'),
        progressText = $('.preloader .percent'),
        imagesCount = $('img').length,
        body = $('body'),
        percent = Math.floor(100 / imagesCount),
        progress = 0,
        loadedImg = 0;

    if (imagesCount > 0) {
        preloader.css('background', '#fff');
        body.css('overflow', 'hidden');
    }

    for (var i = 0; i < imagesCount; i++) {
        var imageCopy = new Image();

        imageCopy.src = document.images[i].src;
        imageCopy.onload = imgLoad;
        imageCopy.onerror = imgLoad;
    }

    function imgLoad () {
        progress += percent;
        loadedImg++;

        if (progress >= 100 || loadedImg == imagesCount) {
            // progress = 100;
            preloader.delay(500).fadeOut('slow');
            body.css('overflow', '');
        }
        progressText.text(progress + '%');
    }

    var arrow = '<img src="./img/arrow-right.svg" class="arrow animated delay-1s" data-animation="slideInLeft">',
        rectangleBackground = '<img src="./img/rectangle-horizontal.svg" class="rectangle animated delay-1s" data-animation="slideInRight">',
        text = '<span class="animated delay-1s" data-animation="fadeIn">next</span>',
        btnNext = '<button type="button" class="slick-arrow slick-next ">' + arrow + text + rectangleBackground + '</button>';

    $('.team-slider').slick({
        infinite: true,
        slidesToShow: 1,
        dots: true,
        prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
        nextArrow: btnNext,
        // autoplay: true,
        // autoplaySpeed: 2000
    });
    $('.our-profile_slider').slick({
        infinite: false,
        slidesToShow: 3,
        dots: false,
        arrows: false,
        // autoplay: true,
        // autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    variableWidth: true
                }
            }
        ]
    });
    $('.show-js').click(function () {
        var item = $(this);
        if (item.hasClass('active')) {
            item.removeClass('active');
        }
        else {
            item.addClass('active');
        }
        item.next('.hide-info').slideToggle();
    });
});

$(window).on('load', function () {

    var windowWidth = $(window).outerWidth(true);

    $(window).scroll(function (e) {
        e.preventDefault();
        runAnimation();
    });﻿

    runAnimation();

    function runAnimation () {

        $('.animated').each(function () {

            var item = $(this),
                elemPos = item.offset().top,
                offsetTop = 0;

            if (windowWidth > 1365) {
                offsetTop = 700;
            }
            else if (windowWidth > 767) {
                offsetTop = 600;
            }
            else if (windowWidth > 319) {
                offsetTop = 450;
            }

            var topOfWindow = $(window).scrollTop() + offsetTop;

            if (elemPos < topOfWindow || topOfWindow > $(document).height() - 400) {
                item.addClass(item.data('animation'));

                if (item.hasClass('typing-text') && !item.hasClass('animated-show')) {
                    animateText(item, 1);
                }
                item.addClass('animated-show');
            }
        });
    }

    function animateText (item, index) {

        var text = item.data('text'),
            subText = text.substring(0, index++);

        if (item.hasClass('delay-2s')) {
            setTimeout(function () {
                animateText(item, index);
            }, 2000);
            item.removeClass('delay-2s');
        } else {
            item.text(subText);

            if (index <= text.length) {
                setTimeout(function () {
                    animateText(item, index);
                }, 100);
            }
            else {
                index = 0;
            }
        }
    }
});
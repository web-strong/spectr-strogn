$(document).ready(function () {

    var preloader = $('.preloader'),
        progressText = $('.preloader .percent'),
        imagesCount = $('img').length,
        html = $('html'),
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
            progress = 100;
            preloader.delay(600).hide();
            body.css('overflow', '');
            body.removeClass('no-scroll');
        }
        progressText.text(progress + '%');
    }

    $('.navbar-toggler').on('click', function () {

        $(this).toggleClass('open');
        html.toggleClass('no-scroll');
        body.toggleClass('no-scroll');

        // disable scrolling in iOS mobile devices
        if ($('body').hasClass('no-scroll')) {
            $('body').on('touchmove', function (e) {
                e.preventDefault();
            });
        }
    });

    var arrow = '<img src="/img/arrow-right.svg" class="arrow animated delay-1s" data-animation="slideInLeft">',
        arrowLeft = '<img src="/img/arrow-left.svg" class="arrow animated delay-1s" data-animation="slideInLeft">',
        rectangleBackground = '<img src="/img/rectangle-horizontal.svg" class="rectangle animated delay-1s" data-animation="slideInRight">',
        text = '<span class="animated delay-1s" data-animation="fadeIn">next</span>',
        textPrev = '<span class="animated delay-1s" data-animation="fadeIn">prev</span>',
        btnPrev = '<button type="button" class="slick-arrow slick-prev">' + arrowLeft + textPrev + rectangleBackground + '</button>',
        btnNext = '<button type="button" class="slick-arrow slick-next ">' + arrow + text + rectangleBackground + '</button>';

    $('.team-slider').slick({
        infinite: true,
        slidesToShow: 1,
        dots: true,
        prevArrow: btnPrev,
        nextArrow: btnNext,
        autoplay: true,
        autoplaySpeed: 2000
    });
    $('.our-profile_slider').slick({
        infinite: false,
        slidesToShow: 3,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
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

    if ($(window).outerWidth() < 768) {

        $('.slider').slick({
            mobileFirst: true,
            swipe: false,
            swipeToSlide: false,
            slidesToShow: 1,
            dots: false,
            arrows: true
        });
    }

    $('.slider .slick-next').on('click', function () {
        var activeSlide = $(this).prev().find('.slider-item.slick-active'),
            activeSlides = activeSlide.find('.slider-img'),
            indexActive = activeSlide.find('.slick-dots .slick-active').index();

        activeSlides.each(function (index, element) {
            if ($(element).data('slick-index') == indexActive ) {
                $(element).addClass('slick-active');
            }
        });
    });

    var sliderImages = $('.slider-images')

    sliderImages.on('init', function (event, slick) {
        var currentIndex = '<span class="slider-current">' + (slick.currentSlide + 1) + '</span>',
            length = '<span class="slider-length">' + slick.slideCount + '</span>',
            container = '<div class="slider-counter">' + currentIndex + ' / ' + length + '</div>';

        $(this).find('.slick-list').append(container);
    });

    $('.switch').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            sliderImages = $this.parentsUntil('.slider-item').parent().find('.slider-images img');

        sliderImages.each(function (index, element) {
            var srcImage = $this.hasClass('switch-desktop') ? $(element).data('desktop') : $(element).data('mobile');

            $(element).attr({'src' : srcImage});
        });
        $this.hasClass('switch-desktop') ? $this.removeClass('switch-desktop').text('MOBILE') : $this.addClass('switch-desktop').text('DESKTOP');
    });

    sliderImages.on('afterChange', function (event, slick) {
        $(event.target).find('.slider-counter .slider-current').text(slick.currentSlide + 1);
        $(event.target).find('.slider-counter .slider-length').text(slick.slideCount);
    });

    sliderImages.slick({
        mobileFirst: true,
        swipeToSlide: true,
        slidesToShow: 1,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: true,
                }
            }
        ]
    });

    $('.btn-more').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            notFull = $this.parent(),
            fullText = notFull.next();

        notFull.addClass('hidden');
        fullText.removeClass('hidden');
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

    $('select').styler();

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
        }
        else {
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
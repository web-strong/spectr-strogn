$(document).ready(function() {
    $(".team-slider").slick({
        infinite: true,
        slidesToShow: 1,
        dots: true,
        prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-arrow slick-next">next</button>',
        autoplay: true,
        autoplaySpeed: 2000
    });
    $(".our-profile_slider").slick({
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
    $(".show-js").click(function () {
        var item = $(this);
        if (item.hasClass("active")) {
            item.removeClass("active")
        } else {
            item.addClass("active")
        }
        item.next(".hide-info").slideToggle();
    });
    $(".city").click(function () {
        $(".city").removeClass("active");
        $(this).addClass("active");
    });
});

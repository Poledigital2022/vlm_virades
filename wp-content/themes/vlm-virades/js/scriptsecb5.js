(function ($, root, undefined) {

    $(function () {

        'use strict';

        $('.slider_explications .slides').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            arrows: false,
            pauseOnHover: false,
            fade: true
        });
        $('.single-virade .virade_slider ul').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            arrows: true,
            pauseOnHover: true,
            variableWidth: true,
            prevArrow: '<button type="button" class="slick-prev"><span class="icon-angle-left"></span></button>',
            nextArrow: '<button type="button" class="slick-next"><span class="icon-angle-right"></span></button>',
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: false,
                        dots: true,
                        arrows: false,
                        adaptiveHeight: true
                    }
                }
            ]
        });

        $('.m_menu_header #primary-menu-trigger').on('click', function(){
            $('#header-wrap #primary-menu-trigger').trigger( "click" );
        });

    });

})(jQuery, this);

//
// BASE Carousel
// --------------------------------------------------

// An ultra-light, customisable, 'just-works' carousel script

(function($) {

    "use strict";

    $.carousel = function (element, options) {

        var defaults = {
            slide: 'img',
            speed: 6000,

            transition: 'fade',
            transitionSpeed: 2000,
            easing: 'ease',

            firstSlide: 1,

            pauseOnHover: true,
            cssAnimations: true,
            fallback: true,

            allowJump: true,

            // callbacks
            onSlide: function () {},
            onNext: function () {},
            onPrev: function () {},
            onJump: function () {},
            onStart: function () {},
            onPause: function () {},
        },
            plugin = this,
            $element = $(element),
            interval;

        // add the basic css classes
        plugin.create = function () {

            // basic css structure
            $element.addClass('carousel');
            $element.addClass('transition-' + plugin.settings.transition); // transition class
            $element.find(plugin.settings.slide).addClass('slide'); // slide class

            // set first slide
            plugin.slide(plugin.settings.firstSlide);
            if (plugin.settings.speed) { plugin.run(); }

        };

        // take slider to a specific slide number
        plugin.slide = function (e, s, m) {

            s = typeof s !== 'undefined' ? s : plugin.settings.transitionSpeed; // speed default
            m = typeof m !== 'undefined' ? m : plugin.settings.easing; // transition default

            var i = $element.find('.active').index('.slide') + 1,
                n = $element.find('.slide').length,
                $to = $element.find(plugin.settings.slide + ':nth-child(' + e + ')'),
                $prev = ($to.prev('.slide').length === 0) ? $element.find('.slide:last') : $to.prev('.slide'),
                $next = ($to.next('.slide').length === 0) ? $element.find('.slide:first') : $to.next('.slide'),
                animate = (plugin.settings.transition === 'slide') ? 'left' : 'opacity';

            if (e > n) { return false; } // prevent going to non-existant slide

            if (plugin.settings.cssAnimations) {
                $element.find('.slide').css('transition', animate + ' ' + (s / 1000) + 's ' + m);
            }

            if (i > e && !(e === 1 && i === n) ) {
                $element.addClass('backwards');
            } else {
                $element.removeClass('backwards');
            }
            
            // stop slide flying into position when only 3
            if ($next.hasClass('left') && plugin.settings.transition === 'slide') {
                $next.hide();
                window.setTimeout(function(){
                    $next.show();
                }, s);
            }

            $element.find('.slide').removeClass('left active right');
            $to.addClass('active');
            $prev.addClass('left');
            $next.addClass('right');

            if ( $('a[data-carousel="jump"]').length > 0 ) { // check if paged nav exits

                $('a[data-carousel="jump"]').each( function() {
                    if (parseInt($(this).attr('href').replace('#','')) === e) {
                        $(this).addClass('active');
                    } else {
                        $(this).removeClass('active');
                    }
                });

            }

            if (plugin.settings.fallback) { carouselAnimate(e, s); } // fallback animation
            plugin.settings.onSlide(e, s); // callback

        };

        // call next slide from current slide
        plugin.next = function () {

            var next = $element.find('.active').next('.slide').length,
                e = (next === 0) ? 0 : $element.find('.active').index('.slide') + 1;

            plugin.slide(e + 1);
            plugin.settings.onNext(e); // callback

        };

        // call previous slide from current slide
        plugin.prev = function () {

            var prev = $element.find('.active').prev('.slide').length,
                e = (prev === 0) ? $element.find('.slide:last').index('.slide') + 1 : $element.find('.active').index('.slide');

            plugin.slide(e);
            plugin.settings.onPrev(e); // callback

        };

        // move to a non-sequential slide
        plugin.jump = function (e) {

            plugin.pause();

            if (plugin.settings.transition === 'slide') {

                var index = $element.find('.active').index('.slide') + 1, // current position
                    d = (e >= index), // direction
                    steps = (d) ? (e - index) : (index - e), // slides to travel
                    speed = plugin.settings.transitionSpeed / steps, // speed fraction
                    step = 1,
                    first = true;

                (function change() {
                    
                    var next = (d) ? (index + step) : (index - step),
                        easing = (first) ? 'ease-in' : (steps === 1) ? 'ease-out' : 'linear';

                    plugin.slide(next, speed, easing);
                    steps--;
                    step++;
                    first = false;
                    
                    interval = setTimeout(change, speed);
                    if (steps <= 0) { clearTimeout(interval); }

                })();

            } else { plugin.slide(e); }

            plugin.settings.onJump(e); // callback

        };

        plugin.run = function () {

            // run carousel
            interval = setInterval(function () {
                plugin.next();
            }, plugin.settings.speed);
            plugin.settings.onStart(); // callback

        };

        plugin.pause = function () {

            clearInterval(interval);
            plugin.settings.onPause(); // callback

        };

        var pauseOnHover = function() {

            if (!plugin.settings.pauseOnHover) { return false; }

            $element.hover(function () {
                plugin.pause();
            }, function() {
                plugin.run();
            });

        };

        var navigation = function() {

            $('a[data-carousel]').click( function(e) {
                
                plugin.pause();

                var action = $(this).attr('data-carousel'),
                to = $(this).attr('href').replace('#','');

                if (action === 'jump') {

                    if (plugin.settings.allowJump) {
                        $('a[data-carousel="jump"]').removeClass('active');
                        $(this).addClass('active');
                        plugin.jump(to);
                    }

                } else { plugin[action](); }

                e.preventDefault();

            });

        };

        // javascript animation fallbacks

        var carouselAnimate = function (e, s) {
            
            if ((!Modernizr.cssanimations || !plugin.settings.cssAnimations) && plugin.settings.transition === 'slide') {
                slideAnimation(s);
            } else if ((!Modernizr.cssanimations || !plugin.settings.cssAnimations) && plugin.settings.transition === 'fade') {
                fadeAnimation(s);
            }
        
        };

        var slideAnimation = function (speed) {
            
            $element.find('.slide').stop(true, true); // stop any running animations
            $element.find('.active').animate({ left: '0%' }, speed);
            $element.find('.left').animate({ left: '-100%' }, speed);
            $element.find('.right').animate({ left: '100%' }, speed);

        };

        var fadeAnimation = function (speed) {
            
            $element.find('.slide').stop(true, true); // stop any running animations
            $element.find('.active').animate({ opacity: '1' }, speed);
            $element.find('.left').animate({ opacity: '0' }, speed);
            $element.find('.right').animate({ opacity: '0' }, speed);

        };

        // external access: element.data('carousel').settings.propertyName
        plugin.settings = {};

        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);
            plugin.create();

            // private methods
            pauseOnHover();
            navigation();

        };
        plugin.init();

    };

    // add to the jQuery object
    $.fn.carousel = function (options) {

        return this.each(function () {
            if (undefined === $(this).data('carousel')) {

                var plugin = new $.carousel(this, options);

                // element.data('carousel').publicMethod(arg1, arg2, ... argn)
                // element.data('carousel').settings.propertyName
                $(this).data('carousel', plugin);

            }
        });

    };

})(jQuery);

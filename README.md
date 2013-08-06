#Carousel

Carousel is a lightweight, responsive & easy-to-use jQuery carousel plugin. It's powered by CSS3 animations, packed with features you'll actually use while coming in at a tiny 5kb.

Features:
- Use your own markup
- Supports all major browsers
- Horizonal slide and fade animations
- Powered by ultra-smooth CSS3
- Paged and next/previous controls
- Multiple sliders per page
- Full API with callbacks
- Works with jQuery

**Demo at [http://carousel.io/](http://carousel.io/)**

***

## Usage

**1.** Include the CSS/LESS and JS files.

```html
<style type="text/css" href="carousel.css" />
<script src="jquery.js"></script>
<script src="carousel.js"></script>
```

**2.** Setup the HTML. Carousel needs a wrapper around a set of 2 or more slides. These can be almost any HTML tag.

```html
<div id="my-demo-carousel">
  <img src="slide.jpg" />
  <img src="slide.jpg" />
  <img src="slide.jpg" />
</div>
 
<div id="my-second-demo-carousel">
  <div class="slide-content">Slide 1</div>
  <div class="slide-content">Slide 2</div>
  <div class="slide-content">Slide 3</div>
</div>
 
 
<!-- Next & previous navigation -->
<a href="#" data-carousel="prev">Previous</a>
<a href="#" data-carousel="next">Next</a>
 
<!-- Slide-by-slide navigation -->
<a href="#1" data-carousel="jump">1</a>
<a href="#2" data-carousel="jump">2</a>
<a href="#3" data-carousel="jump">2</a>
```

**3.** Initialise and configure.

```html
<script>  
  // load with defaults
  $('#my-demo-carousel').carousel();
    
  // specify the element to slide
  $('#my-demo-carousel').carousel({
    slide: '.slide-content'
  });
</script>
```

## Options

Full list of carousel options and callbacks with their defaults. Change options after initialisation by setting values using ```$(element).data('carousel').settings.propertyName```.

```js
$('.carousel').carousel({
    slide: 'img',
    speed: 5000,
 
    transition: 'fade', // 'fade', 'slide'
    transitionSpeed: 2000,
    easing: 'ease', // 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'
 
    firstSlide: 1,
 
    pauseOnHover: true,
    cssAnimations: true,
    fallback: true,
 
    allowJump: true, // allow the use of pager navigation
 
    // callbacks
    onSlide: function () {},
    onNext: function () {},
    onPrev: function () {},
    onJump: function () {},
    onStart: function () {},
    onPause: function () {},
});
```

## Methods

Method | Description
--- | --- | ---
`$(element).data('carousel').next()` | Go to the next slide
`$(element).data('carousel').prev()`  | Go to the previous slide
`$(element).data('carousel').pause()`	| Pause the carousel
`$(element).data('carousel').run()`	| Start the carousel
`$(element).data('carousel').jump( integer )`	| Go to the requested slide

## Contributing

Pull requests are encouraged! Please keep commits as clean as possible, and document any changes you make.

## License

TBC

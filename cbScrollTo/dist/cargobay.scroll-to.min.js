/* ==========================================================================
   Scroll to

   Initialize:
   cargobay.scrollTo();

   Support:
   Latest Chrome
   Latest FireFox
   Latest Safari
   IE10 and up
   ========================================================================== */

var cargobay = cargobay || {};

cargobay.scrollTo = function(undefined) {

    // Set up global variables and functions
    var init, duration, _scrollTo;

    // Smooth scroll using easeInOutQuad curve
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) {
        return c/2*t*t + b;
      }
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    // Enable the animation by frame with requestAnimationFrame for smart animating
    var requestAnimFrame = (function(){
      return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
    })();

    // Main scroll to top function
    _scrollTo = function() {

      [].forEach.call(document.querySelectorAll('.js-scroll-to'), function(el) {

          el.addEventListener('click', function(e) {

              e.preventDefault();

              //Set up the right values to start with

                  // Where do you want to scroll to
              var target = el.getAttribute('data-scroll-to') ? document.querySelector(el.getAttribute('data-scroll-to')).offsetTop : 0,

                  // Select the scrollable element
                  element = el.getAttribute('data-scroll-parent') ? el.getAttribute('data-scroll-parent') : document.body,

                  // Duration of the animation
                  duration = el.getAttribute('data-duration') ? el.getAttribute('data-duration') : 500,

                  // Select a point to start the animation
                  start = element.scrollTop,

                  // Calculate the distance between the start point and the target point
                  change = target - start,

                  // Init the time for the animation
                  currentTime = 0,

                  // Define an incrementation value for the time
                  increment = 20,

                  // Init the amount which will be used for the current scroll animation amount
                  amount;

              var animateScroll = function() {

                // Increment the time
                currentTime += increment;

                // Define the amount to scroll linked to an easing animation value curve
                amount = Math.easeInOutQuad(currentTime, start, change, duration);

                // Move the document.body
                element.scrollTop = amount;

                // Run it until the end of the animation
                if (currentTime < duration) {
                  requestAnimFrame(animateScroll);
                }
              };
              animateScroll();

          }, false);
      });

    };

    // Init
    init = (function() {
        _scrollTo();
    })();
};

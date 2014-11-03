/* Author: Dan Linn */
/*
(function($) {
  $(window).resize(function(){
    if(!$(".mobileselect").length) {
      createMobileMenu();
    } else if ($(window).width()>=480) {
      $('#navigation ul').show();
      $('.mobileselect').hide();
    } else {
      $('#navigation ul').hide();
      $('.mobileselect').show();
    }
  });
  function createMobileMenu(){
    $('#navigation ul').mobileSelect({
      autoHide: true, // Hide the ul automatically
      defaultOption: "Navigation", // The default select option
      deviceWidth: 480, // The select will be added for screensizes smaller than this
      appendTo: '', // Used to place the drop-down in some location other than where the primary nav exists
      className: 'mobileselect', // The class name applied to the select element
      useWindowWidth: true // Use the width of the window instead of the width of the screen
    });
  }
  Drupal.behaviors.mobileMenu = {
    attach: function (context) {
      createMobileMenu();
    }
  }
})(jQuery);
*/

// Project Items Slideshow
function slideshow(id) {
  var navID = '<ul class="nav" id="nav-'+id+'">';
  jQuery("#slideshow-"+id).before(navID).cycle({
    fx:     'turnDown',
    speed:  'fast',
    timeout: 0,
    pager:  '#nav-'+id,
    next: '#slideshow-'+id,

    // callback fn that creates a thumbnail to use as pager anchor
    pagerAnchorBuilder: function(idx, slide) {
      if(idx == 4) {
        return '<li class="last"><a href="#"><img src="' + slide.src + '" width="68" height="47" /></a></li>';
      } else {
        return '<li><a href="#"><img src="' + slide.src + '" width="68" height="47" /></a></li>';
      }
    }
  });
}

// Home page slideshow
function mycarousel_initCallback(carousel) {
  jQuery('.jcarousel-control a').bind('click', function() {
    carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
    return false;
  });

  jQuery('#slideshow').live('mouseover mouseout', function(event) {       

    // Disable default action
    event.preventDefault();

    // Stop carousel at mouseover
    if (event.type == 'mouseover') {
      carousel.stopAuto();
    };

    // Restart carousel at mouseout
    if (event.type == 'mouseout') {
      carousel.startAuto()
    }; 
  });

};

function runSlideShow() {
  jQuery("#slideshow").jcarousel( {
    scroll: 1,
    auto: 4,
    wrap: 'last',
    initCallback: mycarousel_initCallback,
    itemVisibleInCallback: {
      onAfterAnimation: function(c, o, i, s) {
      //console.log(o);
        --i;
        j = i--;
        jQuery('.jcarousel-control a').removeClass('active').addClass('inactive');
        jQuery('.jcarousel-control a:eq('+j+')').removeClass('inactive').addClass('active');
      }
    },
    buttonNextHTML: null,
    buttonPrevHTML: null,
  });
}


// Views Rows fadein
jQuery(document).ready(function() {
  jQuery( ".view-portfolio-items .views-row" ).each(function() {
    jQuery(this).hide().fadeIn(3000);
  });
});


























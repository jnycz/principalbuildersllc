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

// Community Outreach Slideshow
function coSlideshow(id) {

  // Run jcycle
  /*
  jQuery(id).cycle({
    fx:     'shuffle',
    easing: 'easeOutBack',
    pause: 0,
    timeout: 3000,
    next: id + ' img'

  });*/

  jQuery('.photo-slider').each(function() {
    var $this = jQuery(this);
    $this.cycle({
      fx: 'shuffle',
      easing: 'easeOutBack',
      pause: 0,
      timeout: 3000,
    });
  });

}



// Return random numbers between the range args
function randomIntFromInterval(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
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

  // Portfolio items fade in to hide loading
  jQuery( ".view-portfolio-items .views-row" ).each(function() {
    jQuery(this).hide().fadeIn(3000);
  });

  // Accordian
  var items = '.tabbed-content-container .tabbed-content.open .items';
  var tabbedContent = '.tabbed-content-container .tabbed-content';
  var tabbedContentHeading = '.tabbed-content-container .tabbed-content h2';
  var tabbedContentItems = '.tabbed-content-container .tabbed-content .item';
  jQuery(tabbedContentHeading).click(function() {
    var clickedHeading = jQuery(this).parent('.tabbed-content');
    jQuery(items).slideUp(400, "easeInOutQuart");
    // Second click
    if(clickedHeading.hasClass('open')) {
      jQuery(this).parent('.tabbed-content').removeClass('open');
      jQuery(this).next(items).slideUp(400, "easeInOutQuart");
    } else {
      // Open
      jQuery(tabbedContent).removeClass('open');
      jQuery(this).parent('.tabbed-content').addClass('open');
      jQuery(this).next(items).slideDown(400, "easeInOutQuart");
    }
  });

  coSlideshow();

});


























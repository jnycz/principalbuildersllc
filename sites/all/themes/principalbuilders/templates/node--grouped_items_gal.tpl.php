<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
  <div class="node-inner">

    <div class="photo-slider" id="ps-<?php print $node->nid; ?>">
      <?php
      foreach($node->field_en_gallery['und'] as $image) {
        $path = $image['uri'];
        $width = $image['width'];
        $height = $image['height'];
        $img = $image['filename'];
        $alt = $image['alt'];
        $title = $alt;
        $image = theme('image_style', array('style_name' => 'sc_360x271', 'width' => $width, 'height' => $height, 'path' => $path, 'alt' => $alt, 'title' => $title, 'attributes' => array('class' => 'slide-image')));
        $lightbox_image_url[] = image_style_url('s_w800',$path);
        print $image;
      }
      ?>
    </div>

    <div class="tabbed-content-container">
      <?php
      // Ahh items
      $items = field_get_items('node', $node, 'field_item');
      foreach ($items as $key => $value) {
        $fc = field_collection_field_get_entity($value);
        $title = $fc->field_en_title['und'][0]['value'];
        $desc = $fc->field_en_desc['und'][0]['value'];
        //dpm($fc);
        ?>
        <div class="tabbed-content">
          <h2><?php print $title; ?><span class="icon-plus"></span></h2>
          <div class="items">
            <div class="item">
              <?php print '<div class="description">'.$desc.'</div>'; ?>
            </div>
          </div>
        </div>
      <?php
      }
      ?>
    </div><!-- /tabbed-container -->

    <div class="quote">
      <?php print render($content['field_pull_quote']);?>
      <?php print render($content['field_quote_byline']);?>
    </div>

  </div> <!-- /node-inner -->
</article> <!-- /node-->
<script type= "text/javascript">
  jQuery(document).ready(function() {
    var id = "<?php print '#ps-'.$node->nid; ?>";

    jQuery(id + " .slide-image").each( function () {
      var randNum = randomIntFromInterval(-10, 10 );
      var degree = randNum + 'deg';
      jQuery(this).css({transform: 'rotate('+ degree + ')'});
    });

  });
</script>

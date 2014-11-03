<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
  <div class="node-inner">
    <div class="content">

      <div class="left">
        <div id="slideshow-<?php print $node->nid;?>">
        <?php
        foreach($node->field_portfolio_item_images['und'] as $image) {
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
      </div>

      <script type= "text/javascript">
        var id = <?php print $node->nid; ?>;
        slideshow(id);
      </script>

      <div class="right">
        <h2><?php print $node->title; ?></h2>
        <?php print render($content['field_portfolio_item_description']);?>
        <div class="lightbox-btn">
          <?php
          foreach($lightbox_image_url as $key => $liu) {
            if($key == 0) {
              print '<a href="'.$liu.'" rel="lightshow['.$node->nid.']" class="lightbox_open">View Slideshow</a>';
            } else {
              print '<a href="'.$liu.'" rel="lightshow['.$node->nid.']" class="lightbox_hide_image">#</a>';
            }
          }
          ?>
        </div>
        <?php if (user_access('administer nodes')): ?>
          <div class="edit-btn"><?php print l('Edit', 'node/' . $nid . '/edit'); ?></div>
        <?php endif; ?>
        <?php if ($node->nid == 2):
          $termid = $node->field_portfolio_item_category['und'][0]['tid'];
          $term = taxonomy_term_load($termid);
          $title = $term->name;
        ?>
        <div class="view-section"><?php print l('View More Galleries', 'portfolio/' . $title); ?></div>
        <?php endif; ?>
      </div>
      <div class="clear"></div>
    </div>
  </div> <!-- /node-inner -->
</article> <!-- /node-->
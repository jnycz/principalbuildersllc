

      <?php print render($content['field_testimonial']); ?>

      <div id="slideshow">

        <ul>
        <?php

        // Build slideshow
        $slides = '';
        $controls = '';

        $num_slides = count($node->field_slideshow['und']);

        foreach ($node->field_slideshow['und'] as $key => $entity_id) {

          // Load entity
          $entity = entity_load('field_collection_item', array($entity_id['value']));
          $item = $entity_id['value'];

          // Load fields values to build html output
          $title = $entity[$item]->field_title['und'][0]['value'];
          $description = $entity[$item]->field_description['und'][0]['value'];

          // Build image vars for theme function render
          $image = $entity[$item]->field_slideshow_image['und'][0]['uri'];
          $image_width = $entity[$item]->field_slideshow_image['und'][0]['width'];
          $image_height = $entity[$item]->field_slideshow_image['und'][0]['height'];
          $image_alt = $entity[$item]->field_slideshow_image['und'][0]['alt'];

          // Build html output
          $slides .= '<li>';
          $slides .= theme('image_style', array('style_name' => 'sc_627x382', 'path' => $image, 'width' => $image_width, 'height' => $image_height, 'alt' => $description, 'attributes' => array('class' => 'slide-img')));
          $slides .= '<div class="slide-text-container">';
          $slides .= '<div class="slide-title">'.$title.'</div>';
          $slides .= '<div class="slide-desc">'.$description.'</div>';
          $slides .= '</div>';
          $slides .= '<div class="slide-text-bg"></div>';
          $slides .= '</li>';

          $index = $key + 1;

          // Build controls
          $controls .= '<a href="#">'.$index.'</a>';
        }

        print $slides;

        ?>
        </ul>


      </div>

      <?php print '<div class="jcarousel-control">'.$controls.'</div>'; ?>

      <script type="text/javascript">
        jQuery(document).ready(function() {
          jQuery('#content').hide().fadeIn(3000, function() {
            runSlideShow();
          });
        });
      </script>
      <noscript></noscript>


<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>">
  <div class="node-inner">
    <header>
      <?php if (!$page): ?>
        <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
      <?php endif; ?>
    </header>
    <div class="content">
      <?php
        print '<div class="left">'.render($content).'</div>';
        $block = module_invoke('webform', 'block_view', 'client-block-7');
        print render($block['content']);
      ?>
    </div>
  </div> <!-- /node-inner -->
</article> <!-- /node-->

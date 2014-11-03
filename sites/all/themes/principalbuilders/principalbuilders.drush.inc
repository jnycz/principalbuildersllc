<?php
/**
 * @file
 * Contains functions only needed for drush integration.
 */

/**
 * Implements hook_drush_command().
 */
function principalbuilders_drush_command() {
  $items = array();

  $items['principalbuilders'] = array(
    'description' => 'Generate a theme based on principalbuilders with your customizations.',
    'arguments' => array(
      'name'         => 'A name for your new theme.',
      'machine_name' => '[optional] A machine-readable name for your theme.',
    ),
    'options' => array(
      'name'         => 'A name for your new theme.',
      'machine-name' => '[a-z, 0-9] A machine-readable name for your theme.',
      'description'  => 'A description of your new theme.',
    ),
    'examples' => array(
      'drush principalbuilders "My theme name"' => 'Create a new theme based on principalbuilders.',
      'drush principalbuilders "My theme name" my_theme' => 'Create a new theme with a specific machine name.',
    ),
    'aliases' => array('bp'),
  );

  return $items;
}

/**
 * Implements hook_drush_help().
 */
function principalbuilders_drush_help($section) {
  switch ($section) {
    case 'drush:principalbuilders':
      return dt("Generate a theme from principalbuilders with your customizations.");
    case 'meta:principalbuilders:summary':
      return dt("Automates creating a principalbuilders based theme.");
  }
}

/*
* Create a customized principalbuilders instance.
*/
function drush_principalbuilders($name = NULL, $machine_name = NULL) {
  // Determine the theme name.
  if (!isset($name)) {
    $name = drush_get_option('name');
  }

  // Determine the machine name.
  if (!isset($machine_name)) {
    $machine_name = drush_get_option('machine-name');
  }
  if (!$machine_name) {
    $machine_name = $name;
  }
  $machine_name = str_replace(' ', '_', strtolower($machine_name));
  $search = array(
    // Remove characters not valid in function names.
    '/[^a-z0-9_]/',
    // Functions must begin with an alpha character.
    '/^[^a-z]+/',
  );
  $machine_name = preg_replace($search, '', $machine_name);

  // Determine the path to the new subtheme by finding the path to principalbuilders.
  system_rebuild_theme_data();
  $drupal_root = drush_get_context('DRUSH_SELECTED_DRUPAL_ROOT') . '/';
  $principalbuilders_path =  drupal_get_path('theme', 'principalbuilders');
  if (preg_match('/profiles\//', $principalbuilders_path)) {
    $newtheme_path = 'sites/all/themes/custom/';
    if (file_prepare_directory($newtheme_path)) {
      $newtheme_path = 'sites/all/themes/custom/' .
        str_replace('_', '-', $machine_name);
    }
    else {
      $newtheme_path = 'sites/all/themes/' .
        str_replace('_', '-', $machine_name);
    }
  }
  else {
    $newtheme_path = str_replace('principalbuilders',
                               str_replace('_', '-', $machine_name),
                               $drupal_root . $principalbuilders_path);
  }
  // Prefer sites/[host]/themes/custom if it exists
  $custom = str_replace('/contrib/', '/custom/', $newtheme_path, &$count);
  if ($count and is_dir(preg_replace('|/[^/]+$|', '', $custom))) {
    $newtheme_path = $custom;
  }

  // Make a copy with our changes.
  drush_op('principalbuilders_copy', $principalbuilders_path . '/', $newtheme_path . '/');

  // Rename the .info file.
  $newtheme_info_file = $newtheme_path . '/' . $machine_name . '.info';
  drush_op('rename', $newtheme_path . '/principalbuilders.info', $newtheme_info_file);

  // Alter the contents of the .info file based on the command options.
  $alterations = array(
    '= principalbuilders' => '= ' . $name,
    'version = "1.0"' => '',
    'project = "principalbuilders"' => '',
  );

  if (drush_confirm('Will you be using SASS?')) {
    $alterations['css/style.css'] = 'css/compiled/style.css';
    $cssbase = $newtheme_path . '/css/';
    unlink($cssbase . 'style.css');
    unlink($cssbase . 'tabs.css');
  }

  if ($description = drush_get_option('description')) {
    $alterations['Metaltoad HTML5/SASS base theme for Drupal 7'] = $description;
  }
  drush_op('principalbuilders_file_str_replace', $newtheme_info_file, array_keys($alterations), $alterations);

  // Remove the packaging script signature from the end of the info file.
  drush_op('principalbuilders_file_preg_replace', $newtheme_info_file, '/\n; Information added by drupal.*\Z/s', '');

  // Replace all occurrences of 'principalbuilders' with the machine name of our new theme.
  drush_op('principalbuilders_file_str_replace', $newtheme_path . '/theme-settings.php', 'principalbuilders', $machine_name);
  drush_op('principalbuilders_file_str_replace', $newtheme_path . '/template.php', 'principalbuilders', $machine_name);

  // Notify user of the newly created theme.
  drush_print(dt('New theme, "!name" created in: !path', array(
    '!name' => $name,
    '!path' => $newtheme_path,
  )));
}

/**
 * Copy a directory recursively.
 */
function principalbuilders_copy($source_dir, $target_dir, $ignore = '/^(\.(\.)?|principalbuilders.drush.inc|CVS|\.svn|\.git|\.DS_Store|\.sass-cache)$/') {
  if (!is_dir($source_dir)) {
    drush_die(dt('The directory "!directory" was not found.', array('!directory' => $source_dir)));
  }
  $dir = opendir($source_dir);
  @mkdir($target_dir);
  while ($file = readdir($dir)) {
    if (!preg_match($ignore, $file)) {
      if (is_dir($source_dir . '/' . $file)) {
        principalbuilders_copy($source_dir . '/' . $file, $target_dir . '/' . $file, $ignore);
      }
      else {
        copy($source_dir . '/' . $file, $target_dir . '/' . $file);
      }
    }
  }
  closedir($dir);
}

/**
 * Replace strings in a file.
 */
function principalbuilders_file_str_replace($file_path, $find, $replace) {
  $file_contents = file_get_contents($file_path);
  $file_contents = str_replace($find, $replace, $file_contents);
  file_put_contents($file_path, $file_contents);
}
/**
 * Replace strings in a file (with feeling).
 */
function principalbuilders_file_preg_replace($file_path, $pattern, $replace) {
  $file_contents = file_get_contents($file_path);
  $file_contents = preg_replace($pattern, $replace, $file_contents);
  file_put_contents($file_path, $file_contents);
}

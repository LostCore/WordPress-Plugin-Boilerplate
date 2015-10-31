<?php

namespace PluginName;

use PluginName\includes\Activator;
use PluginName\includes\Deactivator;
use PluginName\includes\Plugin;

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://example.com
 * @since             1.0.0
 * @package           PluginName
 *
 * @wordpress-plugin
 * Plugin Name:       WordPress Plugin Boilerplate
 * Plugin URI:        http://example.com/plugin-name-uri/
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Your Name or Your Company
 * Author URI:        http://example.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       plugin-name
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

spl_autoload_register( '\PluginName\autoloader' );


/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-plugin-name-activator.php
 */
register_activation_hook( __FILE__, function(){ Activator::activate(); } );

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-plugin-name-deactivator.php
 */
register_deactivation_hook( __FILE__, function(){ Deactivator::deactivate(); } );

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
(new Plugin( 'plugin-name', plugin_dir_path( dirname( __FILE__ ) ) ) )->run();

/**
 * Custom plugin autoloader function
 * @param $class
 */
function autoloader($class){
	$plugin_path = plugin_dir_path( __FILE__ );

	if(isset($childclass[0]) && isset($childclass[1])){
		if($childclass[0] == "PluginName"){
			switch($childclass[1]){
				case "includes":
					$name = end($childclass);
					$name = lcfirst(preg_replace("/_/","-",$name));
					require_once $plugin_path."includes/class-".$name.".php";
					break;
				case "widgets":
					$name = end($childclass);
					require_once $plugin_path."widgets/".$name.".php";
					break;
			}
		}
	}

	switch($class){
		case 'PluginName\pub\Pub':
			require_once plugin_dir_path( __FILE__ ) . 'public/class-public.php';
			break;
		case 'PluginName\admin\Admin':
			require_once plugin_dir_path( __FILE__ ) . 'admin/class-admin.php';
			break;
	}
}
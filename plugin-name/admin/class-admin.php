<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    PluginName
 * @subpackage PluginName/admin
 */

namespace PluginName\admin;
use PluginName\includes\Plugin;

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    PluginName
 * @subpackage PluginName/admin
 * @author     Your Name <email@example.com>
 */
class Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $PluginName    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * A reference to the main plugin class
	 *
	 * @since 1.0.0
	 * @var \PluginName\includes\Plugin
	 */
	private $plugin;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 * @param      string    $version    The version of this plugin.
	 * @param      Plugin    $instance   An instance of /includes/class-plugin.php
	 */
	public function __construct( $plugin_name, $version, Plugin $instance ) {
		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->plugin = $instance;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in PluginName_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The PluginName_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		if($this->plugin->is_debug()){
			wp_enqueue_style( $this->plugin->get_plugin_name(), $this->plugin->get_uri() . 'assets/src/css/admin.css', array(), $this->plugin->get_version(), 'all' );
		}else{
			wp_enqueue_style( $this->plugin->get_plugin_name(), $this->plugin->get_uri() . 'assets/dist/css/admin-min.css', array(), $this->plugin->get_version(), 'all' );
		}
	}
}

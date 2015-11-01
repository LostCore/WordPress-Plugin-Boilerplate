jQuery(document).ready(function($) {
    "use strict";
    if (pluginName.isAdmin) {
        /*************
         *************
         * ADMIN
         *************
         *************/
        var dashboard = require("./models/admin.js");
        new dashboard();
    }else{
        /*************
         *************
         * PUBLIC
         *************
         *************/
        var frontend = require("./models/public.js");
        new frontend();
    }
});
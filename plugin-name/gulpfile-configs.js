var settings = {
    paths: {
        build: [
            "**/*",
            "!.*" ,
            "!gulpfile.js" ,
            "!gulpfile.configs.js",
            "!package.json",
            "!bower.json",
            "!Movefile",
            "!Movefile-sample",
            "!assets/cache/**",
            "!{builds,builds/**}",
            "!{node_modules,node_modules/**}"
        ],
        build_dir: "./builds",
        main_js: ['./assets/src/js/main.js'],
        bundle_js: ['./assets/src/js/bundle.js'],
        scripts: ['./assets/src/js/**/*.js'],
        admin_scss: './assets/src/styles/admin.scss',
        public_scss: './assets/src/styles/public.scss',
        styles: ['./assets/src/styles/**/*.scss']
    },
    staging: {
        hostname: 'myserver.domain',
        ip: 'my.server.ip.address',
        user: 'myserveruser',
        path: '~/path/to/my/website/root/'
    },
    production:{
        path: '~/path/to/my/website/root/'
    }
};

module.exports = {
    paths: settings.paths,
    slug: 'plugin-name',
    rsync: {
        //https://joshgreendesign.com/web-development/setting-up-ssh-to-access-a-cpanel-managed-website/
        //https://help.github.com/articles/generating-ssh-keys/
        src: settings.paths.build,
        options: {
            destination: settings.staging.path,
            root: './',
            hostname: settings.staging.ip,
            username: settings.staging.user,
            incremental: true,
            progress: true,
            relative: true,
            emptyDirectories: true,
            exclude: ['.DS_Store'],
            include: []
        }
    }
};
require.config({
    baseUrl: ".",
    paths: {
        easeljs: '../../bower_components/EaselJS/lib/easeljs-0.8.1.min',
    },

    shim: {
        easeljs: {
            exports: 'createjs.EaselJS'
        }
    }
});
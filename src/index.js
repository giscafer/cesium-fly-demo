require('cesium/Widgets/widgets.css');
require('./css/main.css');

var Cesium = require('cesium/Cesium');

var addRiver = require('./app/river.js');
var fullscreen = require('./app/fullscreen.js');

// Example app

var viewer = new Cesium.Viewer('cesiumContainer');
window.viewer = viewer;
var scene = viewer.scene;
scene.debugShowFramesPerSecond = true;

Cesium.Math.setRandomNumberSeed(315);

// var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(101.80089882736969, 26.60700234866561));
// var emitterInitialLocation = new Cesium.Cartesian3(0.0, 0.0, 100.0);

function fly2China(viewer) {
    viewer = viewer ? viewer : window['viewer'];
    viewer.camera.flyTo({
        destination: Cesium.Rectangle.fromDegrees(80, 22, 130, 50),
        duration: 8
    })
}

function flyTest() {
    viewer.entities.removeAll();
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(101.80089882736969, 26.60700234866561, 2500),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-60),
            roll: 0.0
        },
        duration: 3
    });
    addRiver();
}

fly2China(viewer);

document.getElementById("china-rect").addEventListener('click', function () {
    fly2China();
});
document.getElementById("flyalongriver").addEventListener('click', function () {
    flyTest();
});

// 全屏显示
fullscreen.setFullScreen();

require('./app/license');
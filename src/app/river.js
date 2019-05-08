
var Cesium = require('cesium/Cesium');
var az = require('../data/flydata.js');

Cesium.BingMapsApi.defaultKey='Arj_lX2U8EqIrXuhSQbe45bkl0D-mjyx5Gm2u4CiY7bRcny4vAce2ACSyLBCJEeS';
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YzNkNDQyMC0wMGE5LTQ4NTEtOGE0OS05YTM2ZGQxNDZlODgiLCJpZCI6MTA3MzEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJnYyJdLCJpYXQiOjE1NTcyNDI5NDF9.Oy2kUMLrKbDIWiKVyqMNWLNwlL86OhVGREkbls_dMm8';
//沿河飞行
function addRiver() {


    var positionA = az.geometry.coordinates;
    var position = [];
    for (i = 0; i < positionA.length; i++) {
        var x = positionA[i][0];
        var y = positionA[i][1];
        position.push({ x: x, y: y });
    }

    function computeCirclularFlight(lon, lat, radius) {
        var property = new Cesium.SampledPositionProperty();
        //var _position = [{ x: 113.106100, y: 33.498900 }, { x: 111.100000, y: 34.320000 }, { x: 109.050000, y: 35.150000 }, { x: 107.010000, y: 35.9140000 }, { x: 104.900000, y: 36.7140000 }, { x: 102.800000, y: 37.600000 }, { x: 100.690800, y: 38.422000 }, { x: 98.570700, y: 39.241700 }, { x: 96.396500, y: 40.066100 }];
        for (var i = 0; i < position.length; i++) {
            if (i == 0) {
                var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
                var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170);
                property.addSample(time, _position);
            }
            if (i < 10000 && i > 0) {
                var position_a = new Cesium.Cartesian3(property._property._values[i * 3 - 3], property._property._values[i * 3 - 2], property._property._values[i * 3 - 1]);
                if (i < 976) {
                    var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170);
                }
                else if (i > 975 && i < 986) {
                    var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170 + 20 * (i - 980));
                }
                else if (i > 985) {
                    var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170 + 200);
                }

                var positions = [Cesium.Ellipsoid.WGS84.cartesianToCartographic(position_a), Cesium.Ellipsoid.WGS84.cartesianToCartographic(_position)];
                var a = new Cesium.EllipsoidGeodesic(positions[0], positions[1]);
                var long = a.surfaceDistance;
                var _time = long / 50;
                var time = Cesium.JulianDate.addSeconds(property._property._times[i - 1], _time, new Cesium.JulianDate());

                property.addSample(time, _position);
            }
        }
        /* property.setInterpolationOptions({
           interpolationDegree: 5,
           interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
        }); */
        console.log(property._property._values);
        console.log(property);
        return property;
    }
    var start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
    var stop = Cesium.JulianDate.addSeconds(start, 30000, new Cesium.JulianDate());

    //Make sure viewer is at the desired time.
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
    viewer.clock.multiplier = 10;
    viewer.clock.canAnimate = false;

    var __position = computeCirclularFlight(-112.110693, 36.0994841, 0.00005);

    entityee = viewer.entities.add({
        //Set the entity availability to the same interval as the simulation time.
        availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
            start: start,
            stop: stop
        })]),
        position: __position,
        orientation: new Cesium.VelocityOrientationProperty(__position),
        model: {
            uri: require('../SourceData/ModelData/Cesium_Air.gltf'),
            // uri: location.protocol + '//demo.felearn.com/demo练习/11_cesium飞行/cesium/SourceData/ModelData/Cesium_Air.gltf',//require('../SourceData/ModelData/Cesium_Air.gltf')
            scale: 6,
            minimumPixelSize: 64,

            //heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        },
        //Show the path as a pink line sampled in 1 second increments.
        path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.1,
                color: Cesium.Color.YELLOW
            }),
            width: 30
        }
    });

    viewer.trackedEntity = entityee;
    viewer.readonlytrackedEntityChanged  = function(){
        console.log('readonlytrackedEntityChanged ')
    };

}

module.exports = addRiver;
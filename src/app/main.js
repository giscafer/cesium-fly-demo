var baseInformation1;
var baseInformation2;
var baseInformation3;
var baseInformation4;
document.oncontextmenu = function () { return false; };
document.onkeydown = function () {
    if (window.event && window.event.keyCode == 123) {
        event.keyCode = 0;
        event.returnValue = false;
        return false;
    }
};
$('#searchtoolDiv a').click(function () {
    $("#tool_window").css("display", "none");
    var ss = this;
    console.log(ss);
    switch (this.id) {
        case "searchRoute":
            layer.closeAll();

            layer.open({
                type: 2,
                title: "查询定位",
                area: ['400px', '300px'],
                shade: 0,
                offset: [88, 88],
                content: "../extend/query.html",
                zIndex: layer.zIndex,
                success: function (layero) {
                    layer.setTop(layero)
                },
                end: function () {
                    var txt = $("#searchhid").val();
                    if (txt != "") {
                        var scene = viewer.scene;
                        var array = txt.split(",");
                        scene.camera.flyTo({
                            destination: Cesium.Cartesian3.fromDegrees(array[0], array[1], 5000.0)
                        });
                        $("#searchhid").val("");
                    }
                }
            });
            break;
        default:
            break
    }
})
$('#routelDiv a').click(function () {
    $("#tool_window").css("display", "none");
    var ss = this;
    console.log(ss);
    switch (this.id) {
        case "routetoolDiv":
            layer.closeAll();
            layer.open({
                type: 2,
                title: "路径规划",
                area: ['400px', '300px'],
                shade: 0,
                offset: [88, 88],
                content: "/extend/lujin.html",
                zIndex: layer.zIndex,
                success: function (layero) {
                    layer.setTop(layero)
                },
                end: function () {
                    
                }
            });
            break;
        default:
            break
    }
})

$('#routetoolDiv a').click(function () {
    $("#tool_window").css("display", "none");
    layer.open({
        type: 2,
        title: "查询定位",
        area: ['400px', '300px'],
        content: "/extend/query.html",
        zIndex: layer.zIndex
        ,yes: function(index, layero){
          //按钮【按钮一】的回调
        }
        ,btn2: function(index, layero){
          //按钮【按钮二】的回调
    
          //return false 开启该代码可禁止点击该按钮关闭
        }
        ,btn3: function(index, layero){
          //按钮【按钮三】的回调
    
          //return false 开启该代码可禁止点击该按钮关闭
        }
        ,cancel: function(){ 
          //右上角关闭回调
    
          //return false 开启该代码可禁止点击该按钮关闭
        }
    });
})

$('#modeltoolDiv dd').click(function () {
    $("#tool_window").css("display", "none");
    var ss = this;
    console.log(ss);
    var html1 = "<input id='model_id_2_aroundFly' class='model_id' type='button' onclick='circleFly(93.2055,42.8590,93.2055,42.8890,1600)' value='绕基地飞行'/><input id='model_id_2_suspendFly' class='model_id'type='button' onclick='handelModel(true)' value='暂停'/><input id='model_id_2_goOnFly'class='model_id' type='button' onclick='handelModel(false)' value='继续'/><input id='model_id_2_exitFly' class='model_id layui-layer-close' type='button' value='退出'/>";
    var html2 = "<input id='model_id_3_aroundFly' class='model_id' type='button' onclick='circleFly(93.1266,42.7951,93.1266,42.8100,1600)' value='绕基地飞行'/><input id='model_id_3_suspendFly' class='model_id' type='button' onclick='handelModel(true)' value='暂停'/><input id='model_id_3_goOnFly' class='model_id' type='button' onclick='handelModel(false)' value='继续'/><input id='model_id_3_exitFly' class='model_id layui-layer-close' type='button' value='退出'/>";
    var html3 = "<input id='model_id_2_aroundFly' class='model_id' type='button' onclick='fengjiFly()' value='绕风机飞行'/><input id='model_id_2_suspendFly' class='model_id'type='button' onclick='handelModel(true)' value='暂停'/><input id='model_id_2_goOnFly'class='model_id' type='button' onclick='handelModel(false)' value='继续'/><input id='model_id_2_exitFly' class='model_id layui-layer-close' type='button' value='退出'/>";
    var html4 = "<input id='model_id_2_aroundFly' class='model_id' type='button' onclick='guangfuFly()' value='绕光伏飞行'/><input id='model_id_2_suspendFly' class='model_id'type='button' onclick='handelModel(true)' value='暂停'/><input id='model_id_2_goOnFly'class='model_id' type='button' onclick='handelModel(false)' value='继续'/><input id='model_id_2_exitFly' class='model_id layui-layer-close' type='button' value='退出'/>";
    var html5 = "<input id='model_id_5_aroundFly' class='model_id' type='button' onclick='circleFly(112.2303, 39.0281,112.2276,39.0613,1600)' value='绕基地飞行'/><input id='model_id_5_suspendFly' class='model_id' type='button' onclick='handelModel(true)' value='暂停'/><input id='model_id_5_goOnFly' class='model_id' type='button' onclick='handelModel(false)' value='继续'/><input id='model_id_5_exitFly' class='model_id layui-layer-close' type='button' value='退出'/>";
    switch (this.id) {
        case "model_id_1":
            layer.open({
                type: 2,
                title: "城市建筑体",
                area: ['1800px', '850px'],
                shade: 0.3,
                content: ['http://112.74.101.152:11229/index.html', 'no'],
                zIndex: layer.zIndex,
                success: function (layero) {
                    layer.setTop(layero)
                }
            });
            break;
        case "model_id_2":
            $('.cesium-viewer-animationContainer').hide();
            layer.closeAll();
            addSun(93.2132, 42.8690, 400, "SourceData/ModelData/fengji.gltf", 20);
            layer.open({
                type: 1,
                title: "操作菜单",
                area: ['300px', '80px'],
                shade: 0,
                offset: [88, 88],
                content: html1,
                zIndex: layer.zIndex,
                success: function (layero) {
                    layer.setTop(layero)
                },
                end: function () {
                    viewer.entities.removeAll();
                    flytochina(viewer)
                }
            });
            break;
        case "model_id_3":
            layer.closeAll();
            addSun(93.1214, 42.7863, 678, "SourceData/ModelData/taiyang.gltf", 1);
            layer.open({
                type: 1,
                title: "操作菜单",
                area: ['300px', '80px'],
                shade: 0,
                offset: [88, 88],
                content: html2,
                zIndex: layer.zIndex,
                success: function (layero) {
                    layer.setTop(layero)
                },
                end: function () {
                    viewer.entities.removeAll();
                    flytochina(viewer)
                }
            });
            break;
        case "model_id_9":
            layer.closeAll();

            var scene = viewer.scene;
            viewer.entities.removeAll();
            viewer.scene.primitives.removeAll();
            scene.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(112.2276, 39.0613, 5000.0)
            });

            var fanViewers = new Fan.ViewModel('SourceData/ModelData/fc0901.gltf');
            fanViewers.createModel1(); //注释了才能加载标注
            layer.open({
                type: 1,
                title: "操作菜单",
                area: ['300px', '80px'],
                shade: 0,
                offset: [88, 88],
                content: html5,
                zIndex: layer.zIndex,
                success: function (layero) {
                    layer.setTop(layero)
                },
                end: function () {
                    viewer.entities.removeAll();
                    flytochina(viewer)
                }
            });
            break;
        case "model_id_4":
            layer.closeAll();
            addWater(101.0103037747995, 30.20573969366141, 685, 0);
            break;
        case "model_id_5":
            layer.closeAll();
            addtieta();
            break;
        case "model_id_10":
            layer.closeAll();
            addsimpleline(1);
            break;
        case "model_id_6":
            $('.cesium-viewer-animationContainer').show();
            layer.closeAll();
            layer.open({
                type: 1,
                title: "操作菜单",
                area: ['300px', '80px'],
                shade: 0,
                offset: [88, 88],
                content: "<input id='model_id_2_aroundFlyPoly' class='model_id' type='button' onclick='addRiver()' value='开始飞行'/><input id='model_id_2_aroundFlyPoly' class='model_id' type='button' onclick='stopFly()' value='退出飞行'/>",
                zIndex: layer.zIndex,
                success: function (layero) {
                    layer.setTop(layero)
                },
                end: function () {
                    viewer.entities.removeAll();
                    flytochina(viewer)
                }
            });
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
            break;
        case "model_id_7":
            layer.closeAll();
            addQingXie(101.8437, 26.6004, 330, 0);
            break;
        case "model_id_8":
            layer.closeAll();
            addYuanQu();
            break;
        default:
            break
    }
});

function handelModel(isExit) {
    if (isExit) {
        viewer.clock.onTick.removeEventListener(aminitation)
    } else {
        viewer.clock.onTick.addEventListener(aminitation)
    }
}

function stopFly() {
    viewer.trackedEntity = undefined;
    $('.cesium-viewer-animationContainer').hide();
    var start = Cesium.JulianDate.fromDate(new Date());
    viewer.clock.startTime = start.clone();
    var stop = Cesium.JulianDate.addSeconds(start, 300000000, new Cesium.JulianDate());
    viewer.clock.stopTime = stop.clone();
    layer.closeAll();
    viewer.entities.remove(entityee);
    viewer.camera.flyTo({
        destination: Cesium.Rectangle.fromDegrees(80, 22, 130, 50)
    })
}

function drawTool() {
    var drawHelper = new DrawHelper(viewer);
    var scene = viewer.scene;
    var toolbar = drawHelper.addToolbar(document.getElementById("_0"), {
        buttons: ['marker', 'polyline', 'polygon', 'circle', 'extent']
    });
    toolbar.addListener('markerCreated', function (event) {
        loggingMessage('Marker created at ' + event.position.toString());
        var b = new Cesium.BillboardCollection();
        scene.primitives.add(b);
        var billboard = b.add({
            show: true,
            position: event.position,
            pixelOffset: new Cesium.Cartesian2(0, 0),
            eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            scale: 1.0,
            image: '/customimage/1.png',
            color: new Cesium.Color(1.0, 1.0, 1.0, 1.0)
        });
        billboard.setEditable()
    });
    toolbar.addListener('polylineCreated', function (event) {
        loggingMessage('Polyline created with ' + event.positions.length + ' points');
        var polyline = new DrawHelper.PolylinePrimitive({
            positions: event.positions,
            width: 5,
            geodesic: true
        });
        scene.primitives.add(polyline);
        polyline.setEditable();
        polyline.addListener('onEdited', function (event) {
            loggingMessage('Polyline edited, ' + event.positions.length + ' points')
        })
    });
    toolbar.addListener('polygonCreated', function (event) {
        loggingMessage('Polygon created with ' + event.positions.length + ' points');
        var polygon = new DrawHelper.PolygonPrimitive({
            positions: event.positions,
            material: Cesium.Material.fromType('Checkerboard')
        });
        scene.primitives.add(polygon);
        polygon.setEditable();
        polygon.addListener('onEdited', function (event) {
            loggingMessage('Polygon edited, ' + event.positions.length + ' points')
        })
    });
    toolbar.addListener('circleCreated', function (event) {
        loggingMessage('Circle created: center is ' + event.center.toString() + ' and radius is ' + event.radius.toFixed(1) + ' meters');
        var circle = new DrawHelper.CirclePrimitive({
            center: event.center,
            radius: event.radius,
            material: Cesium.Material.fromType(Cesium.Material.RimLightingType)
        });
        scene.primitives.add(circle);
        circle.setEditable();
        circle.addListener('onEdited', function (event) {
            loggingMessage('Circle edited: radius is ' + event.radius.toFixed(1) + ' meters')
        })
    });
    toolbar.addListener('extentCreated', function (event) {
        var extent = event.extent;
        loggingMessage('Extent created (N: ' + extent.north.toFixed(3) + ', E: ' + extent.east.toFixed(3) + ', S: ' + extent.south.toFixed(3) + ', W: ' + extent.west.toFixed(3) + ')');
        var extentPrimitive = new DrawHelper.ExtentPrimitive({
            extent: extent,
            material: Cesium.Material.fromType(Cesium.Material.StripeType)
        });
        scene.primitives.add(extentPrimitive);
        extentPrimitive.setEditable();
        extentPrimitive.addListener('onEdited', function (event) {
            loggingMessage('Extent edited: extent is (N: ' + event.extent.north.toFixed(3) + ', E: ' + event.extent.east.toFixed(3) + ', S: ' + event.extent.south.toFixed(3) + ', W: ' + event.extent.west.toFixed(3) + ')')
        })
    });
    var logging = document.getElementById('logging');

    function loggingMessage(message) {
        logging.innerHTML = message
    }
}

$('#ultoolDiv dd').click(function () {
    var t = this;
    switch (this.id) {
        case "drawTool":
            layer.closeAll();
            layer.open({
                type: 1,
                title: "操作菜单",
                area: ['220px', '100px'],
                shade: 0,
                offset: [88, 88],
                content: "<div id='_0'></div>",
                zIndex: layer.zIndex,
                success: function (layero) {
                    layer.setTop(layero)
                },
                end: function () {
                    viewer.scene.primitives.removeAll();
                    flytochina(viewer)
                }
            });
            break;
        /*case "Add_Label":
            var htm = [];
            htm.push('<div class="map-marking-panel-tip show">地图上待标注位置鼠标左键点击地图添加一个点标注，可填写名称、备注、图标，点击保存生效！</div>');
            htm.push('<div class="layui-form-item"><label class="layui-form-label">文字内容</label><div class="layui-input-block"><input type="text" id="mark-name" placeholder="请输入标注名称" autocomplete="off" class="layui-input"></div></div>');
            htm.push('<div class="layui-form-item"><label class="layui-form-label">字体颜色</label><div class="layui-input-block"><select name="who" id="layerFontColor" lay-filter="aihao"><option selected value="WHITE">白色</option><option value="BLACK">黑色</option><option value="RED">红色</option><option value="GREEN">绿色</option><option value="YELLOW">黄色</option><option value="BLUE">蓝色</option><option value="PURPLE">紫色</option></select></div></div>');
            htm.push('<div class="layui-form-item"><label class="layui-form-label">字体大小</label><div class="layui-input-block"><select name="who" id="layerFontSize" lay-filter="aihao"><option selected>12</option><option>14</option><option>16</option><option>18</option><option>20</option><option>22</option><option>24</option><option>26</option><option>28</option><option>30</option><option>32</option><option>34</option><option>36</option><option>38</option></select></select></div></div>');
            htm.push('<div class="layui-form-item"><label class="layui-form-label">字体样式</label><div class="layui-input-block"><select name="who" id="layerFontFamily" lay-filter="aihao"><option selected>微软雅黑</option><option>宋体</option><option>黑体</option><option>sans-serif</option><option>Helvetica</option></select></div></div>');
            layer.open({
                type: 1,
                title: "绘制点标注",
                btn: ['确定', '取消'],
                area: ['500px', '500px'],
                shade: 0,
                content: htm.join(""),
                yes: function (index, layero) {
                    
                },
                end: function () {
                    
                    if (promise) {
                        viewer.dataSources.removeAll()
                    }
                    viewer.entities.removeAll();
                    viewer.dataSources.removeAll()
                }
            });
            break;
        case "measureTool":
            layer.closeAll();
            layer.open({
                type: 1,
                title: "操作菜单",
                area: ['270px', '100px'],
                shade: 0,
                content: "测量功能暂未开放",
                zIndex: layer.zIndex,
                success: function (layero) {
                    layer.setTop(layero)
                },
                end: function () {
                    viewer.scene.primitives.removeAll();
                    flytochina(viewer)
                }
            });
            break;*/
        case "VRTool":
            viewer.scene.useWebVR = true;
            break;
        case "ExitVRTool":
            viewer.scene.useWebVR = false;
            break;
        default:
            break
    }
    drawTool()
});
document.write('<script src="CesiumGis/JS/common/fullscreen.js"></script>');
var viewer;
$(function () {
    addfullscreenListener();
    //initViewer();
    $('.fullscreen').click(function () {
        if (screenfull.isFullscreen == true) {
            screenfull.exit()
        } else {
            screenfull.request()
        }
    });
    $('#modeltoolDiv dd').click(function () { });
    $('#ztttoolDiv dd').click(function () {
        layer.closeAll();
        var f = this;
        if (f.id == "ztt1_id") {
            var htm = [];
            htm.push('<div id="chooseradio" style="position:absolute; top:15px; left:20px; height: 30px">');
            htm.push('<input type="radio" id="Default" name="layerCustomDentify" checked="checked"><label for="Default">默认</label>');
            htm.push('<input type="radio" id="Basic" name="layerCustomDentify"><label for="Basic">经典</label>');
            htm.push('<input type="radio" id="Custom" name="layerCustomDentify"><label for="Custom">自定义</label></div>');
            htm.push('<label id="chooseLabel" style="position:absolute; top:50px; left:20px; height: 30px">请选择专题字段：<select id="mySelect"><option>面积</option><option>人口</option><option>GDP</option><option>收入</option></select></label>');
            layer.open({
                type: 1,
                title: "中国专题图",
                btn: ['确定', '取消'],
                area: ['320px', '180px'],
                shade: 0,
                content: htm.join(""),
                yes: function (index, layero) {
                    if (allentities) {
                        $("#chart").empty();
                        allentities.removeAll()
                    }
                    if (promise) {
                        viewer.dataSources.removeAll()
                    }
                    var loadThematic = new LoadJSON(viewer);
                    var radios = document.getElementsByName("layerCustomDentify");
                    for (var i = 0; i < radios.length; i++) {
                        if (radios[i].checked) {
                            if (radios[i].id == "Default") {
                                loadThematic.loadDefault()
                            } else if (radios[i].id == "Basic") {
                                loadThematic.loadBasic()
                            } else {
                                loadThematic.loadCustom()
                            }
                        }
                    }
                },
                end: function () {
                    if (allentities) {
                        $("#chart").empty();
                        allentities.removeAll();
                        viewer.entities.removeAll();
                        viewer.dataSources.removeAll()
                    }
                    if (promise) {
                        viewer.dataSources.removeAll()
                    }
                }
            })
        } else if (f.id == "ztt2_id") {
            layer.closeAll();
            var htm = [];
            htm.push(' <label id="country" style="position:absolute; top:10px; left:10%; height: 30px">地区：<span id="countryID_value_id"></span></label>');
            htm.push(' <label id="year" style="position:absolute; top:30px; left:10%; height: 30px"><span id="year_value_id"></span>年：</label>');
            htm.push(' <label id="lifeExpectancy" style="position:absolute; top:50px; left:10%; height: 30px">预期寿命：<span id="lifeExpectancy_value_id"></span></label>');
            htm.push(' <label id="income" style="position:absolute; top:70px; left:10%; height: 30px">收入：<span id="income_value_id"></span></label>');
            htm.push(' <label id="population" style="position:absolute; top:90px; left:10%; height: 30px">人口：<span id="population_value_id"></span></label>');
            layer.open({
                type: 1,
                title: "全球健康财富分布图",
                btn: ['确定', '取消'],
                area: ['240px', '200px'],
                shade: 0,
                content: htm.join(""),
                yes: function (index, layero) {
                    if (allentities) {
                        $("#chart").empty();
                        allentities.removeAll()
                    }
                    if (promise) {
                        viewer.dataSources.removeAll()
                    }
                    new InitChart();
                    new Histogram(viewer);
                    viewer.camera.flyTo({
                        destination: Cesium.Rectangle.fromDegrees(0, -80, 180, 80),
                        duration: 6
                    })
                },
                end: function () {
                    if (allentities) {
                        $("#chart").empty();
                        allentities.removeAll()
                    }
                    if (promise) {
                        viewer.dataSources.removeAll()
                    }
                    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK
                }
            })
        } else if (f.id == "ztt3_id") {
            var htm = [];
            htm.push(' <label id="ColorBand" style="position:absolute; top:20px; left:11%; height: 30px">颜色带：</label>');
            htm.push(' <img style="position:absolute; top:22px; left:37%; height: 15px" src="SourceData/ModelData/images/颜色带.png" />');
            htm.push('<div style="margin: 50px;"><span style="position: absolute;left:10%; height: 30px" >是否生成标注：</span>');
            htm.push('<input type="checkbox" name="vehicle" style="position: absolute; left: 117px;" id="label_id" checked="checked" /></div>');
            layer.open({
                type: 1,
                title: "四川省技术可开发量",
                btn: ['确定', '取消'],
                area: ['260px', '160px'],
                shade: 0,
                content: htm.join(""),
                yes: function (index, layero) {
                    if (allentities) {
                        $("#chart").empty();
                        allentities.removeAll()
                    }
                    if (promise) {
                        viewer.dataSources.removeAll()
                    }
                    var loadThematic = new LoadJSON(viewer);
                    var ischeck = $("[name='vehicle']").attr("checked");
                    if (ischeck == "checked") {
                        loadThematic.loadSCBasin(true)
                    } else {
                        loadThematic.loadSCBasin(false)
                    }
                },
                end: function () {
                    if (allentities) {
                        $("#chart").empty();
                        allentities.removeAll()
                    }
                    if (promise) {
                        viewer.dataSources.removeAll()
                    }
                    viewer.entities.removeAll();
                    viewer.dataSources.removeAll()
                }
            });
        } else if (f.id == "ztt4_id") {
            SCAQIDATA.init(viewer)
        } else if (f.id == "ztt5_id") {
            addocean();
        }
    });
    $('#ultoolDiv dd').click(function () {
        var t = this
    });
    $('#layerinit_id').click(function () {
        layer.closeAll();
        flytochina(viewer)
    });
    $('#clear_id').click(function () {
        layer.closeAll();
        viewer.entities.removeAll();
        viewer.dataSources.removeAll();
        $("#chart").empty();
        viewer.scene.primitives.removeAll();
    })
});

function initViewer() {
    var tian1 = new TDTWMTSImageProvider('http://t{l}.tianditu.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles', false, 1, 18);
    var tian2 = new TDTWMTSImageProvider('http://t{l}.tianditu.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles', false, 1, 18);
    var myTile = new TDTWMTSImageProvider('http://192.168.0.12:802/{z}/{x}/{y}.jpg', false, 1, 18);
    var imageprovider = new Cesium.ProviderViewModel({
        name: "谷歌影像",
        tooltip: "谷歌影像",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            //var googleimagery = new WMTSImageryProvider('http://www.google.cn/maps/vt?lyrs=s@198&gl=en&x={x}&y={y}&z={z}', true, { alpha: 1 }); //加载图像
            //return new GoogleImageryProvider('http://web.earthg.cn/gettileimage?x={x}&y={y}&z={z}', true, 1, 18, {
            //    alpha: 1
            //})
            return new WMTSImageryProvider('http://www.google.cn/maps/vt?lyrs=s@198&gl=en&x={x}&y={y}&z={z}', true, { alpha: 1 }) //加载图像
            //return new WMTSImageryProvider('http://192.168.0.12:802/{x}/{y}/{z}.jpg', true, { alpha: 1 }) //加载图像
            //return myTile
        }
    });
    var imgarcgisprovider = new Cesium.ProviderViewModel({
        name: "ArcGIS影像底图",
        tooltip: "ArcGIS影像底图",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            var esri = new Cesium.ArcGisMapServerImageryProvider({
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
            });
            return esri
        }
    });
    var imgarcgisprovider1 = new Cesium.ProviderViewModel({
        name: "ArcGIS基础底图",
        tooltip: "ArcGIS基础底图",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            var esri = new Cesium.ArcGisMapServerImageryProvider({
                url: 'http://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer'
            });
            return esri
        }
    });
    var imageprovider1 = new Cesium.ProviderViewModel({
        name: "天地图矢量",
        tooltip: "天地图矢量",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            return tian1
        }
    });

    var imageprovider2 = new Cesium.ProviderViewModel({
        name: "天地图影像",
        tooltip: "天地图影像",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            return tian2
        }
    });
    var imageprovider3 = new Cesium.ProviderViewModel({
        name: "离线图像",
        tooltip: "离线加载图像",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            return new WMTSImageryProvider(ipConfig + ':2000/getImage?z={z}&y={y}&x={x}', true, { alpha: 1 });
        }
    });
    var _0 = new Cesium.CesiumTerrainProvider({
        url: 'http://112.124.3.27:3000/Dem',
        isGoogleCustom: true
    });
    var localterrainprovider = new Cesium.ProviderViewModel({
        name: "谷歌地球DEM",
        tooltip: "谷歌地球DEM",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            return _0
        }
    });
    var localterrainprovider1 = new Cesium.ProviderViewModel({
        name: "Cesium地形",
        tooltip: "Cesium地形",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            return new Cesium.CesiumTerrainProvider({
                //url: 'https://assets.agi.com/stk-terrain/world'
                url: 'http://112.124.3.27:3000/Dem',
                //url: 'http://assets.agi.com/stk-terrain/v1/tilesets/ArticDEM/tiles'
                requestVertexNormals: true
            })
        }
    });
    var localterrainprovider2 = new Cesium.ProviderViewModel({
        name: "PAMAP地形",
        tooltip: "PAMAP地形",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            return new Cesium.CesiumTerrainProvider({
                url: '//assets.agi.com/stk-terrain/v1/tilesets/PAMAP/tiles'
            })
        }
    });
    var localterrainprovider3 = new Cesium.ProviderViewModel({
        name: "基础地形",
        tooltip: "基础地形地形",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            return new Cesium.EllipsoidTerrainProvider()
        }
    });
    var localterrainprovider4 = new Cesium.ProviderViewModel({
        name: "离线高程",
        tooltip: "离线叠加高程",
        iconUrl: "/Images/serverlayer.png",
        creationFunction: function () {
            return new Cesium.CesiumTerrainProvider({ url: ipConfig + ':2001/dem', requestVertexNormals: true }); //离线 叠加高程
        }
    });
    var labellayer = new TDTWMTSImageProvider('http://t{l}.tianditu.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles', false, 1, 16, {
        alpha: 0
    });
    var tiandituProviderPlaceName = new Cesium.WebMapTileServiceImageryProvider({
        url: 'http://t0.tianditu.com/cia_w/wmts',
        layer: 'cia',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'w', //注意web墨卡托此时是w
        maximumLevel: 19,
        credit: new Cesium.Credit('天地图')
    });

    var imageprovider_my = new WMTSImageryProvider('http://www.google.cn/maps/vt?lyrs=s@198&gl=en&x={x}&y={y}&z={z}', true, { alpha: 1 }); //离线 加载图像
    var localterrainprovider_my = new Cesium.CesiumTerrainProvider({ url: 'http://112.124.3.27:3000/Dem', requestVertexNormals: true }); //离线 叠加高程
    
    viewer = new Cesium.Viewer('cesiumContainer', {
        timeline: false, //是否显示时间轴
        sceneModePicker: false, //是否显示3D/2D选择器
        baseLayerPicker: true, //是否显示图层选择器
        geocoder: false, //是否显示geocoder小器件，右上角查询按钮
        //imageryProvider: imageprovider_my,
        //terrainProvider: localterrainprovider_my,
        //imageryProviderViewModels: [imageprovider, imageprovider1],
        //terrainProviderViewModels: [localterrainprovider, localterrainprovider1],
        imageryProviderViewModels: [imageprovider, imageprovider1, imageprovider2, imgarcgisprovider, imgarcgisprovider1, imageprovider3], //可供BaseLayerPicker选择的图像图层ProviderViewModel数组
        terrainProviderViewModels: [localterrainprovider, localterrainprovider1, localterrainprovider2, localterrainprovider3, localterrainprovider4], //可供BaseLayerPicker选择的地形图层ProviderViewModel数组
        selectedImageryProviderViewModel: imageprovider, //当前图像图层的显示模型，仅baseLayerPicker设为true有意义
        selectedTerrainProviderViewModel: localterrainprovider1, //当前地形图层的显示模型，仅baseLayerPicker设为true有意义
        scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
        animation: true, //是否创建动画小器件，左下角仪表
        navigationHelpButton: false, //是否显示右上角的帮助按钮
        homeButton: false, //是否显示Home按钮
        infoBox: false, //是否显示信息框
        fullscreenButton: false, //是否显示全屏按钮
        showRenderLoopErrors: false, //如果设为true，将在一个HTML面板中显示错误信息
        fullscreenElement: document.documentElement,//全屏时渲染的HTML元素,
        mapProjection: new Cesium.WebMercatorProjection(),//地图投影体系
    });
    //viewer = new Cesium.Viewer('cesiumContainer', {
    //    timeline: false, //是否显示时间轴
    //    sceneModePicker: false, //是否显示3D/2D选择器
    //    baseLayerPicker: false, //是否显示图层选择器
    //    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    //    imageryProvider: imageprovider_my,
    //    terrainProvider: localterrainprovider_my,
    //    scene3DOnly: false,
    //    animation: false,
    //    infoBox: false,
    //    clock: new Cesium.Clock(),
    //    fullscreenButton: false,
    //    mapProjection: new Cesium.WebMercatorProjection()
    //});
    viewer.scene.imageryLayers.addImageryProvider(tiandituProviderPlaceName);
    viewer.scene.globe.depthTestAgainstTerrain = true;

    var CesiumEditor = new CesiumEditManger(viewer);
    CesiumEditor.init();
    flytochina(viewer);
    showskyBox(viewer);

    $('.cesium-viewer-bottom').hide();
    $('.cesium-viewer-fullscreenContainer').hide();
    $('.cesium-viewer-animationContainer').hide()
}
function showskyBox(viewer) {
    viewer.scene.skyBox = new Cesium.SkyBox({
        sources: {
            positiveX: '../Build/CesiumUnminified/Assets/Textures/SkyBox/tycho2t3_80_px.jpg',
            negativeX: '../Build/CesiumUnminified/Assets/Textures/SkyBox/tycho2t3_80_mx.jpg',
            positiveY: '../Build/CesiumUnminified/Assets/Textures/SkyBox/tycho2t3_80_py.jpg',
            negativeY: '../Build/CesiumUnminified/Assets/Textures/SkyBox/tycho2t3_80_my.jpg',
            positiveZ: '../Build/CesiumUnminified/Assets/Textures/SkyBox/tycho2t3_80_pz.jpg',
            negativeZ: '../Build/CesiumUnminified/Assets/Textures/SkyBox/tycho2t3_80_mz.jpg'
        }
    });
    viewer.scene.skyAtmosphere = new Cesium.SkyAtmosphere();
    viewer.scene.sun = new Cesium.Sun()
}
function flytochina(viewer) {
    viewer.camera.flyTo({
        destination: Cesium.Rectangle.fromDegrees(80, 22, 130, 50),
        duration: 8
    })
}
function Positions(txt) {
    var scene = viewer.scene;
    var array = txt.split(",");
    scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(array[0], array[1], 5000.0)
    });
}
function addfullscreenListener() {
    var fullscreen = screenfull;
    if (fullscreen.enabled) {
        document.addEventListener(fullscreen.raw.fullscreenchange, function () {
            $('.fullscreen').html('<a href="javascript:void(0)" class="toolbg" id="toolType"> ' + (fullscreen.isFullscreen ? '退出全屏' : '全屏') + '</a>')
        })
    }
    $(document).on('keydown', function (e) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 122) {
            e.preventDefault();
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
            if (typeof rfs != "undefined" && rfs) {
                rfs.call(el)
            } else if (typeof window.ActiveXObject != "undefined") {
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}")
                }
            }
            document.addEventListener("webkitfullscreenchange", function () {
                if (document.webkitIsFullScreen) {
                    $('.fullscreen').html('<a href="javascript:void(0)" class="toolbg" id="toolType">退出全屏</a>')
                } else {
                    $('.fullscreen').html('<a href="javascript:void(0)" class="toolbg" id="toolType">全屏</a>')
                }
            }, false);
            document.addEventListener("fullscreenchange", function () {
                if (document.fullscreen) {
                    $('.fullscreen').html('<a href="javascript:void(0)" class="toolbg" id="toolType">退出全屏</a>')
                } else {
                    $('.fullscreen').html('<a href="javascript:void(0)" class="toolbg" id="toolType">全屏</a>')
                }
            }, false);
            document.addEventListener("mozfullscreenchange", function () {
                if (document.mozFullScreen) {
                    $('.fullscreen').html('<a href="javascript:void(0)" class="toolbg" id="toolType">退出全屏</a>')
                } else {
                    $('.fullscreen').html('<a href="javascript:void(0)" class="toolbg" id="toolType">全屏</a>')
                }
            }, false);
            document.addEventListener("msfullscreenchange", function () {
                if (document.msFullscreenElement) {
                    $('.fullscreen').html('<a href="javascript:void(0)" class="toolbg" id="toolType">退出全屏</a>')
                } else {
                    $('.fullscreen').html('<a href="javascript:void(0)" class="toolbg" id="toolType">全屏</a>')
                }
            }, false)
        }
    })
}

/**
 * 更换点图标
 */
var changeIcon = function () {
    //显示点图标面板
    $("#point-style-edit").show();
    $("#map-marking-panel").hide();
    var obj = document.getElementById('point-style-edit');
    //给每个li绑定事件
    for (var i = 0; i < obj.children[0].children.length; i++) {
        obj.children[0].children[i].onclick = function () {
            var img = this.children[0];
            document.getElementById('pointIcon').src = img.src;
            $("#point-style-edit").hide();
            $("#map-marking-panel").show();
        }
    }
}

/**
 * 更换点图标返回
 */
var changeIconBack = function () {
    $("#point-style-edit").hide();
    $("#map-marking-panel").show();
}
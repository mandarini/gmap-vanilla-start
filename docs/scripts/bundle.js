"use strict";!function r(l,s,i){function c(t,e){if(!s[t]){if(!l[t]){var a="function"==typeof require&&require;if(!e&&a)return a(t,!0);if(g)return g(t,!0);var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}var n=s[t]={exports:{}};l[t][0].call(n.exports,function(e){return c(l[t][1][e]||e)},n,n.exports,r,l,s,i)}return s[t].exports}for(var g="function"==typeof require&&require,e=0;e<i.length;e++)c(i[e]);return c}({1:[function(e,t,a){Object.defineProperty(a,"__esModule",{value:!0});var o=e("./map"),n=e("./drawing");a.loadAllDrawingButtons=function(){l.forEach(function(e){!function(t,e,a){var o=document.createElement("img");o.id="".concat(t.name,"-control"),o.tabIndex=0,o.setAttribute("role","button"),"clear"===a?(o.src="assets/img/".concat(t.img,".svg"),o.addEventListener("click",function(e){n.clearAll()})):(o.src="assets/img/".concat(t.img,".png"),o.addEventListener("click",function(e){n.draw(t.name)}));e.appendChild(o)}(e,r,"clear"===e.name?"clear":"draw")})},a.listenersForControlButtons=function(){document.getElementById("city-lon").addEventListener("click",function(e){o.city("lon")}),document.getElementById("city-man").addEventListener("click",function(e){o.city("man")}),document.getElementById("lights").addEventListener("click",function(e){o.changeType()}),document.getElementById("masts-toggle").addEventListener("click",function(e){o.toggleMasts()}),document.getElementById("cluster-toggle").addEventListener("click",function(e){o.toggleClusters()}),document.getElementById("heatmap-toggle").addEventListener("click",function(e){o.toggleHeatmap()}),document.getElementById("heatmap-range").addEventListener("change",function(e){var t=e.target;o.changeHeatmapRadius(parseInt(t.value))}),document.getElementById("cluster-range").addEventListener("change",function(e){var t=e.target;o.changeCluster(parseInt(t.value))})};var r=document.getElementById("drawingControls"),l=[{name:"marker",img:"point"},{name:"polygon",img:"polygon"},{name:"square",img:"square"},{name:"circle",img:"circle"},{name:"polyline",img:"line"},{name:"cat",img:"cat"},{name:"pan",img:"pan"},{name:"save",img:"save"},{name:"clear",img:"clear"}]},{"./drawing":3,"./map":6}],2:[function(e,t,a){Object.defineProperty(a,"__esModule",{value:!0}),a.directionCalculator=function(e){var t=new google.maps.DirectionsService,a=new google.maps.DirectionsRenderer;function o(){!function(e,a,o,n,r){n.value&&0<n.value.length&&r.value&&0<r.value.length&&e.route({origin:{query:n.value},destination:{query:r.value},travelMode:google.maps.TravelMode.DRIVING},function(e,t){"OK"===t?(a.setDirections(e),o.getDistanceMatrix({origins:[n.value],destinations:[r.value],travelMode:google.maps.TravelMode.DRIVING,unitSystem:google.maps.UnitSystem.METRIC},function(e,t){"OK"!==t?alert("Error was: "+t):document.getElementById("distance").textContent=e.rows[0].elements[0].distance.text+" "+e.rows[0].elements[0].duration.text})):window.alert("Directions request failed due to "+t)})}(t,a,n,r,l)}a.setMap(e);var n=new google.maps.DistanceMatrixService,r=document.getElementById("origin"),l=document.getElementById("destination"),s=new google.maps.places.Autocomplete(r),i=new google.maps.places.Autocomplete(l);s.setFields(["address_components","geometry","icon","name"]),i.setFields(["address_components","geometry","icon","name"]),s.addListener("place_changed",function(){var e=s.getPlace();o(),e.geometry||window.alert("No details available for input: '"+e.name+"'")}),i.addListener("place_changed",function(){var e=i.getPlace();o(),e.geometry||window.alert("No details available for input: '"+e.name+"'")})}},{}],3:[function(e,t,a){var n,r;Object.defineProperty(a,"__esModule",{value:!0});var l=[];a.listenForDrawing=function(o){(n=new google.maps.drawing.DrawingManager({drawingMode:null,drawingControl:!1})).setMap(o),r=new google.maps.Data,n.addListener("overlaycomplete",function(e){switch(l.push(e.overlay),e.overlay.addListener("rightclick",function(){e.overlay.setMap(null)}),e.type){case"polygon":r.add(new google.maps.Data.Feature({geometry:new google.maps.Data.Polygon([e.overlay.getPath().getArray()])})),o.data.add(new google.maps.Data.Feature({geometry:new google.maps.Data.Polygon([e.overlay.getPath().getArray()])}));break;case"rectangle":var t=e.overlay.getBounds(),a=[t.getSouthWest(),{lat:t.getSouthWest().lat(),lng:t.getNorthEast().lng()},t.getNorthEast(),{lng:t.getSouthWest().lng(),lat:t.getNorthEast().lat()}];r.add(new google.maps.Data.Feature({geometry:new google.maps.Data.Polygon([a])})),o.data.add(new google.maps.Data.Feature({geometry:new google.maps.Data.Polygon([a])}));break;case"polyline":r.add(new google.maps.Data.Feature({geometry:new google.maps.Data.LineString(e.overlay.getPath().getArray())})),o.data.add(new google.maps.Data.Feature({geometry:new google.maps.Data.LineString(e.overlay.getPath().getArray())}));break;case"circle":r.add(new google.maps.Data.Feature({properties:{radius:e.overlay.getRadius()},geometry:new google.maps.Data.Point(e.overlay.getCenter())})),o.data.add(new google.maps.Data.Feature({properties:{radius:e.overlay.getRadius()}}));break;case"marker":r.add(new google.maps.Data.Feature({geometry:new google.maps.Data.Point(e.overlay.getPosition())}));break;default:console.log("end")}})},a.draw=function(e){switch(e){case"marker":n.setDrawingMode(google.maps.drawing.OverlayType.MARKER);var t={url:"assets/img/point.png",scaledSize:new google.maps.Size(30,30)};n.setOptions({markerOptions:{icon:t,clickable:!0,draggable:!0}});break;case"cat":n.setDrawingMode(google.maps.drawing.OverlayType.MARKER);var a={url:"assets/img/cat.png",scaledSize:new google.maps.Size(70,70)};n.setOptions({markerOptions:{icon:a,clickable:!0,draggable:!0}});break;case"polygon":n.setDrawingMode(google.maps.drawing.OverlayType.POLYGON),n.setOptions({polygonOptions:{fillColor:"#9c4d4f",fillOpacity:.5,strokeWeight:2,strokeColor:"#401619",clickable:!0,editable:!0,draggable:!0}});break;case"square":n.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE),n.setOptions({rectangleOptions:{fillColor:"#fff82e",fillOpacity:.5,strokeWeight:2,strokeColor:"#c8a535",clickable:!0,editable:!0,draggable:!0}});break;case"polyline":n.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE),n.setOptions({polylineOptions:{strokeWeight:2,strokeColor:"#00b801",clickable:!0,editable:!0,draggable:!0}});break;case"circle":n.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE),n.setOptions({circleOptions:{fillColor:"#00b801",fillOpacity:.5,strokeWeight:2,strokeColor:"#00b801",clickable:!0,editable:!0,draggable:!0}});break;case"pan":n.setDrawingMode(null);break;case"save":n.setDrawingMode(null),r.toGeoJson(function(e){console.log(e),function(e,t){var a=document.createElement("a"),o=new Blob([e],{type:"text/plain"});a.href=URL.createObjectURL(o),a.download=t,a.click()}(JSON.stringify(e),"drawingData.txt")});break;default:n.setDrawingMode(null)}},a.clearAll=function(){l.map(function(e){e.setMap(null)}),r.setMap(null),r=new google.maps.Data,l=[]}},{}],4:[function(e,t,a){Object.defineProperty(a,"__esModule",{value:!0}),a.customGradient=["rgba(0, 255, 255, 0)","rgba(0, 255, 255, 1)","rgba(0, 191, 255, 1)","rgba(0, 127, 255, 1)","rgba(0, 63, 255, 1)","rgba(0, 0, 255, 1)","rgba(0, 0, 223, 1)","rgba(0, 0, 191, 1)","rgba(0, 0, 159, 1)","rgba(0, 0, 127, 1)","rgba(63, 0, 91, 1)","rgba(127, 0, 63, 1)","rgba(191, 0, 31, 1)","rgba(255, 0, 0, 1)"]},{}],5:[function(e,t,a){Object.defineProperty(a,"__esModule",{value:!0});var o,n=e("./mapscript"),r=e("./clickListeners"),l=e("./map");function s(){o=new google.maps.Map(document.getElementById("map"),{zoom:11,scrollwheel:!0,panControl:!1,mapTypeControl:!1,zoomControl:!0,streetViewControl:!1,scaleControl:!0,zoomControlOptions:{style:google.maps.ZoomControlStyle.LARGE,position:google.maps.ControlPosition.RIGHT_BOTTOM}}),l.FunWithMaps(o)}r.loadAllDrawingButtons(),r.listenersForControlButtons(),window.google&&window.google.maps?s():n.loadMapScript("geometry,drawing,visualization,places",function(e){s()})},{"./clickListeners":1,"./map":6,"./mapscript":7}],6:[function(e,t,a){Object.defineProperty(a,"__esModule",{value:!0});var s,i,o,c,g,d=e("./styledMap"),p=e("./drawing"),m=e("./placesSearch"),u=e("./directions"),y=e("./gradient"),n=!0,f=[],r=!1,l=!1,w=!1;function v(e,t){return new google.maps.LatLng(e,t)}a.FunWithMaps=function(e){s=e,i=v(51.561638,-.14);var t=new google.maps.StyledMapType(d.styledMap,{name:"Dark Map"});e.setCenter(i),e.mapTypes.set("dark_map",t),e.setMapTypeId("dark_map");var a=document.getElementById("controls"),o=document.getElementById("legend"),n=document.getElementById("drawingControls"),r=document.getElementById("katlink"),l=document.getElementById("place-search");e.controls[google.maps.ControlPosition.LEFT_TOP].push(a),e.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(o),e.controls[google.maps.ControlPosition.TOP_RIGHT].push(n),e.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(r),e.controls[google.maps.ControlPosition.TOP_CENTER].push(l),u.directionCalculator(e),m.placesSearch(e),p.listenForDrawing(e),function(){new google.maps.Size(40,40);fetch("assets/data/masts.json").then(function(e){return e.json()}).then(function(e){e.data.map(function(e){var t=new google.maps.Marker;new google.maps.InfoWindow,t.addListener("click",function(e){}),f.push(t)})}).catch(function(e){console.log(e,"Error loading asset")})}(),fetch("assets/data/letting.json").then(function(e){return e.json()}).then(function(e){g=e.data;var t=[];g.map(function(e){e[24]&&e[23]&&t.push({location:new google.maps.LatLng(parseFloat(e[24]),parseFloat(e[23])),weight:parseInt(e[15],10)})}),(c=new google.maps.visualization.HeatmapLayer({data:t})).set("gradient",y.customGradient),c.set("radius",40),c.set("opacity",1)}).catch(function(e){console.log(e)})},a.city=function(e){"lon"===e&&s.setCenter(v(51.561638,-.14)),"man"===e&&s.setCenter(v(53.52476717517185,-2.5434842249308414))},a.changeType=function(){n?s.setMapTypeId("roadmap"):s.setMapTypeId("dark_map"),n=!n},a.toggleMasts=function(){r?f.map(function(e){e.setMap(null)}):f.map(function(e){e.setMap(s)}),r=!r},a.toggleClusters=function(){l?o.clearMarkers():(o=new MarkerClusterer(s,f,{imagePath:"assets/img/m"})).setGridSize(10),l=!l},a.toggleHeatmap=function(){w?c.setMap(null):c.setMap(s),w=!w},a.changeHeatmapRadius=function(e){c.set("radius",e)},a.changeCluster=function(e){l=!0,o&&o.clearMarkers(),(o=new MarkerClusterer(s,f,{imagePath:"assets/img/m"})).setGridSize(e)}},{"./directions":2,"./drawing":3,"./gradient":4,"./placesSearch":8,"./styledMap":9}],7:[function(e,t,a){Object.defineProperty(a,"__esModule",{value:!0}),a.loadMapScript=function(e,t){if(!document.getElementById("gmap")){var a=document.createElement("script");a.type="text/javascript",a.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDuMnM4W0JCUyNydC9n3Y_NuXSOdJG4np4",e&&0<e.length&&(a.src=a.src+"&libraries="+e),a.id="gmap",a.addEventListener("load",function(e){t(e)},!1),document.body.appendChild(a)}}},{}],8:[function(e,t,a){Object.defineProperty(a,"__esModule",{value:!0}),a.placesSearch=function(n){var e=document.getElementById("place-input"),r=new google.maps.places.Autocomplete(e);r.bindTo("bounds",n),r.setFields(["address_components","geometry","icon","name"]);var l=new google.maps.Marker({map:n,anchorPoint:new google.maps.Point(0,-29)});r.addListener("place_changed",function(){l.setVisible(!1);var e=r.getPlace();if(e.geometry){e.geometry.viewport?n.fitBounds(e.geometry.viewport):(n.setCenter(e.geometry.location),n.setZoom(17)),l.setPosition(e.geometry.location),l.setVisible(!0);var t=new google.maps.InfoWindow,a=document.getElementById("infowindow-content");t.setContent(a);var o="";e.address_components&&(o=[e.address_components[0]&&e.address_components[0].short_name||"",e.address_components[1]&&e.address_components[1].short_name||"",e.address_components[2]&&e.address_components[2].short_name||""].join(" ")),document.getElementById("place-icon").src=e.icon,document.getElementById("place-name").textContent=e.name,document.getElementById("place-address").textContent=o,t.open(n,l)}else window.alert("No details available for input: '"+e.name+"'")}),document.getElementById("use-strict-bounds").addEventListener("change",function(e){var t=e.target;r.setOptions({strictBounds:t.checked})})}},{}],9:[function(e,t,a){Object.defineProperty(a,"__esModule",{value:!0}),a.styledMap=[{elementType:"geometry",stylers:[{color:"#9a9a9a"}]},{elementType:"labels.text.fill",stylers:[{color:"#111111"}]},{elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#c8c8c8"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{color:"#c8c8c8"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#c8c8c8"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#c8c8c8"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#c8c8c8"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#111111"},{visibility:"simplified"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#c8c8c8"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#111111"}]},{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#aaaaaa"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#999999"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#666666"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#444444"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#111111"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#c8c8c8"}]},{featureType:"transit.line",elementType:"labels.text.fill",stylers:[{color:"#111111"}]},{featureType:"transit.line",elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#c8c8c8"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#222222"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#222222"}]}]},{}]},{},[5]);
//# sourceMappingURL=bundle.js.map
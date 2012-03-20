// Copyright The Workers Ltd. 2012 (theworkers.net)
// @author Ross Cairns
(function (W) {

    /**
     * @namespace W.maps
     **/
    W.maps = {
        version : 1,
        
        staticMap : function (opt) {
        
            ///
            // options
            var width           = opt.width || 100,
                height          = opt.height || 100,
                scale           = opt.scale || 1;
                maptype         = opt.maptype || "roadmap", // roadmap, satellite, hybrid, and terrain
                markerSize      = opt.markerSize || undefined, // tiny, mid, small
                markerColor     = opt.markerColor || undefined,
                markers         = opt.markers || [], //[[50,0], [51,0]]
                callback        = opt.callback,
                sensor          = opt.sensor || "true";
                
            ///
            // private
            
            var baseURL         = "http://maps.googleapis.com/maps/api/staticmap?";
                parameters  = [];
            
            ///
            // utils
            
            this.addParameter= function (name, value) {
                var str = name + "=" + value;
                parameters.push(str);
            };
            
            this.constructMarkers = function () {
                var str = "";
                
                if (!!opt.markerSize) {
                    str += "size:" + markerSize + "|";
                }
                if (!!opt.markerColor) {
                    if (opt.markerColor.slice(0,2) != "0x") {
                        throw "staticMap markerColor must being with 0x";
                    }
                    str += "color:" + markerColor + "|";
                }
                
                $.each(markers, function (index, value) {
                    
                    str += value[0] + "," + value[1];
                    
                    if (index != markers.length-1) { str += "|"; }
                    
                });
                
                return str;
            };
            
            this.constructURL = function () {
                var url = baseURL;
                
                $.each(parameters, function (index, value) {
                    url += value;
                    if (index != parameters.length-1) { url += "&"; }
                    
                });
                
                if (url === baseURL) {
                    throw "no options for W.maps.staticDirectionMap";
                }
                
                return url;
            };
            
        
            this.addParameter("size", width + "x" + height);
            this.addParameter("scale", scale);
            this.addParameter("maptype", maptype);
            this.addParameter("markers", this.constructMarkers());
            this.addParameter("sensor", sensor);
            this.addParameter("maptype", maptype);
    
            
            if (!!callback) {
                
                callback(this.constructURL());
                
            } else {
            
                throw "no callback for W.maps.staticDirectionMap. no point";
                
            }
            
        }
      
      };
    
})(W);


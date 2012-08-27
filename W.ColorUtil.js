////
/// W.ColorUtil
// @author Ross Cairns
(function () {

    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    /*
    // modified from https://raw.github.com/gist/1590079/bb457e888c3b6ce4d16f5e8ebf767bd4302a7bea/gistfile1.js

    W.ColorUtil = {

        version : 0.1,

        hslObjectToRGBObject : function (hsl) {
            return W.ColorUtil.hslToRGBObject(hsl.h, hsl.s, hsl.l);
        },

        hslObjectToHex : function (hsl) {
            return W.ColorUtil.rgbObjectToHex(W.ColorUtil.hslObjectToRGBObject(hsl));
        },

        hslToHex : function (h,s,l) {
            console.log(h,s,l, " = (rbg) ", W.ColorUtil.hslToRGBObject(h, s, l).r, W.ColorUtil.hslToRGBObject(h, s, l).g, W.ColorUtil.hslToRGBObject(h, s, l).b);
            return W.ColorUtil.rgbObjectToHex( W.ColorUtil.hslToRGBObject(h, s, l) );
        },

        rgbToHex : function (r,g,b) {
            return"#"+((256+r<<8|g)<<8|b).toString(16).slice(1);
        },

        rgbObjectToHex : function (rgb) {
            return  W.ColorUtil.rgbToHex(rgb.r, rgb.g, rgb.h);
        },

        hslToRGBObject : function (h, s, l) {
            var m1, m2, hue, r, g, b;
            s /=100;
            l /= 100;
            if (s === 0) {
                r = g = b = (l * 255);
            } else {
                if (l <= 0.5) {
                    m2 = l * (s + 1);
                } else {
                    m2 = l + s - l * s;
                }
                m1 = l * 2 - m2;
                hue = h / 360;
                r = W.ColorUtil.hueToRGB(m1, m2, hue + 1/3);
                g = W.ColorUtil.hueToRGB(m1, m2, hue);
                b = W.ColorUtil.hueToRGB(m1, m2, hue - 1/3);
            }
            return {r: r, g: g, b: b};
        },

        hueToRGB : function (m1, m2, hue) {
            var v;
            if (hue < 0) {
                hue += 1;
            } else if (hue > 1) {
                hue -= 1;
            }
            if (6 * hue < 1) {
                v = m1 + (m2 - m1) * hue * 6;
            } else if (2 * hue < 1) {
                v = m2;
            } else if (3 * hue < 2) {
                v = m1 + (m2 - m1) * (2/3 - hue) * 6;
            } else {
                v = m1;
            }
            return 255 * v;
        },

        rgbStringToHex : function (color) {
            if (color.substr(0, 1) === '#') {
                return color;
            }
            var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color),
                red = parseInt(digits[2], 10),
                green = parseInt(digits[3], 10),
                blue = parseInt(digits[4], 10),
                rgb = blue | (green << 8) | (red << 16);
            return digits[1] + '#' + rgb.toString(16);
        },

        hexToRGBObject : function (hex) {

            if (hex[0] == '#') {
              hex = hex.substr(1, hex.length-1);
            }

            if (hex.length == 6) {
                rgb = [
                    hex[0]+hex[1],
                    hex[2]+hex[3],
                    hex[4]+hex[5]
                ];
            } else if (hex.length == 3) {
                rgb = [
                    hex[0]+hex[0],
                    hex[1]+hex[1],
                    hex[2]+hex[2]
                ];
            }
            else {
                return false;
            }

            return {
                r : parseInt(rgb[0],16),
                g : parseInt(rgb[1],16),
                b : parseInt(rgb[2],16)
            };
        },

        rgbObjectToHSLObject : function (rgb){
            rgb.r /= 255;
            rgb.g /= 255;
            rgb.b /= 255;
            var max = Math.max(rgb.r, rgb.g, rgb.b), min = Math.min(rgb.r, rgb.g, rgb.b);
            var h, s, l = (max + min) / 2;

            if(max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case rgb.r: h = (rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0); break;
                    case rgb.g: h = (rgb.b - rgb.r) / d + 2; break;
                    case rgb.b: h = (rgb.r - rgb.g) / d + 4; break;
                }
                h /= 6;
            }

            return {
                h:Math.floor(h * 360),
                s:Math.floor(s * 100),
                l:Math.floor(l * 100)
            };
        },

        hexToHSLString : function (hex){
            var hsl = W.ColorUtil.rgbObjectToHSLObject(W.ColorUtil.HexToRGBObject(hex));
            return 'hsl('+hsl.h+','+hsl.s+'%,'+hsl.l+'%)';
        },

        conall : function (str){
            var colors = str.match(/#(\w+)/g);
            for (var i = colors.length - 1; i >= 0; i--) {
                str = str.replace(colors[i], W.ColorUtil.HexToRGBObject(colors[i]));
            }
            return str;
        }

    };
    */

  }());
var Mover = function () {

    // Fix Javascript rounding errors
    var rounder = 1e5;
    function round(x) {
        return Math.round(x*rounder)/rounder;
    }

    // Default is identity
    var data = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    // Dump function for debug
    function dump() {
        console.log("------------");
        console.log(this.data[0] + " " + this.data[1] + " " + this.data[2]);
        console.log(this.data[3] + " " + this.data[4] + " " + this.data[5]);
        console.log(this.data[6] + " " + this.data[7] + " " + this.data[8]);
        return this;
    }

    // Internal Multiplication of 2 Matrix
    function multiply(m1, m2) {
        var i, j, k;
        var m3 = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        for(i=0; i<3; i++) {
            for(j=0; j<3; j++) {
                for(k=0; k<3; k++) {
                    m3[i+3*j] += round(m2[i+3*k]*m1[k+3*j]);
                }
            }
        }
        return m3;
    }

    function zero() {
        this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        return this;
    }

    function identity() {
        this.data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        return this;
    }

    function translation(x, y) {
        this.data = [1, 0, x, 0, 1, y, 0, 0, 1];
        return this;
    }

    function translate(x, y, cx, cy) {
        var center = false;
        if(cx || cy)
        {
            cx = cx || 0;
            cy = cy || 0;
            center = true;
        }
        var translation = [1, 0, x, 0, 1, y, 0, 0, 1];
        if(center) {
            this.translate(cx, cy);
        }
        this.data = multiply(this.data, translation);
        if(center) {
            this.translate(-cx, -cy);
        }
        return this;
    }

    function rotation(angle) {
        var rad = angle*Math.PI/180;
        var cos = round(Math.cos(rad));
        var sin = round(Math.sin(rad));
        this.data = [cos, -sin, 0, sin, cos, 0, 0, 0, 1];
        return this;
    }

    function rotate(angle, x, y) {
        var center = false;
        if(x || y)
        {
            x = x || 0;
            y = y || 0;
            center = true;
        }
        var rad = angle*Math.PI/180;
        var cos = round(Math.cos(rad));
        var sin = round(Math.sin(rad));
        var rotation = [cos, -sin, 0, sin, cos, 0, 0, 0, 1];

        if(center) {
            this.translate(x, y);

        }
        this.data = multiply(this.data, rotation);
        if(center) {
            this.translate(-x, -y);
        }
        return this;
    }

    function scaling(s) {
        if(s === 0) {
            s = 1;
        }
        this.data = [1, 0, 0, 0, 1, 0, 0, 0, 1/s];
        return this;
    }

    function scale(s, x, y) {
        var center = false;
        if(x || y)
        {
            x = x || 0;
            y = y || 0;
            center = true;
        }
        if(s === 0) {
            s = 1;
        }
        var scaling = [1, 0, 0, 0, 1, 0, 0, 0, 1/s];

        if(center) {
            this.translate(x, y);
        }
        this.data = multiply(this.data, scaling);
        if(center) {
            this.translate(-x, -y);
        }
        return this;
    }

    function apply(m, n) {

        if(typeof m == 'number') {
            m = [m, n];
        }

        var e = 1;
        if(m.length == 3) {
            e = m[2];
        }

        var x = round(m[0]*this.data[0] + m[1]*this.data[1] + e*this.data[2]);
        var y = round(m[0]*this.data[3] + m[1]*this.data[4] + e*this.data[5]);
        var w = round(m[0]*this.data[6] + m[1]*this.data[7] + e*this.data[8]);

        if(w !== 0) {
            return [x/w, y/w];
        }
        else {
            return [x, y];
        }
    }

    function getRotation() {
        var rad = this.data[0];
        if(this.data[0] > 1) {
            rad = 1;
        }
        else {
            if(this.data[0] < -1) {
                rad = -1;
            }
        }
        var angle = round(Math.acos(rad) * 180 / Math.PI);
        if(this.data[3] < 0) {
            angle = -angle;
        }
        return angle;
    }

    function getTranslation() {
        if(this.data[8] !== 0 ) {
            return [this.data[2]/this.data[8], this.data[5]/this.data[8]];
        }
        return [this.data[2], this.data[5]];
    }

    function getTranslationX() {
        if(this.data[8] !== 0 ) {
            return this.data[2]/this.data[8];
        }
        return this.data[2];
    }

    function getTranslationY() {
        if(this.data[8] !== 0 ) {
            return this.data[5]/this.data[8];
        }
        return this.data[5];
    }

    function getScaling() {
        return 1/this.data[8];
    }

    function compose() {
        var args = Array.prototype.slice.call(arguments);
        var i;
        for(i=0; i<args.length; i++) {
            this.data = multiply(this.data, args[i].data);
        }
        return this;
    }

    function css() {
        var str = '';
        str += 'translate('+ this.getTranslationX() + 'px, ' + this.getTranslationY() + 'px) ';
        str += 'rotate(' +  this.getRotation() +'deg) ';
        str += 'scale('+ this.getScaling() + ', ' + this.getScaling() + ') ';
        return str;
    }

    return {
        dump:dump,
        data:data,

        // Creation
        zero:zero,
        identity:identity,
        rotation:rotation,
        translation:translation,
        scaling:scaling,

        // Accessors
        getRotation:getRotation,
        getTranslation:getTranslation,
        getTranslationX:getTranslationX,
        getTranslationY:getTranslationY,
        getScaling:getScaling,
        css:css,

        // Apply transformation to a 2D point
        apply:apply,

        // Combine
        rotate:rotate,
        translate:translate,
        scale:scale,

        // Compose Transforms
        compose:compose
    };
};

var Boxer = function (width, height) {
    var me = Mover();
    var boxes = [];

    width = width || 0;
    height = height || 0;
    var w = width;
    var h = height;
    var centerX = w/2;
    var centerY = h/2;

    function push(littleBox) {
        this.boxes.push(littleBox);
        this.box();
        return this;
    }

    function computeBB(current, newb) { // Compute Bounding Box from 2 BB
        if(current[0] > newb[0]) {
            current[0] = newb[0];
        }
        if(current[1] > newb[1]) {
            current[1] = newb[1];
        }
        if(current[2] < newb[2]) {
            current[2] = newb[2];
        }
        if(current[3] < newb[3]) {
            current[3] = newb[3];
        }
        return current;
    }

    function box() {
        var current = [0, 0, 0, 0];

        if(this.boxes.length === 0) {
            // Object
            var m = this.me;
            var p = [];

            p.push(m.apply(0,0)); // top left
            p.push(m.apply(this.width,0)); // top rigth
            p.push(m.apply(0,this.height)); // bottom left
            p.push(m.apply(this.width,this.height)); // bottom right

            var init = true;
            for(var i in p) {
                var b = [ p[i][0], p[i][1], p[i][0], p[i][1] ];
                if(init) {
                    current = b;
                    init = false;
                }
                else {
                    current = computeBB(current, b);
                }
            }
        }
        else {
            // Container
            var init = true;
            for(var i in this.boxes) {
                var b = this.boxes[i].box();
                if(init) {
                    current = b;
                    init = false;
                }
                else {
                    current = computeBB(current, b);
                }
            }
        }
        this.centerX = current[0] + (current[2] - current[0])/2;
        this.centerY = current[1] + (current[3] - current[1])/2;
        return current;
    }

    function css(i) {
        var m = this.mover();
        if(typeof i == 'number') {
            var m2 = this.boxes[i].mover();
            m = Mover().compose(m, m2);
        }
        return m.css();
    }

    function translate(x, y) {
        this.me = Mover().translate(x,y).compose(this.me);
        return this;
    }

    function rotate(angle) {
        if(this.boxes.length !== 0) {
            this.box();
        }
        this.me.rotate(angle, this.centerX, this.centerY);
        return this;
    }

    function scale(s) {
        if(this.boxes.length !== 0) {
            this.box();
        }
        this.me.scale(s/100, this.centerX, this.centerY);
        return this;
    }

    function getMover() {
        return this.me;
    }

    return {
        me:me,
        boxes:boxes,
        push:push,
        width:w,
        height:h,
        centerX: centerX,
        centerY: centerY,
        translate:translate,
        rotate:rotate,
        scale:scale,
        css:css,
        mover:getMover,
        box:box
    };
};


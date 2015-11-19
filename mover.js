var Mover = function () {
    
    // Fix Javascript rounding errors
    var rounder = 1e5;
    
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
                    m3[i+3*j] += m2[i+3*k]*m1[k+3*j];
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

    function translate(x, y) {
        var translation = [1, 0, x, 0, 1, y, 0, 0, 1];
        this.data = multiply(this.data, translation);
        return this;
    }
    
    function rotation(angle) {
        var rad = angle*Math.PI/180;
        var cos = Math.round(Math.cos(rad)*rounder)/rounder;
        var sin = Math.round(Math.sin(rad)*rounder)/rounder;
        this.data = [cos, -sin, 0, sin, cos, 0, 0, 0, 1];
        return this;
    }
    
    function rotate(angle) {
        var rad = angle*Math.PI/180;
        var cos = Math.round(Math.cos(rad)*rounder)/rounder;
        var sin = Math.round(Math.sin(rad)*rounder)/rounder;
        var rotation = [cos, -sin, 0, sin, cos, 0, 0, 0, 1];
        this.data = multiply(this.data, rotation);
        return this;
    }
    
    function scaling(s) {
        this.data = [1, 0, 0, 0, 1, 0, 0, 0, s];
        return this;
    }
    
    function scale(s) {
        if(s === 0) {
            s = 1;
        }
        var scaling = [1, 0, 0, 0, 1, 0, 0, 0, 1/s];
        this.data = multiply(this.data, scaling);
        return this;
    }
    
    function apply(m, n) {
        if(typeof m == 'number') {
            console.log(m);
            m = [m, n];
            console.log(m);
        }
        
        var e = 1;
        if(m.length == 3) {
            e = m[2];
        }
        
        var x = m[0]*this.data[0] + m[1]*this.data[1] + e*this.data[2];
        var y = m[0]*this.data[3] + m[1]*this.data[4] + e*this.data[5];
        var w = m[0]*this.data[6] + m[1]*this.data[7] + e*this.data[8];
        
        if(m.length == 3) {
            return [x, y, w];
        }
        else {
            if(w !== 0) {
                return [x/w, y/w];
            }
            else {
                return [x, y];
            }
        }
    }

    function getRotation() {
        var angle = Math.acos(this.data[0]) * 180 / Math.PI;
        if(this.data[3] < 0) {
            angle = -angle;
        }
        return angle;
    }

    function getTranslation() {
        if(this.data[8] === 0) {
            return [this.data[2], this.data[5]];
        }
        else {
            return [this.data[2]/this.data[8], this.data[5]/this.data[8]];
        }
    }

    function getTranslationX() {
        if(this.data[8] === 0) {
            return this.data[2];
        }
        else {
            return this.data[2]/this.data[8];
        }
    }

    function getTranslationY() {
        if(this.data[8] === 0) {
            return this.data[5];
        }
        else {
            return this.data[5]/this.data[8];
        }
    }

    function getScaling() {
        if(this.data[8] !== 0) {
            return 1/this.data[8];
        }
        return this.data[8];
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

      // Apply transformation to a 2D point
      apply:apply,
      
      // Combine
      rotate:rotate,
      translate:translate,
      scale:scale
  };
};

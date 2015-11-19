// Copy/Paste from http://stackoverflow.com/questions/20256760/javascript-console-log-to-html 
// Arun P Johny
(function () {
    var old = console.log;
    var logger = document.getElementById('log');
    
    if(logger) {
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
    }
    else {
        alert("Can not found log");
    }
    
})();

// Testing
console.log("Zero");
Mover().zero().dump();

console.log("Identity");
Mover().identity().dump();

console.log("Rotation 90");
Mover().rotation(90).dump();

console.log("Translation 1, 1");
Mover().translation(1, 1).dump();

console.log("Scaling 2");
Mover().scaling(2).dump();

console.log("============ Transforms ============");
// Applying translation Mover
console.log("Translate 1,1 by 1,1");
var p = Mover().translation(1, 1).apply([1,1]);
console.log(p + " == 2,2");

console.log("Translate 1,1,0.5 by 1,1");
// Applying translation Mover in homogeneous coordinates
var p2 = Mover().translation(1, 1).apply([1,1,0.5]);
console.log(p2 + " == 1.5,1.5,0.5 (3,3)");

console.log("Chained transformation that should be translate 2,2");
// Build a chained transformation
var l1 = Mover().translate(1, 1).rotate(-90).translate(-1,1).rotate(90).dump();

console.log("Apply to 1,0");
// Apply chained transformation
var p3 = l1.apply([1,0]);
console.log(p3 + " == 3,2");

// Add a scale
console.log("Add a scale 2 (Homotethy => *2 )");
l1.scale(2).dump();

console.log("Chained transformation should be now translate by 2,2, then local homothety *2")
// And apply it
var p4 = l1.apply(1,0);
console.log(p4 + " == 4,2");
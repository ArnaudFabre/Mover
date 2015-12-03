var red = document.getElementById('red');
var blue = document.getElementById('blue');

var l1, l2, l3, l4, p;

window.onload = function () {
    l1 = Boxer(red.width, red.height);
    l2 = Boxer(blue.width, blue.height);
    l3 = Boxer(red.width, red.height);
    l3t = Boxer(red.width, red.height);
    p = Boxer().push(l1).push(l2);
};

function update() {
    // Test 3 combinations
    var m1 = l1.mover();
    var g = p.mover();
    var m2 = l3.mover();
    var t = l3t.mover();
    red.style.transform = Mover().compose(t, g, m1, m2).css();
    blue.style.transform = p.css(1);
    
    /*
    // Test Boxer of Boxers
    red.style.transform = p.css(0);
    blue.style.transform = p.css(1);
    */
    
    /*
    // Test Boxer
    red.style.transform = l1.css();
    blue.style.transform = l2.css();
    */
}

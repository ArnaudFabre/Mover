# Mover

Mover Framework allows to combine 2D transformations like 
* translations
* rotations
* homotheties
    
It is based on homogeneous coordinates that allows to keep in a unique 3x3 matrix the combination of multiple plane transformations.

A basic abstraction of boxes called Boxer is also provided.

## Examples
Create a new mover instance:
```
    var myMove = Mover();
```

Translate it by 1 in x direction and 2 in y direction :
```
    myMove.translate(1, 2);
```

Rotate it by 90 degrees:
```   
    myMove.rotate(90);
    myMove.rotate(90, center_x, center_y);
```
Scale it by 2 in x and y direction (origin is always local 0,0) :
```
    myMove.scale(2);
```
    
Apply transformation to a 2D point
```
    var newPosition = myMove.apply([1,1]);
    newPosition = myMove.apply(1,0);
```
    
You can of course chain transformations
```
    var newPosition = Mover().translate(1,2).rotate(90).scale(2).apply([1,1]);
```

You can also access translation, rotation and scaling factors.
```
    var angleInDegrees = myMove.getRotation();
    var vector = myMove.getTranslation();
    var vx = myMove.getTranslationX();
    var vy = myMove.getTranslationY();
    var s = myMove.getScaling();
```

And compose different Movers into new ones :
```
    var moves = Mover().compose(myMove, otherMove, anotherOne, andLastMove);
```

You can export to css transform (note that transform-origin must be 0 0 to be compatible with Mover matrices) :
```
    image.style.transform = myMove.css();
```

## Boxer Example
```
    // Get Images
    var red = document.getElementById('red');
    var blue = document.getElementById('blue');

    // Initialize Boxer objects
    b1 = Boxer(red.width, red.height);
    b2 = Boxer(blue.width, blue.height);
    // Create a virtual box
    b3 = Boxer().push(b1).push(b2);
    
    // Apply transforms
    b1.translate(10, 10);
    b2.rotate(90);
    b3.translate(20, 0).rotate(-90);
    
    // Get final css
    red.style.transform = b3.css(0);
    blue.style.transform = b3.css(1);
```
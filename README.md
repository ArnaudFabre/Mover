# Mover

Mover Framework allows to combine 2D transformations like 
* translations
* rotations
* homotheties
    
It is based on homogeneous coordinates that allows to keep in a unique 3x3 matrix the combination of multiple plane transformations.

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
import Konva from 'konva';

// Create the canvas
const stage = new Konva.Stage({
  container: 'container',
  width: 800,
  height: 600
});

// Create a layer
const layer = new Konva.Layer();
stage.add(layer);

// Draw an oval lemon with a small pointed bump at each end.
const lemon = new Konva.Shape({
  x: 200,
  y: 200,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 2,
  sceneFunc(context, shape) {
    context.beginPath();
    context.moveTo(-82, 0);
    context.bezierCurveTo(-82, -8, -72, -9, -66, -17);
    context.bezierCurveTo(-39, -65, 39, -65, 66, -17);
    context.bezierCurveTo(72, -9, 82, -8, 82, 0);
    context.bezierCurveTo(82, 8, 72, 9, 66, 17);
    context.bezierCurveTo(39, 65, -39, 65, -66, 17);
    context.bezierCurveTo(-72, 9, -82, 8, -82, 0);
    context.closePath();
    context.fillStrokeShape(shape);
  }
});

// Add the lemon to the layer.
layer.add(lemon);

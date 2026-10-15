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

// Create a yellow circle
const circle = new Konva.Circle({
  x: 200,
  y: 200,
  radius: 60,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 2
});

// Add circle to layer
layer.add(circle);
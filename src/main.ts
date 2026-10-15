import Konva from 'konva';

const container = document.querySelector<HTMLDivElement>('#container')!;

function getCanvasSize() {
  const bottomMargin = parseFloat(getComputedStyle(document.body).marginBottom) || 0;
  return {
    width: container.clientWidth,
    height: Math.max(1, window.innerHeight - container.getBoundingClientRect().top - bottomMargin)
  };
}

// Fit the canvas inside the available browser area, including page margins.
const stage = new Konva.Stage({
  container,
  ...getCanvasSize()
});

// Create a layer
const layer = new Konva.Layer();
stage.add(layer);

// Draw an oval lemon with a small pointed bump at each end.
const lemon = new Konva.Shape({
  x: stage.width() / 2,
  y: stage.height() / 2,
  draggable: true,
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

let previousCursor = '';
lemon.on('mouseenter', () => {
  previousCursor = stage.container().style.cursor;
  stage.container().style.cursor = 'pointer';
});
lemon.on('mouseleave', () => {
  stage.container().style.cursor = previousCursor;
});

let scaleTween: Konva.Tween | undefined;
let pressedPointerId: number | undefined;

function animateScale(scale: number) {
  // Start from the current scale if a previous animation is still running.
  scaleTween?.destroy();
  scaleTween = new Konva.Tween({
    node: lemon,
    duration: 0.15,
    easing: Konva.Easings.EaseInOut,
    scaleX: scale,
    scaleY: scale
  });
  scaleTween.play();
}

lemon.on('pointerdown', (event) => {
  if (pressedPointerId !== undefined) return;
  pressedPointerId = event.evt.pointerId;
  animateScale(1.1);
});

function releaseLemon(event: PointerEvent) {
  if (pressedPointerId === undefined || event.pointerId !== pressedPointerId) return;
  pressedPointerId = undefined;
  animateScale(1);
}

// Listen outside the canvas too, including cancelled gestures or lost focus.
window.addEventListener('pointerup', releaseLemon);
window.addEventListener('pointercancel', releaseLemon);
window.addEventListener('blur', () => {
  if (pressedPointerId === undefined) return;
  pressedPointerId = undefined;
  animateScale(1);
});

// Add the lemon to the layer.
layer.add(lemon);

window.addEventListener('resize', () => {
  stage.size(getCanvasSize());
  lemon.position({ x: stage.width() / 2, y: stage.height() / 2 });
  layer.batchDraw();
});

var canvas = new fabric.Canvas('c', { selection: false });
var grid = 25;

// create grid

for (var i = 0; i < (600 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 600], { stroke: '#ccc', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 600, i * grid], { stroke: '#ccc', selectable: false }))
}

// add objects
var resistors = [];
function addResistor(){
fabric.loadSVGFromURL("./r.svg",function(objects,options)
{
  var loadedObjects = new fabric.Group(resistors);
  loadedObjects.set({
    left: 0,
    top: 0,
    width:75,
    height:25
  });
  canvas.add(loadedObjects);
  canvas.renderAll();
},
function(item, object) {
  object.set('id', item.getAttribute('id'));
  resistors.push(object);
});
}

canvas.add(new fabric.Rect({ 
  left: 100, 
  top: 100, 
  width: 50, 
  height: 50, 
  fill: '#faa', 
  originX: 'left', 
  originY: 'top',
  centeredRotation: true
}));

canvas.add(new fabric.Circle({ 
  left: 300, 
  top: 300, 
  radius: 50, 
  fill: '#9f9', 
  originX: 'left', 
  originY: 'top',
  centeredRotation: true
}));

// snap to grid

canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});
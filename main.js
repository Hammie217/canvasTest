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
var tempGroup = [];
fabric.loadSVGFromURL("./r.svg",function(objects,options)
{
  var loadedObjects = new fabric.Group(tempGroup);
  loadedObjects.set({
    left: 0,
    top: 0,
    width:75,
    height:25,
    snapAngle: 90
  });
  canvas.add(loadedObjects);
  canvas.renderAll();
},
function(item, object) {
  object.set('id', item.getAttribute('id'));
  tempGroup.push(object);
});
}



// snap to grid

canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});


    // Browser supports HTML5 DnD.

    // Bind the event listeners for the image elements
    var images = document.querySelectorAll('#images img');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
    // Bind the event listeners for the canvas
    var canvasContainer = document.getElementById('canvas-container');
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', '');
       [].forEach.call(images, function (img) {
           img.classList.remove('img_dragging');
       });
       this.classList.add('img_dragging');
   }
   
   function handleDragOver(e) {
       if (e.preventDefault) {
           e.preventDefault(); // Necessary. Allows us to drop.
       }
   
       e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
       // NOTE: comment above refers to the article (see top) -natchiketa
   
       return false;
   }
   
   function handleDragEnter(e) {
       // this / e.target is the current hover target.
       this.classList.add('over');
   }
   
   function handleDragLeave(e) {
       this.classList.remove('over'); // this / e.target is previous target element.
   }
   
   function handleDrop(e) {
       // this / e.target is current target element.
           e.preventDefault();
       if (e.stopPropagation) {
           e.stopPropagation(); // stops the browser from redirecting.
       }
   
       var img = document.querySelector('#images img.img_dragging');
   
       console.log('event: ', e);

       
       var newImage = new fabric.Image(img, {
           width: img.naturalWidth,
           height: img.naturalHeight,
           snapAngle: 90,
           // Set the center of the new object based on the event coordinates relative
           // to the canvas container.
           left:  e.layerX,
           top: e.layerY
       });
       canvas.add(newImage);

newImage.left = Math.round(newImage.left / grid) * grid
newImage.top = Math.round(newImage.top / grid) * grid

   
       return false;
   }
   
   function handleDragEnd(e) {
       // this/e.target is the source node.
       [].forEach.call(images, function (img) {
           img.classList.remove('img_dragging');
       });
   }
   
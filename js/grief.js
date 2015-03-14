var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var startButton = document.getElementById('startButton');
    startButton.addEventListener('click', start, false);
var stopButton = document.getElementById('stopButton');
    stopButton.addEventListener('click', stop, false);
var keepGoing = 0;

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            /* TODO: Constrain image to the window width */
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

function start(){
    keepGoing = 1;
    grief();
}

function stop(){
    keepGoing = 0;
}


function grief(){

    /*console.log(Math.random());*/
    var ax = Math.floor(Math.random() * canvas.width);
    var ay = Math.floor(Math.random() * canvas.height);
    console.log("a is " + ax + ", " + ay +".");

    var pixelA = ctx.getImageData(ax, ay, 10, 10);

    /* random < 0.5: horizontal; random > 0.5: vertical */
    var direction = (Math.random < 0.5) ? "x" : "y";
    var offset = (Math.random < 0.5) ? -1 : 1;
    var pixelB, bx, by;

    if (direction == "x") {
        bx = ax + (offset*10);
        by = ay;
    }
    else
    {
        bx = ax;
        by = ay + (offset*10);
    }
    var pixelB = ctx.getImageData(bx, by, 10, 10);
    console.log("b is " + bx + ", " + by + ".");
    ctx.putImageData(pixelA, bx, by);
    ctx.putImageData(pixelB, ax, ay);

    if (keepGoing > 0) {
        setTimeout(grief, 100);
    }
}

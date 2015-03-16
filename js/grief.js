var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var startButton = document.getElementById('startButton');
    startButton.addEventListener('click', start, false);
var stopButton = document.getElementById('stopButton');
    stopButton.addEventListener('click', stop, false);
var saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', save, false);
var keepGoing = 0;
var mutations = 0;
var blocksize = 10;
var speed = 100;

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            /* TODO: Constrain image to the window width */
            var maxHeight = window.innerHeight - 100
            canvas.width = document.getElementById('image-wrapper').offsetWidth;
            canvas.height = maxHeight*2;

            //ctx.drawImage(img,0,0);
            if (img.width > img.height) {
                ctx.drawImage(img, 0, 0, window.innerWidth, window.innerWidth * img.height / img.width)
            }
            else {
                ctx.drawImage(img, 0, 0, maxHeight * img.width / img.height, maxHeight)
            }
            
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]); 

    document.getElementById('controls').style.display = "block";    
}

function start(){
    keepGoing = 1;
    grief();
}

function stop(){
    keepGoing = 0;
}

function save() {
    console.log("saving")
    document.location.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
}

function grief(){
    console.log(blocksize)

    /*console.log(Math.random());*/
    var ax = Math.floor(Math.random() * canvas.width);
    var ay = Math.floor(Math.random() * canvas.height);

    var pixelA = ctx.getImageData(ax, ay, blocksize, blocksize);

    /* random < 0.5: horizontal; random > 0.5: vertical */
    var direction = (Math.random() < 0.5) ? "x" : "y";
    var offset = (Math.random() < 0.5) ? -1 : 1;
    var pixelB, bx, by;

    if (direction == "x") {
        bx = ax + (offset*blocksize);
        by = ay;
    }
    else
    {
        bx = ax;
        by = ay + (offset*blocksize);
    }
    var pixelB = ctx.getImageData(bx, by, blocksize, blocksize);

    ctx.putImageData(pixelA, bx, by);
    ctx.putImageData(pixelB, ax, ay);
    mutations++;
    mutcount = document.getElementById("mutcount");
    mutcount.innerText = mutations;

    if (keepGoing > 0) {
        setTimeout(grief, speed);
    }
}

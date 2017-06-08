function init() {
    QUALITY = 2;
    WIDTH = Math.floor(window.innerWidth / QUALITY);
    HEIGHT = Math.floor(window.innerHeight / QUALITY);
    SIZE = WIDTH * HEIGHT;
    container = document.getElementById("container");
    canvas = document.getElementById("myCanvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    container.appendChild(canvas);
    context = canvas.getContext("2d");
    context.fillStyle = "rgb(255,255,255)";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    image = context.getImageData(0, 0, WIDTH, HEIGHT);
    data = image.data;
    buffer1 = [];
    buffer2 = [];
    for (var e = 0; e < SIZE; e++) {
        buffer1[e] = 0;
        buffer2[e] = 0
    }

}

function addEventBindings() {
    document.addEventListener("mousedown", onDocumentMouseDown, false);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("mouseup", onDocumentMouseUp, false);
    document.addEventListener("mouseout", onDocumentMouseOut, false);
    document.addEventListener("touchstart", onDocumentTouchStart, false);
    document.addEventListener("touchmove", onDocumentTouchMove, false);
    document.addEventListener("touchend", onDocumentTouchEnd, false);
    document.addEventListener("keyup", onDocumentKeyUp, false)
}

function onDocumentMouseDown(e) {
    e.preventDefault();
    isUserInteracting = true;
    pointers = [
        [e.clientX / QUALITY, e.clientY / QUALITY]
    ]
}

function onDocumentMouseMove(e) {
    pointers = [
        [e.clientX / QUALITY, e.clientY / QUALITY]
    ]
}

function onDocumentMouseUp(e) {
    isUserInteracting = false
}

function onDocumentMouseOut(e) {
    isUserInteracting = false
}

function onDocumentTouchStart(e) {
    isUserInteracting = true;
    e.preventDefault();
    pointers = [];
    for (var t = 0; t < e.touches.length; t++) {
        pointers.push([e.touches[t].pageX / QUALITY, e.touches[t].pageY / QUALITY])
    }
}

function onDocumentTouchMove(e) {
    e.preventDefault();
    pointers = [];
    for (var t = 0; t < e.touches.length; t++) {
        pointers.push([e.touches[t].pageX / QUALITY, e.touches[t].pageY / QUALITY])
    }
}

function onDocumentTouchEnd(e) {
    e.preventDefault();
    isUserInteracting = false
}

function onDocumentKeyUp(e) {
    emit(Math.random() * WIDTH, Math.random() * HEIGHT)
}

function emit(e, t) {
    buffer1[Math.floor(e) + Math.floor(t) * WIDTH] = 255
}

function loop() {
    if (isUserInteracting) {
        if (!hasClicked) {
            showText()
        }
        for (var e = 0; e < pointers.length; e++) {
            emit(pointers[e][0], pointers[e][1])
        }
    }
    var t;
    var n = WIDTH * HEIGHT - WIDTH;
    for (var e = WIDTH; e < n; e++) {
        t = (buffer1[e - 1] + buffer1[e + 1] + buffer1[e - WIDTH] + buffer1[e + WIDTH] >> 1) - buffer2[e];
        t -= t >> 20;
        buffer2[e] = t;
        t = t > 255 ? 255 : t < 0 ? 0 : t;
        data[e * 4] = 255 - t;
        data[e * 4 + 1] = 255 - t;
        data[e * 4 + 2] = 255 - t
    }
    tempbuffer = buffer1;
    buffer1 = buffer2;
    buffer2 = tempbuffer;
    context.putImageData(image, 0, 0)
}

function updateTextPosition(e, t) {
    var n = document.getElementById("info");
    n.style.top = t - 40 + "px";
    n.style.left = e - 140 + "px"
}

function showText() {
    fadeIn()
}

function fadeIn() {
    hasClicked = true;
    clearInterval(th);
    var e = document.getElementById("info");
    e.opct = 0;
    e.ih = setInterval(function () {
        e.opct += 1;
        var t = parseInt(e.opct);
        if (t < 80) {
            var o = 1 - (t / 100);
            e.style.MozOpacity = o;
            e.style.KhtmlOpacity = o;
            e.style.filter = "alpha(opacity=" + (100-t) + ")";
            e.style.opacity = o;
        } else {
            clearInterval(e.ih)
        }
    }, 20)
}

function clickIE() {
    if (document.all) {
        "";
        return false
    }
}

function clickNS(e) {
    if (document.layers || document.getElementById && !document.all) {
        if (e.which == 2 || e.which == 3) {
            "";
            return false
        }
    }
}


var QUALITY;
var WIDTH;
var HEIGHT;
var SIZE;
var container;
var canvas;
var context;
var image;
var data;
var buffer1;
var buffer2;
var tempbuffer;
var pointers;
var hasClicked = false;
var isUserInteracting;
init();
addEventBindings();
setInterval(loop, 1e3 / 60);
var th = setTimeout(function () {
    showText()
}, 12e3);
window.onresize = function (e) {
    init()
};
if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS
} else {
    document.onmouseup = clickNS;
    document.oncontextmenu = clickIE
}
document.oncontextmenu = new Function("return false")
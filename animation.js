var c = document.getElementById("myCanvas"); //food
var ctx = c.getContext("2d");
ctx.strokeStyle="#FF4500";

c.onclick = function(){
	var Xcoord = event.clientX;
	var Ycoord = event.clientY;
	ctx.strokeRect(Xcoord, Ycoord, 1, 1);
};
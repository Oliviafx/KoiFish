var c = document.getElementById("myCanvas"); //food
var ctx = c.getContext("2d");
ctx.strokeStyle="#FFFF00";

c.onclick = function(){
	var Xcoord = event.clientX;
	var Ycoord = event.clientY;
	ctx.strokeRect(Xcoord, Ycoord, 1, 1);
};
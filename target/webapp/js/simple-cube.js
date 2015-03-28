(function(){

function drawOnClick(gl,canvas,gl_program){
	var gl_points = [];
	   var gl_colors = [];
	   var aVertexPosition = gl.getAttribLocation(gl_program,'aVertexPosition');
	   var aPointSize = gl.getAttribLocation(gl_program,'aPointSize');
	   var uFragColor = gl.getUniformLocation(gl_program,'u_FragColor');
	   $("#convas3d").on('mousedown',function(env){
		   var x = env.clientX;
		   var y = env.clientY;
		   var rect = env.target.getBoundingClientRect();
		   var gl_x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
	   	   var gl_y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
		   console.log('click X '+x+' and Y '+y);
		   gl_points.push({x:gl_x,y:gl_y});
		   if(gl_x >= 0.0 && gl_y >= 0.0){
			   gl_colors.push([1.0,1.0,1.0,1.0]);
		   }
		   else if(gl_x > 0.0 && gl_y < 0.0){
			   gl_colors.push([0.0,1.0,0.0,1.0]);
		   }
		   else if(gl_x < 0.0 && gl_y > 0.0){
			   gl_colors.push([1.0,1.0,0.0,1.0]);
		   }
		   else{
			   gl_colors.push([0.0,1.0,1.0,1.0]);
		   }
		   glClear(gl);

		   gl.vertexAttrib1f(aPointSize,5.0);

		   for(var idx in gl_points){
			   var point = gl_points[idx];
			   var color = gl_colors[idx];
			   gl.vertexAttrib3f(aVertexPosition,point.x,point.y,0.0);
			   gl.uniform4f(uFragColor,color[0],color[1],color[2],color[3]);
			   gl.drawArrays(gl.POINTS,0,1);
		   }

	   });

}

function initVertexBuffers(gl,gl_program){
	var vertices = new Float32Array([
	-0.5,0.5,
	0.5,0.5,
	-0.5,-0.5,
	0.5,-0.5
	]);
	var n = 4;
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer){
		tip("Failed to create Buffer");
		return -1;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	var a_Position = gl.getAttribLocation(gl_program,'aVertexPosition');
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(a_Position);

	return n;

}
var angle_speed = 45.0;
var gl_ctx = null;
var gl_program = null;
function render(gl){
      var now = Date.now();
      var eclepse = now - q_last;
      q_last = now;
      var n = 4;
      angle_speed =(angle_speed + (eclepse * 45.0) / 1000) % 360.0;
		  var angle = (angle_speed / 180.0) * Math.PI;

		  var sinB = Math.sin(angle);
		  var cosB = Math.cos(angle);
		  var xTransMatrix = new Float32Array([
		  cosB,sinB,0.0,0.0,
		  -sinB,cosB,0.0,0.0,
		  0.0,0.0,1.0,0.0,
		  0.0,0.0,0.0,1.0]);
		  glClear(gl);
		  var uTransMatrix = gl.getUniformLocation(gl_program,'uTransMatrix');

		  gl.uniformMatrix4fv(uTransMatrix,false,xTransMatrix);

		  gl.drawArrays(gl.TRIANGLE_FAN,0,n);
}

var q_last = Date.now();

function animated(){
  render(gl_ctx,gl_program);
  window.requestAnimationFrame(animated);

}

$(document).ready(function(){
	if (Modernizr.webgl){
		   console.log("webgl support!");
		   var canvas = $("#convas3d")[0];
		   var gl = initGL(canvas);
		   var vertexStr = $('#shader-vs').text();
		   var fragmentStr = $('#shader-fs').text();
		   var vertexShader = loadShader(gl,vertexStr,gl.VERTEX_SHADER);
		   var fragmentShader = loadShader(gl,fragmentStr,gl.FRAGMENT_SHADER);
		   gl_program = useShader(gl,vertexShader,fragmentShader);
       gl_ctx = gl;
       var n = initVertexBuffers(gl,gl_program);
		   animated();



		} else {
			var msg = 'With a different browser you’ll get to see the WebGL experience here: \
		        get.webgl.org.';
			tip(msg);
		}

});

})();

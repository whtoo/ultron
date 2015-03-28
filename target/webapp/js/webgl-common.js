function glClear(gl){
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}
function initGL(canvas){
	try{
		var contextGL = canvas.getContext("webgl");
		if(contextGL){
			contextGL.viewport(0.0,0.0,canvas.width,canvas.height);
		}

		return contextGL;
	}
	catch(e){
		return null;
	}
}

function loadShader(gl,source,type){
	var shader = gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
		tip("shader load "+type+" error !");
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}

function useShader(gl,vertexShader,fragmentShader){
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram,vertexShader);
	gl.attachShader(shaderProgram,fragmentShader);
	gl.linkProgram(shaderProgram);

	if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)){
		tip("Failed to setup shaders!");
	}

	gl.useProgram(shaderProgram);
	return shaderProgram;
}

function tip(str){
	$('#notice').html(str);
}

(function(){
  var gl_ctx = null;
  var gl_program = null;

  function initVertexBuffers(gl,gl_program){
    var n = 8;
    //交错顶点和点大小
    var verticsSizes = new Float32Array([
      //
      -0.5, 0.5,0.5,0.0,1.0,0.2,
      -0.5,-0.5,0.5,0.0,0.0,0.3,
       0.5, 0.5,0.5,0.0,1.0,0.5,
       0.5,-0.5,0.5,0.0,0.0,1.0,
      //
      -0.2, 0.8,0.5,1.0,1.0,0.2,
      -0.2,-0.2,0.5,0.5,0.0,0.3,
       0.8, 0.8,0.5,0.4,1.0,0.5,
       0.8,-0.2,0.5,0.3,0.0,1.0,
     ]);
    var verticesBuffer = gl.createBuffer();
    if(!verticesBuffer){
      tip("Failed to create Buffer");
      return -1;
	  }
    gl.bindBuffer(gl.ARRAY_BUFFER,verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticsSizes,gl.STATIC_DRAW);

    var FSIZE = verticsSizes.BYTES_PER_ELEMENT;
    var STRIDE = FSIZE * 6;
    var aPosition = gl.getAttribLocation(gl_program,'aPosition');
    gl.vertexAttribPointer(aPosition,3,gl.FLOAT,false,STRIDE,0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(gl_program,'aColor');
    gl.vertexAttribPointer(aColor,3,gl.FLOAT,false, STRIDE,FSIZE * 3);
    gl.enableVertexAttribArray(aColor);


    return n;
  }


  function draw(gl,n){

    glClear(gl);

    gl.drawArrays(gl.TRIANGLES,0,n);
  }

  //init for top-level
  $(document).ready(function(){
	if (Modernizr.webgl){
		   console.log("webgl support!");
		   var canvas = $("#convas3d")[0];
		   gl_ctx = initGL(canvas);
		   var vertexStr = $('#shader-vs').text();
		   var fragmentStr = $('#shader-fs').text();
		   var vertexShader = loadShader(gl_ctx,vertexStr,gl_ctx.VERTEX_SHADER);
		   var fragmentShader = loadShader(gl_ctx,fragmentStr,gl_ctx.FRAGMENT_SHADER);
		   gl_program = useShader(gl_ctx,vertexShader,fragmentShader);

       var n = initVertexBuffers(gl_ctx,gl_program);

       var viewMatrixAttr = gl_ctx.getUniformLocation(gl_program,'viewMatrix');
       var viewMatrix = mat4.create();
       var projectMatrixAttr = gl_ctx.getUniformLocation(gl_program,'projectMatrix');
       var projectMatrix = mat4.create();

       mat4.ortho(projectMatrix,-1.0,1.0,-1.0,1.0,-0.5,1.0);
       gl_ctx.uniformMatrix4fv(projectMatrixAttr,false,projectMatrix);
       var eyex = 0.0;
       var eyey = 0.0;
       var eyez = 1.0;
       var delta = 0.01;
       mat4.lookAt(viewMatrix,[eyex,eyey,eyez],[0.0,0.0,0.0],[0.0,1.0,0.0]);
       gl_ctx.uniformMatrix4fv(viewMatrixAttr,false,viewMatrix);
       draw(gl_ctx,n);


       $('body').on('keydown',function(e){
          var key = e.keyCode;
          console.log(eyex+' '+eyey+' '+eyez);
          switch(key){
            case 65:
              eyex -= delta;
              mat4.lookAt(viewMatrix,[eyex,eyey,eyez],[0.0,0.0,0.0],[0.0,1.0,0.0]);
              gl_ctx.uniformMatrix4fv(viewMatrixAttr,false,viewMatrix);
              console.log('a');
              draw(gl_ctx,n);
              break;
            case 68:
              console.log('d');
              eyex += delta;
              mat4.lookAt(viewMatrix,[eyex,eyey,eyez],[0.0,0.0,0.0],[0.0,1.0,0.0]);
              gl_ctx.uniformMatrix4fv(viewMatrixAttr,false,viewMatrix);
              draw(gl_ctx,n);
               break;
            case 83:
              console.log('s');
              eyez += delta;
               mat4.lookAt(viewMatrix,[eyex,eyey,eyez],[0.0,0.0,0.0],[0.0,1.0,0.0]);
              gl_ctx.uniformMatrix4fv(viewMatrixAttr,false,viewMatrix);
              draw(gl_ctx,n);
               break;
            case 87:
              console.log('w');
               eyez -= delta;
               mat4.lookAt(viewMatrix,[eyex,eyey,eyez],[0.0,0.0,0.0],[0.0,1.0,0.0]);
              gl_ctx.uniformMatrix4fv(viewMatrixAttr,false,viewMatrix);
              draw(gl_ctx,n);
               break;
            case 69:
              console.log('e');
               eyey -= delta;
               mat4.lookAt(viewMatrix,[eyex,eyey,eyez],[0.0,0.0,0.0],[0.0,1.0,0.0]);
              gl_ctx.uniformMatrix4fv(viewMatrixAttr,false,viewMatrix);
              draw(gl_ctx,n);
               break;
              case 81:
              console.log('q');
               eyey += delta;
               mat4.lookAt(viewMatrix,[eyex,eyey,eyez],[0.0,0.0,0.0],[0.0,1.0,0.0]);
              gl_ctx.uniformMatrix4fv(viewMatrixAttr,false,viewMatrix);
              draw(gl_ctx,n);
               break;
            default:
              console.log('unknown key code '+key);
          }
       });

		} else {
			var msg = 'With a different browser you will get to see the WebGL experience here: \
		        get.webgl.org.';
			tip(msg);
		}

  });


})();

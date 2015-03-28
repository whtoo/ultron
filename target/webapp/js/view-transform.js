(function(){
  var gl_ctx = null;
  var gl_program = null;

  function initVertexBuffers(gl,gl_program){
    var n = 4;
    //交错顶点和点大小
    var verticsSizes = new Float32Array([
      -0.5, 0.5,0.0,0.0,1.0,
      -0.5,-0.5,0.0,0.0,0.0,
       0.5, 0.5,0.0,1.0,1.0,
       0.5,-0.5,0.0,1.0,0.0
     ]);
    var verticesBuffer = gl.createBuffer();
    if(!verticesBuffer){
      tip("Failed to create Buffer");
      return -1;
	  }
    gl.bindBuffer(gl.ARRAY_BUFFER,verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticsSizes,gl.STATIC_DRAW);

    var FSIZE = verticsSizes.BYTES_PER_ELEMENT;
    var STRIDE = FSIZE * 5;
    var aPosition = gl.getAttribLocation(gl_program,'aPosition');
    gl.vertexAttribPointer(aPosition,3,gl.FLOAT,false,STRIDE,0);
    gl.enableVertexAttribArray(aPosition);

    var aTexCoord = gl.getAttribLocation(gl_program,'aTexCoord');
    gl.vertexAttribPointer(aTexCoord,2,gl.FLOAT,false, STRIDE,FSIZE * 3);
    gl.enableVertexAttribArray(aTexCoord);


    return n;
  }

  function loadTexture(gl,textureId,texture,uSampler,image){
    //Y轴翻转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
    //
    var textureSign = eval("gl.TEXTURE"+textureId);
    gl.activeTexture(textureSign);
    gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);

    gl.uniform1i(uSampler,textureId);
  }

  function draw(gl,n){

    glClear(gl);

    gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
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

       var viewMatrix = gl_ctx.getUniformLocation(gl_program,'viewMatrix');
       var mat4
       gl_ctx.uniformMatrix4fv(

		   async.series([
        function(callback ){
          var image = new Image();
          var uSampler = gl_ctx.getUniformLocation(gl_program,'uSampler1');
          var texture = gl_ctx.createTexture();
           image.src = '../images/material_001.jpg';
           image.onload = function(){
             loadTexture(gl_ctx,0,texture,uSampler,image);
             callback(null,'one');
           }

        },
        function(callback){
          var texture = gl_ctx.createTexture();
          var uSampler = gl_ctx.getUniformLocation(gl_program,'uSampler2');
           var image = new Image();
           image.src = '../images/lumb1.jpg';
           image.onload = function(){
             loadTexture(gl_ctx,1,texture,uSampler,image);
             callback(null,'two');
           }
        },
        function(callback){
          draw(gl_ctx,n);
          callback(null,'three');
        }
      ],
      // optional callback
      function(err, results){

      });


		} else {
			var msg = 'With a different browser you will get to see the WebGL experience here: \
		        get.webgl.org.';
			tip(msg);
		}

  });


})();

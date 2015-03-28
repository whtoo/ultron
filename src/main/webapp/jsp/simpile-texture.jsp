<%@ page import="java.util.*"%>
<% String path = request.getContextPath(); %>
<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<title></title>
<script src="<%=path%>/js/jquery-2.1.3.min.js"></script>
<script src="<%=path%>/js/async.js"></script>
<script src="<%=path%>/js/modernizr.custom.93833.js"></script>
<script src="<%=path%>/js/gl-matrix-2.2.1.js"></script>
<script id="shader-vs" type="x-shader/x-vertex">
	attribute vec4 aPosition;
  attribute vec2 aTexCoord;
  varying vec2 vTexCoord;
  uniform mat4 viewMatrix;
	void main(){
		gl_Position = viewMatrix * aPosition ;
    vTexCoord = aTexCoord;
	}
</script>
<script id="shader-fs" type="x-shader/x-fragment">
	precision mediump float;
  uniform sampler2D uSampler1;
  uniform sampler2D uSampler2;
  varying vec2 vTexCoord;

	void main() {
    vec4 color0 = texture2D(uSampler1,vTexCoord);
    vec4 color1 = texture2D(uSampler2,vTexCoord);

		gl_FragColor = color0 * color1;
	}

</script>
<script src="<%=path%>/js/webgl-common.js"></script>
<script src="<%=path%>/js/simple-texture.js"></script>
<style>
#x3d{
	border:1px black;
}
</style>
</head>
<body>
	<div id="notice" display="none">
	</div>
	<div id="x3d">
		<canvas id="convas3d" width="500" height="500">12</canvas>
	</div>
</body>
</html>

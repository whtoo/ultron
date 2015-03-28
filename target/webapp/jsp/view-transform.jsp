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
  attribute vec4 aColor;
  varying vec4 vColor;
  uniform mat4 viewMatrix;
	void main(){
		gl_Position = viewMatrix * aPosition ;
    vColor = aColor;
	}
</script>
<script id="shader-fs" type="x-shader/x-fragment">
	precision mediump float;
  varying vec4 vColor;
	void main() {

		gl_FragColor = vColor;
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

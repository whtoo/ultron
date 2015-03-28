<%@ page import="java.util.*"%>
<% String path = request.getContextPath(); %>
<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<title></title>
<script src="<%=path%>/js/jquery-2.1.3.min.js"></script>
<script src="<%=path%>/js/modernizr.custom.93833.js"></script>
<style>

</style>
</head>
<body>
	<div id="container">
		<ul>
      <li><a href="<%=path%>/jsp/simpile-cube.jsp">Simplie-Cube</a></li>
      <li><a href="<%=path%>/jsp/simpile-texture.jsp">Simplie-texture</a></li>
      <li><a href="<%=path%>/jsp/lookat.jsp">lookat</a></li>
    </ul>

	</div>
</body>
</html>

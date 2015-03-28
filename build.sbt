name := "ultron"

version := "1.0"

scalaVersion := "2.11.6"

seq(webappSettings : _*)

libraryDependencies += "javax.servlet" % "javax.servlet-api" % "3.1.0" % "provided"

libraryDependencies ++= Seq(
  "org.springframework" % "spring-webmvc" % "4.0.0.RELEASE",
  "org.eclipse.jetty" % "jetty-webapp" % "9.2.10.v20150310" % "container",
  "org.eclipse.jetty" % "jetty-jsp" % "9.2.10.v20150310" % "container",
  "org.eclipse.jetty" % "jetty-plus" % "9.2.10.v20150310" % "container",
  "org.apache.commons" % "commons-math3" % "3.4.1"
)

jetty(port = 9090)

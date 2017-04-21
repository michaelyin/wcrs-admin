# wcrs-admin
spring boot rest service sample

#To build the project, you need install a wcrs lib first:
install domain jar file into your local maven repo:

   mvn install:install-file -Dfile=./wcrs-domain-0.0.10.jar file -DgroupId=net.wyun.wcrs 
-DartifactId=wcrs-domain -Dversion={0.0.10} -Dpackaging=jar

1. build project without unit testing
   ./gradlew clean build -x test
   
2. run with gradlew command
   ./gradlew bootRun
   


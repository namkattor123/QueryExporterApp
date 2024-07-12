#
#
#FROM adoptopenjdk/openjdk8:ubi as base
#WORKDIR /app
#COPY .mvn/ .mvn
#COPY mvnw pom.xml ./
#RUN mkdir -p /root/.m2 \
#    && mkdir /root/.m2/repositoryRUN ./mvnw dependency:resolve \
#
#COPY src ./src
#
#COPY settings.xml /root/.m2/
#COPY settings.xml /usr/share/maven/ref/
#FROM base as development
#CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.profiles=mysql", "-Dspring-boot.run.jvmArguments='-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000'"]
#
#FROM base as build
#RUN ./mvnw package -DskipTests -s settings.xml
#
#FROM adoptopenjdk/openjdk8:ubi as production
#EXPOSE 8080
#COPY --from=build /app/target/springboot-backend-*.jar /springboot-backend.jar
#CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/springboot-backend.jar"]
# Set the working directory inside the container

FROM adoptopenjdk/openjdk8:ubi
EXPOSE 8080
WORKDIR /app
ARG JAR_FILE=target/springboot-backend-0.0SS.1-SNAPSHOT.jaSa
ARG version=0.8.0
ADD ${JAR_FILE} /app/app05.jar
#ADD --chmod=644 https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v$version/opentelemetry-javaagent-all.jar .
#ENV JAVA_TOOL_OPTIONS "-javaagent:./opentelemetry-javaagent-all.jar"
COPY db-config.properties /app/etc/application.properties
ENTRYPOINT ["java","-jar","-Dspring.config.location=/app/etc/application.properties","/app/app05.jar"]
#ENTRYPOINT ["java","-jar","/app/app05.jar"]
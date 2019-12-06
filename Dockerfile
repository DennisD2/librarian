FROM ubuntu

# Dockerfile for building Java applications.
#
# Required ENV vars (provide these via Deployment Config):
# SW_REPO : web site with required base files, see ADD commands below.
#           Example: http://raspberrypi/software/fordocker
# WORKDIR : Working directory for build.
#            Example: /src/app
#
# Provided ENV vars
# OPT
# SWREPO
# WORKDIR
# M2_HOME, JAVA_8_HOME, JAVA_HOME, NODE_HOME
#
ENV OPT=/opt \
    SWREPO=http://raspberrypi/software/fordocker \
    WORKDIR=/opt/app

RUN apt-get update && \
    apt-get -yq install curl git maven openjdk-8-jdk

RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash - && \
    apt-get -y install nodejs && \
    npm install @angular/cli -g
# RUN node -v && npm -v

WORKDIR ${OPT}/s2i
ADD ${SWREPO}/noarch/s2i/assemble ${SWREPO}/noarch/s2i/run ${SWREPO}/noarch/s2i/entrypoint ./
RUN chmod 755 assemble run entrypoint

ENV M2_HOME=${OPT}/apache-maven-3.6.0 \
    JAVA_8_HOME=/usr/lib/jvm/java-8-openjdk-armhf \
    NODE_HOME=${OPT}/node-v10.13.0-linux-x64

ENV JAVA_HOME=${JAVA_8_HOME} \
    PATH="${M2_HOME}/bin:${JAVA_HOME}/bin:${NODE_HOME}/bin:${PATH}" \
    HOME="${WORKDIR}"

WORKDIR ${WORKDIR}
RUN chgrp -R 0 ${WORKDIR} && \
    chmod -R g+rwX ${WORKDIR}

ENTRYPOINT [ "/opt/s2i/entrypoint" ]

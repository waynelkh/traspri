FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

# Bundle app source
COPY . /src
WORKDIR /src
# Install app dependencies
RUN npm install
# Patch
RUN mv node_modules/bingtranslator/lib/getadmtoken.js node_modules/bingtranslator/lib/getAdmToken.js

EXPOSE  8080
CMD ["node", "/src/server.js"]


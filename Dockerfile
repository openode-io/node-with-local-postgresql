FROM node:10-alpine

WORKDIR /opt/app

ENV PORT=80

RUN apk add postgresql
RUN echo 'mkdir -p db' >> /usr/bin/start.sh

RUN echo 'mkdir -p /run/postgresql' >> /usr/bin/start.sh
RUN echo 'chmod -R 777 /run' >> /usr/bin/start.sh
RUN echo 'chmod -R 700 /opt/app/db' >> /usr/bin/start.sh
RUN echo 'chown -R postgres /opt/app/db' >> /usr/bin/start.sh
RUN echo 'su -c "initdb /opt/app/db/ || true" postgres' >> /usr/bin/start.sh
RUN echo 'su -c "postgres -D /opt/app/db/ &" postgres' >> /usr/bin/start.sh
RUN echo 'sleep 5' >> /usr/bin/start.sh

RUN echo 'npm install --production' >> /usr/bin/start.sh

# npm start, make sure to have a start attribute in "scripts" in package.json
RUN echo 'npm start' >> /usr/bin/start.sh

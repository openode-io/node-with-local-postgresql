FROM node:10-alpine

WORKDIR /opt/app

ENV PORT=80

RUN apk add postgresql
RUN echo 'mkdir -p db' >> /boot.sh

RUN echo 'mkdir -p /run/postgresql' >> /boot.sh
RUN echo 'chmod -R 777 /run' >> /boot.sh
RUN echo 'chmod -R 700 /opt/app/db' >> /boot.sh
RUN echo 'chown -R postgres /opt/app/db' >> /boot.sh
RUN echo 'su -c "initdb /opt/app/db/ || true" postgres' >> /boot.sh
RUN echo 'su -c "postgres -D /opt/app/db/ &" postgres' >> /boot.sh
RUN echo 'sleep 5' >> /boot.sh

RUN echo 'npm install --production' >> /boot.sh

# npm start, make sure to have a start attribute in "scripts" in package.json
CMD sh /boot.sh && npm start

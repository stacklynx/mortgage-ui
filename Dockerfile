# base image
FROM stackaero/nodejs-base:latest

RUN git clone --depth 1 https://github.com/stacklynx/mortgage-ui.git /opt/apps/mortgage-ui
#COPY . /opt/apps/mortgage-ui
#USER root
#RUN chown -R node  /opt/apps/mortgage-ui
#USER node
RUN cd /opt/apps/mortgage-ui && ls -ltr /opt/apps/mortgage-ui
# set working directory
WORKDIR /opt/apps/mortgage-ui

RUN npm i event-stream && npm install --silent
#RUN  npm run build && mv ./dist/mortgage-ui/* ./dist && rm -rf ./dist/mortgage-ui
ENV PROJECT_HOME=/opt/apps/mortgage-ui

ADD ./bootstrap-app.sh /opt/apps/bootstrap-app.sh
##RUN chmod +x /opt/apps/bootstrap-app.sh
# start app
ENTRYPOINT  ["/opt/apps/bootstrap-app.sh"]

CMD ["npm", "start"]


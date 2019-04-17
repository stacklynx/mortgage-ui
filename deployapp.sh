#!/bin/bash
APP_NAME={{APP_NAME}}
PROJECT_HOME=$HOME/$APP_NAME
git clone --depth 1 {{GIT_PROJECT_URL}} ${PROJECT_HOME} 
cd $PROJECT_HOME
echo `pwd`
npm install --quiet --slient
cat <<EOF > $PROJECT_HOME/src/app/baseUrl.ts
export class BaseUrl {
public static API_URL = '{{API_BASE_URL}}/mortgage-api/api/';
public static API_URL_AUTH = '{{API_BASE_URL}}/mortgage-api/';
}
EOF
cat <<EOF > /etc/supervisor/$APP_NAME.conf
[program:$APP_NAME]
command=ng serve --port 8080 --host 0.0.0.0 --open --disable-host-check
directory=$HOME/$APP_NAME
autostart=true
autorestart=true
startretries=3
stderr_logfile=$PROJECT_HOME/err.log
stdout_logfile=$PROJECT_HOME/out.log
user=$USER
EOF
sudo supervisorctl -c /etc/supervisord.d/supervisord.conf update
#!/bin/bash 

if [  -z "${API_BASE_URL}" ]; then
  API_BASE_URL=${API_URI_SCHEME:-http}://${API_HOST:-localhost}:${API_PORT:-8080}
fi

echo API_BASE_URL:$API_BASE_URL
cat <<EOF > $PROJECT_HOME/src/app/baseUrl.ts
export class BaseUrl {
public static API_URL = '${API_BASE_URL}/mortgage-api/api/';
public static API_URL_AUTH = '${API_BASE_URL}/mortgage-api/';
}
EOF

npm run build && mv ./dist/mortgage-ui/* ./dist && rm -rf ./dist/mortgage-ui

if [ ! -z "${NOTIFY_WEBHOOK}" ]; then
  echo "Running Webhook ${NOTIFY_WEBHOOK}"
  PUBLIC_IP=`curl -s https://ipv4.icanhazip.com`
  HOSTNAME=`hostname`
  CURR_DATE=`date`
  CHAT_MSG="{\"username\":\"${POD_NAMESPACE}:${SERVICE_NAME}\",    \"text\": \"Pod $POD_NAMESPACE: ${POD_NAME} started at  ${CURR_DATE}\", \"attachments\": [ {\"title\": \"Deployed on Node ${NODE_NAME}\", \"text\": \"Public Ip:$PUBLIC_IP  Hostname:${HOSTNAME}\"       }   ]}"
  echo $CHAT_MSG
  curl -d "$CHAT_MSG" -H "Content-Type: application/json" -X POST ${NOTIFY_WEBHOOK}
fi  

# exec CMD
echo ">> exec docker CMD"
echo "$@"
"$@"


#!/bin/sh

set -e
set -u

OPTIND=1

ROOT_HTML=/usr/share/nginx/html/
lightgray='\e[0;37m'
ACTION=$1

banner () {
  echo -e "${lightgray}"; figlet "INTRANET FRONTEND";
  printf "\n@> Starting web server...\n"
 }

setup () {
  sed -i "s!@unknown-host!${VITE_APP_ENDPOINT}!g" /usr/share/nginx/html/index.html
  echo -e "${VITE_APP_ENDPOINT}"
}

httpMode () {
  setup && nginx -g 'daemon off;'
}

debugMode () {
  setup && nginx-debug -g 'daemon off;'
}

case $ACTION in
  http)
  banner && httpMode
  ;;
  debug)
  banner && \
    printf "\n-debug-"
    tree -a -h --du $ROOT_HTML && \
    printf "-debug-\n" && \
    debugMode
  ;;
  *)
  exec "$@"
  ;;
esac

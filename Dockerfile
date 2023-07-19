FROM --platform=linux/x86_64 node:18-alpine as build-stage

WORKDIR /app

# Dependencies
COPY *.json *.js yarn.lock .yarn*.lock .yarn*.yml ./

RUN yarn install --json --immutable

COPY . .

ARG MODE=production

RUN yarn build



# NGINX
FROM nginx:1.23-alpine as nginx-stage

RUN apk add --no-cache dumb-init tree figlet

# copy config
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# copy from build
COPY --chown=nginx:nginx --from=build-stage /app/dist /usr/share/nginx/html

RUN ls -la /usr/share/nginx/html


# args
ARG VITE_APP_ENDPOINT=http://0.0.0.0:3712/graphql
ARG MODE=production

# Environment
ENV VITE_APP_ENDPOINT=$VITE_APP_ENDPOINT
ENV MODE=$MODE

COPY docker/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/usr/bin/dumb-init",  "--", "/docker-entrypoint.sh"]


EXPOSE 80

CMD ["http"]

# FRONTEND INTRANET

## RUN DOCKER

### Create docker image

```shell
docker build . -t intranet-front
```

### Run docker image

> Need to inform the backend entrypoint when running the container

```shell
docker run -it --rm -p 80:80 --env VITE_APP_ENDPOINT='backend entrypoint' intranet-front
```

> For docker compose use enviroments to pass the backend entrypoint

```yaml
environment:
  VITE_APP_ENDPOINT: "backend entrypoint"
```

FROM node:14.18.1-alpine3.12

RUN npm install -g @nestjs/cli@8.0.0

USER node

WORKDIR /home/node/app
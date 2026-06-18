FROM node:14.18.2

USER node

ARG APP_ENV=production
ENV APP_ENV=${APP_ENV}
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3001

WORKDIR /home/node

COPY ["package.json", "./"]
COPY ["yarn.lock", "./"]

RUN yarn

COPY . .

CMD yarn docker:${APP_ENV}


FROM node:12.16.0-alpine3.11

EXPOSE 8080

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app

CMD ["yarn", "start"]

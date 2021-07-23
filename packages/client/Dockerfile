FROM node:14 as client

# set the working direction
WORKDIR /client

# install app dependencies
COPY ./packages/client/package*.json ./packages/client/yarn.lock /client/

RUN yarn

COPY . ./

EXPOSE 3000

CMD ["yarn", "client"]
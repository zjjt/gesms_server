FROM node

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN yarn 

# Bundle app source
COPY . /app
RUN yarn build

EXPOSE 4000
CMD [ "yarn", "start" ]
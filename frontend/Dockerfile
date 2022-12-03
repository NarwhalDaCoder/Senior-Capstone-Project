# pull base image
FROM node:16.18.1-buster-slim

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 19006 for node, and 19001 and 19002 (tests) for debug
ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/react-native-app
WORKDIR /opt/react-native-app
ENV PATH /opt/react-native-app/.bin:$PATH
COPY ./react-native-app/package.json ./react-native-app/package-lock.json ./
RUN npm install

# copy in our source code last, as it changes the most
WORKDIR /opt/react-native-app/app
# for development, we bind mount volumes; comment out for production
COPY ./react-native-app .

ENTRYPOINT ["npm", "run"]
CMD ["web"]
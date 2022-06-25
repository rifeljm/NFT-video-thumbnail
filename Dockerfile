FROM mhart/alpine-node:16
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install pm2 -g
CMD [ "pm2-runtime", "--watch", "npm", "--", "start" ]
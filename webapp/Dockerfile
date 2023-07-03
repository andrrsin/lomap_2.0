FROM node:16-alpine
LABEL name="LOMAP"
COPY . /app
WORKDIR /app

#Install the dependencies
RUN npm install

#Create an optimized version of the webapp
RUN npm run build

#Execute npm run prod to run the server
CMD [ "npm", "run", "prod" ]

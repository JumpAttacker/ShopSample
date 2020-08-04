# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]


# FROM node:12-alpine as build
# WORKDIR /app
# COPY package.json /app/package.json
# RUN npm install --silent
# # RUN npm install --only=prod  --silent
# COPY . /app
# RUN npm run build
# FROM nginx:1.16.0-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 5000
# CMD ["nginx", "-g", "daemon off;"]
FROM node:19.6-slim
WORKDIR /
COPY . /
RUN npm install
RUN npm run build
EXPOSE 3100
CMD npm run start
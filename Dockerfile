FROM node:18.12.0

ENV DEVENV=DEPLOY

WORKDIR /joblogBackend
COPY . /joblogBackend
RUN npm install
EXPOSE 443
CMD ["npm", "test"]
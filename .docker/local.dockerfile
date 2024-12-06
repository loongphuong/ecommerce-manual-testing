FROM node:18.12.1-alpine

# Create app folder
RUN mkdir -p /var/app
WORKDIR /var/app

# Copy app files into app folder
COPY . /var/app

RUN yarn install

# Development
CMD ["yarn", "start"]

FROM node:18.12.1-alpine

# Create app folder
RUN mkdir -p /var/app
WORKDIR /var/app

# Copy app files into app folder
COPY . /var/app

# Production
# RUN yarn install -g pm2
# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]


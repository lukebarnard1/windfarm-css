FROM node:16-alpine
RUN corepack enable
RUN corepack prepare yarn@stable --activate
ENV NODE_ENV=production
ENV YARN_CACHE_FOLDER=/.yarn-cache
WORKDIR /input/lb-cmp

#

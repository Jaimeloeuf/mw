# =============== To build an image with this Dockerfile =======================
# docker build -t mw-api -f ./.Dockerfile .
#
# =============== To debug docker image build process ==========================
# docker build --progress plain --no-cache -t mw-api -f ./.Dockerfile .
#
# =============== To run the image built with this Dockerfile ==================
# docker run -d --rm -p 3000:3000 --env-file ./.env --name mw-api mw-api
#
# Why is RUN used and why they are split up:
# Use RUN instruction to install packages required by executing commands on top
# of the current image to create a new layer by committing the results. The RUN
# commands are all split up as different ephemeral intermmediate images to
# optimize the build process for caching.

# Use alpine image to reduce image size
FROM node:20-alpine

WORKDIR /server

# Using --force flag because of eslint peer dependency issues.
COPY ./package*.json ./
RUN npm i --force

# Copy over in order of which is most likely to change at the bottom
COPY ./tsconfig.json ./tsconfig.json
COPY ./eslint.config.js ./eslint.config.js
COPY ./eslint-rules/ ./eslint-rules/
COPY ./src/ ./src/

# Build
RUN npm run lint
RUN npm run build

# Define exposed ports, acting only as documentation. Docker run STILL need to
# map the ports with -p option.
EXPOSE 3000

# ENTRYPOINT Command ensures this command runs when the container is spun up
# and cannot be overwritten with shell arguements like CMD.
# Use exec form instead of shell form to run it as the main process.
ENTRYPOINT ["npm", "run", "start"]
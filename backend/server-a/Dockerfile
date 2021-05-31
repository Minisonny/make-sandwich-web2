# This is where you define the image for
# the server A, which implements the Swagger API.

# Start by copying the server stub to this directory.

# You should then use Noje 10 image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

# First line is provided for your convenience.
# This line fetches the Node Docker image with tag "10"
# from Docker Hub.
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm ci
COPY . .
RUN chmod +x ./utils/wait-for-it.sh

EXPOSE 3001

ENV DB_URL=<MONGO ATLAS URI>
ENV PORT=3001

CMD ["npm", "start"]

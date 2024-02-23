# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
COPY package*.json ./
# If you're using Yarn, copy yarn.lock as well and use `yarn install` below

# Install any dependencies
RUN npm install
# If building for production, use `npm ci --only=production`

# Bundle app source inside the Docker image
COPY . .

# Build your application if necessary
# RUN npm run build

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 4000

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]
# If you're using a different start command, adjust accordingly

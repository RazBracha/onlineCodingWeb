# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Expose the port that your app will run on
EXPOSE 5000

# Define the command to run your application
CMD ["node", "app.js"]

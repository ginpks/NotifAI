# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install
RUN npm install express
RUN npm install cors

# Copy the remaining application files
COPY . .

# Port number 3000
EXPOSE 3000

# Port number for local postgresql database
# EXPOSE 5432

# Command to run the application when the container starts
CMD [ "npm", "start" ]

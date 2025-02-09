# Use Node.js version 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /myapp

# Copy all files from the current directory to /myapp in the container
COPY . /myapp/

# Install dependencies using npm ( till this point package is packed)
RUN npm install

# Set the default command to start the application (here the command runs when 
#when the container starts
#)
CMD ["npm","run","dev"]

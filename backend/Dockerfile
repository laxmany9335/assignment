# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose backend port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]

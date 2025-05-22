# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire frontend code
COPY . .

# Build the frontend (optional if using Next.js SSR)
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Run the frontend
CMD ["npm", "start"]

# Use official Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package.json first
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
# Stage 1: Build the React app
FROM node:20.18-alpine3.20 AS build

WORKDIR /app

# Copy package.json and package-lock.json for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the React app runs on
EXPOSE 3000

# Run the React development server
CMD ["npm", "start"]

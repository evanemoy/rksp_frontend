# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

# Build the app (replace if using custom build script)
RUN npm run build

# Expose port 80 (default for web)
EXPOSE 80

# Serve the app using `serve`
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "80"]
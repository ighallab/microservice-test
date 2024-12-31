# Stage 1: Build the application using Node.js
FROM node:16 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (for faster npm install caching)
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Run TypeScript build (ensure that npm run build is properly defined)
RUN npm run build

# Stage 2: Create a smaller production image from node:16-slim
FROM node:16-slim

# Set the NODE_ENV to production
ENV NODE_ENV=production

# Set the working directory in the production image
WORKDIR /usr/src/app


# Copy only the production dependencies from the build stage
COPY --from=build /usr/src/app/package*.json ./

# Install only the production dependencies (prune dev dependencies)
RUN npm install --production

# Copy the built application code (from the build stage)
COPY --from=build /usr/src/app/dist ./dist

# Expose the port your app listens on (4444 in this case)
EXPOSE 4444

# Start the app (adjust path if necessary)
CMD ["node", "dist/src/server.js"]

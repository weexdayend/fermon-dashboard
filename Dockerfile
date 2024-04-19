# Use the official Node.js 18 image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json or package*.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Install Prisma globally
RUN npm install -g prisma

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 7654

# Run the app in production mode
CMD ["npm", "start"]
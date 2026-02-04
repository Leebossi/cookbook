#!/bin/bash

set -e

echo "🚀 Starting cookbook deployment..."

# Configuration
DEPLOY_DIR="/var/www/cookbook"
PROJECT_DIR="/home/leevi/projects/cookbook"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📦 Building client...${NC}"
cd "$PROJECT_DIR/client"
npm install
npm run build

echo -e "${YELLOW}📦 Building server...${NC}"
cd "$PROJECT_DIR/server"
npm install
npx tsc

echo -e "${YELLOW}📋 Copying built files...${NC}"
# Copy client build
sudo cp -r "$PROJECT_DIR/client/dist/"* "$DEPLOY_DIR/client/"

# Copy server files
sudo cp -r "$PROJECT_DIR/server/dist" "$DEPLOY_DIR/server/"

# Start server using PM2
echo -e "${YELLOW}🚀 Starting server with PM2...${NC}"
pm2 stop cookbook || true
pm2 start "$DEPLOY_DIR/server/dist/index.js" --name cookbook
pm2 save

echo -e "${GREEN}✅ Deployment complete!${NC}"
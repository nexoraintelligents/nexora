FROM node:20-slim

WORKDIR /app

# copy package files
COPY package*.json ./

# install deps
RUN npm install

# copy project
COPY . .

# build TS
RUN npm run build

# Render injects PORT automatically
ENV NODE_ENV=production

EXPOSE 4001

CMD ["npm", "start"]

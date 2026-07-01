FROM node:20-bookworm-slim

# Chromium + fonts (emoji + latin). Poppins/Open Sans are fetched from Google Fonts at render time.
RUN apt-get update && apt-get install -y --no-install-recommends \
      chromium \
      fonts-noto-color-emoji \
      fonts-liberation \
      ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PORT=4000

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY . .

EXPOSE 4000
CMD ["node", "server.js"]

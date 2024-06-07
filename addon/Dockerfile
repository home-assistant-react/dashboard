FROM node:20

# Python 3 HTTP Server serves the current working dir
# So let's set it to our add-on persistent data directory.
WORKDIR /app

COPY dist /app

RUN npm install
RUN npm install --include=optional sharp
RUN chmod +x start-addon.sh
CMD ["./start-addon.sh"]

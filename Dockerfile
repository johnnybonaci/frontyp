FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG VITE_MS_AUTH_API_URL && \ 
    VITE_MS_ORGANIZATION_API_URL && \ 
    VITE_MS_PROCESSES_API_URL && \
    VITE_MS_PROJECTS_API_URL && \
    VITE_MS_SURVEYS_API_URL && \
	VITE_CAPTURE_EXTENSION_INSTALL_URL

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx && chgrp -R root /var/cache/nginx && \
    sed -i 's/<port>/8080/g' /etc/nginx/nginx.conf && \
    sed -i 's/<url>/example.com/g' /etc/nginx/nginx.conf && \
    sed -i 's|<DIR>|/usr/share/nginx/html|g' /etc/nginx/nginx.conf && \
    addgroup nginx root 

EXPOSE 8080

USER nginx

CMD ["nginx", "-g", "daemon off;"]
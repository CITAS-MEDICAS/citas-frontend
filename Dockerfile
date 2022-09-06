FROM tangramor/nginx-php8-fpm:php8_node15
RUN echo "INICIO - AJUSTANDO FRONTEND - SALUD"
RUN apk update


COPY .env.prod .env.local
RUN yarn
#RUN yarn run build


RUN echo "FIN - AJUSTANDO FRONTEND - SALUD"

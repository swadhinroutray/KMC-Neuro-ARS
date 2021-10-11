server {
	listen 80;
	listen [::]:80;

	server_name kmcars.com, www.kmcars.com;

	location /api {
		proxy_pass http://api:8080;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}

	location / {
		root /usr/share/nginx/html;
		try_files $uri  /index.html;
	}
}

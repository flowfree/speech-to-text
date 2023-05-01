Frontend
========

React frontend for the Speech to Text application.

## Requirements

Make sure you have the recent Node.js version installed on your machine.

## Run the React application

1.  Generate the SSL certificates for the local dev server using [mkcert](https://github.com/FiloSottile/mkcert) by following the instructions on the Github page. The rest of the steps below will assume that you already have the certificate named `localhost.pem` and the key file named `localhost-key.pem` 

1.  Open the `package.json` file and modify the `start` command to point to your certificates. For example, if the path of your certificate is `~/certs/localhost.pem` and the path of your key is `~/certs/localhost-key.pem`:

        "start": "HTTPS=true SSL_CRT_FILE=~/certs/localhost.pem SSL_KEY_FILE=~/certs/localhost-key.pem react-scripts start",

1.  Start the React development server:

        npm start

You can open the React frontend using your browser at `https://localhost:3000`.

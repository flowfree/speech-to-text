Backend
=======

## Requirements

Make sure you have Python 3.8+ installed on your machine.

## Run the development server

1.  Generate the SSL certificates for the local dev server using [mkcert](https://github.com/FiloSottile/mkcert) by following the guide. We will assume that you have generated both the certificate named `localhost.pem` and the key file named `localhost-key.pem` 

1.  Change your current working directory to the backend code:

        cd backend

1.  Create and activate new virtual env:

        python3 -m venv venv
        . venv/bin/activate

1.  Install the required packages:

        pip install -r requirements.txt

1.  Run the SSL development server:

        uvicorn src.main:app \
            --ssl-certfile /path/to/localhost.pem \
            --ssl-keyfile /path/to/localhost-key.pem \
            --reload

The Speech to Text API will be available at `https://localhost:8000`.

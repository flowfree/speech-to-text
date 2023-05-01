Backend
=======

The API endpoints for the Speech to Text application.

## Requirements

Make sure you have Python 3.8+ installed on your machine.

## Run the development server

1.  Generate the SSL certificates for the local dev server using [mkcert](https://github.com/FiloSottile/mkcert) by following the instructions on the Github page. The rest of the steps below will assume that you already have the certificate named `localhost.pem` and the key file named `localhost-key.pem` 

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

## Using the API

You can use Curl to upload your audio file and get the transcription. For example, to transcribe and audio file named `sample.wav`:

    curl -F audio=@sample.wav https://localhost:8000/predict 

It will return JSON file like this:

    {
      "audio": "sample.wav", 
      "text": "..."
    }

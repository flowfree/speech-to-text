Backend
=======

The API endpoints for the Speech to Text application.

## Requirements

Make sure you have Python 3.8+ installed on your machine.

## Run the development server

1.  Change your current working directory to the backend code:

        cd backend

1.  Create and activate new virtual env:

        python3 -m venv venv
        . venv/bin/activate

1.  Install the required packages:

        pip install -r requirements.txt

1.  Run the SSL development server:

        uvicorn src.main:app

The Speech to Text API will be available at `http://localhost:8000`.

## Using the API

You can use Curl to upload your audio file and get the transcription. For example, to transcribe and audio file named `sample.wav`:

    curl -F audio=@sample.wav http://localhost:8000/predict 

It will return JSON file like this:

    {
      "audio": "sample.wav", 
      "text": "..."
    }

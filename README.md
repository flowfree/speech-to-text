Speech to Text
==============

**Speech to Text** is a full-stack application for transcribing audio files into written text. To transcribe an audio, the client send the audio file by making HTTP POST request to the API endpoint and it will return the transcription back to the client.

This project uses the OpenAI's [Whisper model](https://huggingface.co/openai/whisper-small.en) which does excellent job for transcribing audio to text. The model is downloaded from the HuggingFace model hub and saved locally for inference. This allows users or organizations to transcribe unlimited audio files with extra low cost.

## Running the application

After you have download this repository, simply run the application with:

    docker compose up

Make sure you have Docker installed on your machine.

Or if you prefer to run the backend and the frontend separately, refer to the README files in both directories. In short, you need to run these commands:

    # backend
    python -m venv venv
    . venv/bin/activate
    pip install -r requirements.txt
    univorn src.main:app

    # frontend
    npm install 
    npm start

## License

MIT

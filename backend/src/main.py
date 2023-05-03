import logging
from datetime import datetime
import tempfile
import pathlib

from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost',
        'http://localhost:3000',
        'https://localhost',
        'https://localhost:3000'
    ], 
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
def home():
    return {
        'message': 'API is up and running.',
        'time': datetime.now().isoformat(),
    }


model = 'openai/whisper-small.en'
logging.info(f'Downloading model {model}...')
transcriber = pipeline(
    'automatic-speech-recognition', 
    model=model,
    chunk_length_s=30,
)

@app.post('/predict')
async def predict(audio: UploadFile):
    ext = pathlib.Path(audio.filename).suffix
    with tempfile.NamedTemporaryFile(suffix=ext) as tmp_file:
        tmp_file.write(audio.file.read())
        result = transcriber(tmp_file.name, max_new_tokens=100)

    return {
        'audio': audio.filename,
        'text': result['text'],
    }

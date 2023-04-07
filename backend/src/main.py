from datetime import datetime
import tempfile
import pathlib

from fastapi import FastAPI, UploadFile
from transformers import pipeline


app = FastAPI()


@app.get('/')
def home():
    return {
        'message': 'API is up and running.',
        'time': datetime.now().isoformat(),
    }


model = 'openai/whisper-small.en'
transcriber = pipeline(
    'automatic-speech-recognition', 
    model=model,
    chunk_length_s=30,
)


@app.post('/speech2text')
async def speech2text(audio: UploadFile):
    ext = pathlib.Path(audio.filename).suffix
    with tempfile.NamedTemporaryFile(suffix=ext) as tmp_file:
        tmp_file.write(audio.file.read())
        result = transcriber(tmp_file.name, max_new_tokens=100)

    return {
        'audio': audio.filename,
        'text': result['text'],
    }

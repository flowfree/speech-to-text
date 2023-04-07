from datetime import datetime

from fastapi import FastAPI, UploadFile


app = FastAPI()


@app.get('/')
def home():
    return {
        'message': 'API is up and running.',
        'time': datetime.now().isoformat(),
    }


@app.post('/speech2text')
async def speech2text(audio: UploadFile):
    print(audio.file.read())
    return {'filename': audio.filename}

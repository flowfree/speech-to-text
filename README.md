Speech to Text
==============

**Speech to Text** is an application that provides an API and a frontend for transcribing audio files into written text. To transcribe an audio, the client send the audio file by making HTTP POST request to the API endpoint and it will return the transcription back to the client.

This project uses the OpenAI's [Whisper model](https://huggingface.co/openai/whisper-small.en) which does excellent job for transcribing audio to text. The model is downloaded from the HuggingFace model hub and saved locally for inference. This allows users or organizations to transcribe unlimited audio files with extra low cost.

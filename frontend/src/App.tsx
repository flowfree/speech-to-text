import React, { useState } from 'react'
import axios, { AxiosError, AxiosProgressEvent } from 'axios'

interface Prediction {
  audio: string
  text: string
}

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [predictions, setPredictions] = useState<Prediction[]>([])

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  function handleUploadProgress(progressEvent: AxiosProgressEvent) {
    if (progressEvent.total) {
      const percentage = Math.round(progressEvent.loaded * 100) / progressEvent.total
      setUploadProgress(percentage)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (selectedFile) {
      const baseURL = process.env.REACT_APP_API_BASE_URL
      const formData = new FormData()
      formData.append('audio', selectedFile)

      try {
        const { data } = await axios.post(`${baseURL}/predict`, formData, {
          onUploadProgress: handleUploadProgress
        })
        setPredictions([data, ...predictions])
        setUploadProgress(null)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error)
        }
      }
    }
  }

  function handleReset(e: React.FormEvent<HTMLFormElement>) {
    setUploadProgress(null)
    setSelectedFile(null)
    setPredictions([])
  }

  function handleDownloadTranscription(idx: number) {
    const { audio, text } = predictions[idx]
    const filename = audio.substring(0, audio.lastIndexOf('.')) + '.txt';

    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div>
      <h1>Speech to Text</h1>
      <p>Select your <code>.wav</code> file:</p>
      <form id="audio-form" action="" method="post" onSubmit={handleSubmit} onReset={handleReset}>
        <p>
          <input type="file" name="audio" onChange={handleFileInputChange} />
        </p>
        <p>
          <button type="submit">Submit</button> &nbsp;
          <input type="reset" value="Reset" />
        </p>
      </form>
      {uploadProgress && <p>Upload: {uploadProgress}%</p>}
      <ul>
        {predictions.map((pred, idx) => (
          <li key={pred.audio + '-' + idx}>
            {pred.audio}
            <button onClick={e => handleDownloadTranscription(idx)}>
              Text
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import FileDragAndDrop from './FileDragAndDrop'
import AudioList from './AudioList'
import InfoAlert from '../../components/InfoAlert'
import axios, { AxiosError, AxiosProgressEvent } from 'axios'
import { AudioFile } from './types'

const baseURL = process.env.REACT_APP_API_BASE_URL

export default function Transcriber() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([])
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  useEffect(() => {
    if (currentIndex !== null) {
      transcribe()
    }
  }, [currentIndex])

  async function handleUploads(files: FileList) {
    const arr: AudioFile[] = []
    for (let i = 0; i < files.length; i++) {
      arr.push({ 
        name: files[i].name,
        file: files[i],
        status: 'READY'
      })
    }

    setAudioFiles(arr)
    if (arr.length) {
      setCurrentIndex(0)
    }
  }

  function handleUploadProgress(progressEvent: AxiosProgressEvent) {
    if (currentIndex === null) {
      return
    }

    const audioFile = audioFiles[currentIndex]
    if (progressEvent.total) {
      const uploadPercentage = Math.round(progressEvent.loaded * 100) / progressEvent.total
      const newState: AudioFile[] = audioFiles.map(item => {
        if (item.name === audioFile.name) {
          if (uploadPercentage === 100) {
            return {...item, status: 'TRANSCRIBING'}
          } else {
            return {...item, status: 'UPLOADING', uploadPercentage}
          }
        }
        return item
      })
      setAudioFiles(newState)
    }
  }

  async function transcribe() {
    if (currentIndex === null || currentIndex >= audioFiles.length) {
      return
    }

    const audioFile = audioFiles[currentIndex]

    const formData = new FormData()
    formData.append('audio', audioFile.file)

    try {
      const { data } = await axios.post(`${baseURL}/predict`, formData, {
        onUploadProgress: handleUploadProgress
      })
      const newAudioFiles: AudioFile[] = audioFiles.map(item => {
        if (item.name === audioFile.name) {
          return {...item, status: 'DONE', transcription: data.text}
        }
        return item
      })
      const nextIndex = newAudioFiles.findIndex(item => item.status === 'READY')

      setAudioFiles(newAudioFiles)
      setCurrentIndex(nextIndex >= 0 ? nextIndex : null)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <FileDragAndDrop onSelected={handleUploads} />
      {currentIndex !== null && (
        <div className="mt-7">
          <InfoAlert>
            We are transcribing your audio files. Please keep your browser and this tab open.
          </InfoAlert>
        </div>
      )}
      {audioFiles.length > 0 && (
        <div className="mt-7 max-w-4xl mx-auto">
          <AudioList audioFiles={audioFiles} />
        </div>
      )}
    </div>
  )
}

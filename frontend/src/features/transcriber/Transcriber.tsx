import React, { useState, useEffect } from 'react'
import FileDragAndDrop from './FileDragAndDrop'
import AudioList from './AudioList'
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
      setCurrentIndex(null)
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
      setAudioFiles(newAudioFiles)
    } catch (error) {
      console.error(error)
    } finally {
      setCurrentIndex(currentIndex+1)
    }
  }

  return (
    <div>
      <FileDragAndDrop onSelected={handleUploads} />
      {audioFiles.length > 0 && (
        <AudioList audioFiles={audioFiles} />
      )}
    </div>
  )
}

import React from 'react'
import Transcriber from './features/transcriber/Transcriber'

export default function App() {
  return (
    <div>
      <div className="mt-10 max-w-4xl mx-auto flex flex-col gap-2 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Speech to Text
        </h1>
        <p className="text-xl font-light text-gray-500">
          Online service for converting your audio files into text
        </p>
      </div>
      <div className="mt-7 max-w-4xl mx-auto">
        <Transcriber />
      </div>
    </div>
  )
}

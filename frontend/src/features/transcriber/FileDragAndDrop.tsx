import React, { useState, useRef } from 'react'

interface Props {
  onSelected: (files: FileList) => void
}

export default function FileDragAndDrop({ onSelected }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files) {
      onSelected(files)
    }
  };

  function handleClick() {
    setIsDragging(true)
    if (formRef.current) {
      formRef.current.reset()
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsDragging(false)
    const files = event.target.files
    if (files) {
      onSelected(files)
    }
  };

  function getBorder() {
    return isDragging ? 'border border-dashed border-indigo-400' : 'border border-slate-100'
  }

  return (
    <div 
      onDragEnter={e => setIsDragging(true)}
      onDragLeave={e => setIsDragging(false)}
      onDragEnd={e => setIsDragging(false)}
      onDragOver = {handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      className={getBorder() + " py-7 flex flex-col items-center justify-center gap-4 rounded-2xl bg-slate-100 cursor-pointer"}
    >
      <p className="text-[80px] text-indigo-600">
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-brand-500 dark:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95A5.469 5.469 0 0112 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11A2.98 2.98 0 0122 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"></path>
        </svg>
      </p>
      <div className="flex flex-col gap-1 items-center">
        <p className="text-base font-semibold">
          Drop your audio files here, or {' '}
          <span className="text-indigo-700">
            Browse
          </span>
        </p>
        <p className="text-sm text-gray-500">
          MP3, OGG, and WAV files are allowed
        </p>
        <form ref={formRef} action="/" method="post">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileInputChange} 
            multiple={true}
            className="hidden" 
          />
        </form>
      </div>
    </div>
  )
}
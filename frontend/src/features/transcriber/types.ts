export interface AudioFile {
  name: string
  file: File
  status: 'READY' | 'UPLOADING' | 'TRANSCRIBING' | 'FAILED' | 'DONE'
  uploadPercentage?: number
  transcription?: string
}

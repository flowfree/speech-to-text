interface Props {
  status: 'READY' | 'UPLOADING' | 'TRANSCRIBING' | 'FAILED' | 'DONE'
  uploadPercentage?: number
}

export default function StatusLabel({ status, uploadPercentage }: Props) {
  let color = ''
  switch (status) {
    case 'READY':
      color = 'bg-gray-100 text-gray-700'
      break
    case 'UPLOADING':
      color = 'bg-sky-100 text-sky-800'
      break
    case 'TRANSCRIBING':
      color = 'bg-sky-100 text-sky-800'
      break
    case 'FAILED':
      color = 'bg-red-100 text-red-800'
      break
    case 'DONE':
      color = 'bg-green-100 text-green-800'
      break
    default:
      color = 'bg-gray-100 text-gray-700'
      break
  }

  return (
    <div className={`${color} py-1 px-2 flex gap-1 items-center rounded-sm font-semibold text-xs`}>
      {status === 'TRANSCRIBING' && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {status}
      {uploadPercentage && (
        <span>({uploadPercentage}%)</span>
      )}
    </div>
  )  
}

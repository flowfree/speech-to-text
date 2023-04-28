interface Props {
  onClick: () => void
  enabled?: boolean
}

export default function DownloadButton({ onClick, enabled }: Props) {
  return (
    <button 
      disabled={!enabled}
      onClick={onClick}
      className="py-1 px-3 flex gap-1 items-center rounded-full border border-indigo-600 hover:border-indigo-500 text-indigo-700 hover:text-indigo-600 font-semibold disabled:border-gray-200 disabled:text-gray-400"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      Download
    </button>
  )
}

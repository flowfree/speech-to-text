import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function InfoAlert({ children }: Props) {
  return (
    <div className="py-3 px-4 flex gap-2 items-center rounded-md bg-sky-50 text-sky-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
      {children}
    </div>
  )
}

import React from 'react'
import StatusLabel from '../../components/StatusLabel'
import DownloadButton from '../../components/DownloadButton'
import { AudioFile } from './types'

interface Props {
  audioFiles: AudioFile[]
}

export default function AudioList({ audioFiles }: Props) {
  function handleDownloadTranscription(idx: number) {
    const { name, transcription } = audioFiles[idx]
    const filename = name.substring(0, name.lastIndexOf('.')) + '.txt';

    if (transcription === undefined) {
      console.error('Transcription is empty!')
      return
    }

    const element = document.createElement('a');
    const file = new Blob([transcription], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <table className="mt-4 min-w-full divide-y divide-gray-300 text-sm">
      <thead>
        <tr className="">
          <th className="py-2 px-4 text-left">Audio File</th>
          <th className="w-40 py-2 px-4 text-center">Status</th>
          <th className="w-40 py-2 px-4 text-center">Transcription</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {audioFiles.map((audioFile, idx) => (
          <tr key={idx}>
            <td className="py-2 px-4 text-left">
              {audioFile.name}
            </td>
            <td className="py-2 px-4 text-center flex justify-center">
              <StatusLabel 
                status={audioFile.status} 
                uploadPercentage={audioFile.uploadPercentage}
              />
            </td>
            <td className="py-2 px-4 text-center">
              <DownloadButton 
                enabled={audioFile.status === 'DONE'}
                onClick={() => handleDownloadTranscription(idx)} 
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

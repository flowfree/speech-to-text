import React, { useState } from 'react'

export default function App() {
  function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
  }

  return (
    <div>
      <h1>Speech to Text</h1>
      <p>Select your <code>.wav</code> file:</p>
      <form action="" method="post">
        <p><input type="file" name="audio" /></p>
        <p>
          <button type="submit">Submit</button> &nbsp;
          <button onClick={handleReset}>Reset</button>
        </p>
      </form>
    </div>
  )
}

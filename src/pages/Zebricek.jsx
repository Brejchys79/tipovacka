import React, { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import { ref, onValue } from 'firebase/database'

export default function Zebricek(){
  const [list, setList] = useState([])

  useEffect(()=>{
    const unsub = onValue(ref(db, 'body'), (snap)=>{
      const data = snap.val() || {}
      const arr = Object.values(data).sort((a,b)=> b.body - a.body)
      setList(arr)
    })
    return ()=>unsub()
  }, [])

  return (
    <div>
      <h1>Žebříček</h1>
      <div className="card">
        <table>
          <thead>
            <tr><th>#</th><th>Soutěžící</th><th>Body</th></tr>
          </thead>
          <tbody>
            {list.map((u, idx)=> (
              <tr key={idx}>
                <td>{idx+1}</td>
                <td>{u.email}</td>
                <td>{u.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

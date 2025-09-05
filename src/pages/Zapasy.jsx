import React, { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import { ref, onValue, set } from 'firebase/database'

const userKeyFromEmail = (email)=> email.replace(/\./g, '_')

export default function Zapasy({ user }){
  const [zapasy, setZapasy] = useState([])
  const [tipy, setTipy] = useState({}) // local edits

  useEffect(()=>{
    const unsub = onValue(ref(db, 'zapasy'), (snap)=>{
      const data = snap.val() || {}
      const list = Object.entries(data).map(([id, z])=> ({id, ...z}))
      // řazení dle data (nejbližší první)
      list.sort((a,b)=> (a.datum||0)-(b.datum||0))
      setZapasy(list)
    })
    return ()=>unsub()
  }, [])

  const odeslatTip = async (zapasId)=>{
    if(!user) return alert('Musíš být přihlášen.')
    const t = tipy[zapasId] || {}
    const payload = {
      user: user.email,
      domaci: parseInt(t.domaci||0),
      hoste: parseInt(t.hoste||0),
      strelec: (t.strelec||'').trim(),
      timestamp: Date.now()
    }
    const userKey = userKeyFromEmail(user.email)
    await set(ref(db, `tipy/${zapasId}/${userKey}`), payload)
    alert('Tip uložen.')
  }

  return (
    <div>
      <h1>Zápasy</h1>
      {zapasy.map(z=> (
        <div className="card" key={z.id}>
          <h3>{z.domaci} vs {z.hoste} {z.zapasKola && <span className="badge">🔥 Zápas kola</span>}</h3>
          <small className="muted">{z.datum ? new Date(z.datum).toLocaleString() : ''}</small>
          <div className="grid grid-2" style={{marginTop:8}}>
            <div>
              <label>Góly domácí</label>
              <input type="number" onChange={e=> setTipy(s=> ({...s, [z.id]: {...s[z.id], domaci: e.target.value}}))} />
            </div>
            <div>
              <label>Góly hosté</label>
              <input type="number" onChange={e=> setTipy(s=> ({...s, [z.id]: {...s[z.id], hoste: e.target.value}}))} />
            </div>
          </div>
          <label style={{marginTop:8}}>Střelec</label>
          <input type="text" onChange={e=> setTipy(s=> ({...s, [z.id]: {...s[z.id], strelec: e.target.value}}))} />
          <div style={{marginTop:12}}>
            <button className="primary" onClick={()=>odeslatTip(z.id)}>Odeslat tip</button>
          </div>
        </div>
      ))}
    </div>
  )
}

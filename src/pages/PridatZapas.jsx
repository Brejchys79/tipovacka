import React, { useState } from 'react'
import { db } from '../firebase.js'
import { ref, push } from 'firebase/database'

export default function PridatZapas(){
  const [domaci, setDomaci] = useState('')
  const [hoste, setHoste] = useState('')
  const [datum, setDatum] = useState('')
  const [zapasKola, setZapasKola] = useState(false)

  const ulozit = async ()=>{
    if(!domaci || !hoste) return alert('Vyplň týmy.')
    await push(ref(db, 'zapasy'), {
      domaci,
      hoste,
      zapasKola,
      datum: datum ? new Date(datum).getTime() : Date.now()
    })
    setDomaci(''); setHoste(''); setDatum(''); setZapasKola(false)
    alert('Zápas přidán.')
  }

  return (
    <div className="card">
      <h2>Přidat zápas</h2>
      <div className="grid grid-2">
        <div>
          <label>Domácí tým</label>
          <input value={domaci} onChange={e=>setDomaci(e.target.value)} />
        </div>
        <div>
          <label>Hostující tým</label>
          <input value={hoste} onChange={e=>setHoste(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-2">
        <div>
          <label>Datum & čas</label>
          <input type="datetime-local" value={datum} onChange={e=>setDatum(e.target.value)} />
        </div>
        <div style={{display:'flex', alignItems:'center', gap:8, marginTop:22}}>
          <input type="checkbox" checked={zapasKola} onChange={e=>setZapasKola(e.target.checked)} />
          <span>Zápas kola (dvojnásobné body + bonus)</span>
        </div>
      </div>
      <div style={{marginTop:12}}>
        <button className="primary" onClick={ulozit}>Uložit</button>
      </div>
    </div>
  )
}

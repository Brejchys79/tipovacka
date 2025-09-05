import React, { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import { ref, onValue } from 'firebase/database'

export default function PrehledTipu(){
  const [zapasy, setZapasy] = useState({})
  const [tipy, setTipy] = useState({})

  useEffect(()=>{
    const u1 = onValue(ref(db, 'zapasy'), s=> setZapasy(s.val()||{}))
    const u2 = onValue(ref(db, 'tipy'), s=> setTipy(s.val()||{}))
    return ()=> { u1(); u2(); }
  }, [])

  return (
    <div>
      <h1>Přehled tipů</h1>
      {Object.entries(tipy).map(([zapasId, tips])=>{
        const z = zapasy[zapasId]
        if(!z) return null
        return (
          <div className="card" key={zapasId}>
            <h3>{z.domaci} vs {z.hoste} {z.zapasKola && <span className="badge">🔥 Zápas kola</span>}</h3>
            <table>
              <thead><tr><th>Soutěžící</th><th>Tip</th><th>Střelec</th><th>Čas</th></tr></thead>
              <tbody>
                {Object.values(tips).map((t, i)=> (
                  <tr key={i}>
                    <td>{t.user}</td>
                    <td>{t.domaci} : {t.hoste}</td>
                    <td>{t.strelec || '-'}</td>
                    <td><small className="muted">{new Date(t.timestamp).toLocaleString()}</small></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

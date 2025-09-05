import React, { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import { ref, onValue, update, get, child, set } from 'firebase/database'

const userKeyFromEmail = (email)=> email.replace(/\./g, '_')

function spocitejBody(tip, vysledek, zapasKola){
  let body = 0
  const td = parseInt(tip.domaci)
  const th = parseInt(tip.hoste)
  const vd = parseInt(vysledek.domaci)
  const vh = parseInt(vysledek.hoste)

  if(td === vd && th === vh){
    body += 5
  } else {
    const tipVyhra = td > th ? 1 : td < th ? -1 : 0
    const vysVyhra = vd > vh ? 1 : vd < vh ? -1 : 0
    if(tipVyhra === vysVyhra) body += 3
  }
  if((tip.strelec||'').trim().toLowerCase() && (vysledek.strelec||'').trim().toLowerCase()
    && tip.strelec.trim().toLowerCase() === vysledek.strelec.trim().toLowerCase()){
    body += 3
  }
  if(zapasKola && body > 0){
    body += 3
  }
  return body
}

export default function Admin(){
  const [zapasy, setZapasy] = useState([])
  const [vysledky, setVysledky] = useState({})
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    const unsub = onValue(ref(db, 'zapasy'), (snap)=>{
      const data = snap.val() || {}
      const list = Object.entries(data).map(([id, z])=> ({id, ...z}))
      setZapasy(list)
    })
    return ()=>unsub()
  }, [])

  const ulozitVysledek = async (z)=>{
    const v = vysledky[z.id]
    if(!v || v.domaci===undefined || v.hoste===undefined) return alert('Zadej výsledek i střelce.')

    await update(ref(db, `zapasy/${z.id}`), {
      domaciGol: parseInt(v.domaci),
      hosteGol: parseInt(v.hoste),
      strelec: (v.strelec||'').trim()
    })

    // načti tipy pro zápas
    const tipsSnap = await get(ref(db, `tipy/${z.id}`))
    const tips = tipsSnap.val() || {}

    // spočítej a zapiš body každému soutěžícímu
    const vys = { domaci: parseInt(v.domaci), hoste: parseInt(v.hoste), strelec: (v.strelec||'').trim() }
    const updates = []
    for(const [userKey, tip] of Object.entries(tips)){
      const gained = spocitejBody(tip, vys, !!z.zapasKola)
      const bodyRef = ref(db, `body/${userKey}`)
      const curSnap = await get(bodyRef)
      const cur = curSnap.val() || { email: tip.user, body: 0 }
      await set(bodyRef, { email: tip.user, body: cur.body + gained })
      updates.push({ email: tip.user, gained })
    }
    setMsg(`Hotovo. Vyhodnoceno ${Object.keys(tips).length} tipů.`)
  }

  return (
    <div>
      <h1>Admin – vyhodnocení</h1>
      {msg && <p className="success">{msg}</p>}
      {zapasy.map(z=> (
        <div className="card" key={z.id}>
          <h3>{z.domaci} vs {z.hoste} {z.zapasKola && <span className="badge">🔥 Zápas kola</span>}</h3>
          <div className="grid grid-2">
            <div>
              <label>Góly domácí (skutečnost)</label>
              <input type="number" onChange={e=> setVysledky(s=> ({...s, [z.id]: {...s[z.id], domaci: e.target.value}}))} />
            </div>
            <div>
              <label>Góly hosté (skutečnost)</label>
              <input type="number" onChange={e=> setVysledky(s=> ({...s, [z.id]: {...s[z.id], hoste: e.target.value}}))} />
            </div>
          </div>
          <label style={{marginTop:8}}>Střelec (skutečný)</label>
          <input type="text" onChange={e=> setVysledky(s=> ({...s, [z.id]: {...s[z.id], strelec: e.target.value}}))} />
          <div style={{marginTop:12}}>
            <button className="primary" onClick={()=> ulozitVysledek(z)}>Uložit a vyhodnotit</button>
          </div>
        </div>
      ))}
    </div>
  )
}

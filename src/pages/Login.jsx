import React, { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'

export default function Login(){
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [mode, setMode] = useState('login')
  const [msg, setMsg] = useState('')

  const handle = async (e)=>{
    e.preventDefault()
    setMsg('')
    try{
      if(mode==='login'){
        await signInWithEmailAndPassword(auth, email, pwd)
        setMsg('Přihlášení proběhlo úspěšně.')
      } else {
        await createUserWithEmailAndPassword(auth, email, pwd)
        setMsg('Účet vytvořen a přihlášen.')
      }
    } catch(err){
      setMsg('Chyba: ' + err.message)
    }
  }

  return (
    <div className="card" style={{maxWidth:460, margin:'24px auto'}}>
      <h2>{mode==='login' ? 'Přihlášení' : 'Registrace'}</h2>
      <form onSubmit={handle}>
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Heslo</label>
        <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required />
        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="primary" type="submit">{mode==='login' ? 'Přihlásit' : 'Registrovat'}</button>
          <button type="button" onClick={()=> setMode(mode==='login' ? 'register':'login')}>
            {mode==='login' ? 'Přejít na registraci' : 'Přejít na přihlášení'}
          </button>
        </div>
      </form>
      {msg && <p><small className="muted">{msg}</small></p>}
    </div>
  )
}

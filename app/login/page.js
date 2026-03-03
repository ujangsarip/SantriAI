"use client"
import { supabase } from "@/lib/supabase"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")

  const login = async () => {
    await supabase.auth.signInWithOtp({ email })
    alert("Cek email untuk login")
  }

  return (
    <div>
      <input onChange={(e)=>setEmail(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  )
}
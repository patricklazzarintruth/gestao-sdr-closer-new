"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("Entrando...");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else { setMsg("OK"); window.location.href = "/"; }
  };

  return (
    <main style={{ maxWidth: 360, margin: "40px auto" }}>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{display:"block", width:"100%", marginBottom:8}}/>
        <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} required style={{display:"block", width:"100%", marginBottom:8}}/>
        <button type="submit">Entrar</button>
      </form>
      <p style={{marginTop:8}}>{msg}</p>
      <p style={{marginTop:16}}>Demo: <b>gestor@demo.com</b> / <b>Senha!123</b></p>
    </main>
  );
}

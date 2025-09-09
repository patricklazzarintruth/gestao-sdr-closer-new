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
    <main style={{ maxWidth: 380, margin: "48px auto", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <h1 style={{ marginBottom: 12 }}>Login</h1>
      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
          style={{display:"block", width:"100%", padding:10, marginBottom:8, border:"1px solid #ddd", borderRadius:8}}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
          style={{display:"block", width:"100%", padding:10, marginBottom:12, border:"1px solid #ddd", borderRadius:8}}
        />
        <button type="submit" style={{padding:"10px 14px", borderRadius:8, border:"1px solid #111"}}>
          Entrar
        </button>
      </form>
      <p style={{marginTop:10, minHeight:24}}>{msg}</p>
      <p style={{marginTop:16, color:"#555"}}>Demo: <b>gestor@demo.com</b> / <b>Senha!123</b></p>
    </main>
  );
}

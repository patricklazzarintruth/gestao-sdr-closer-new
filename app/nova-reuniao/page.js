"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NovaReuniao() {
  const [form, setForm] = useState({
    empresa: "",
    segmento: "",
    origem: "Inbound",
    site: "",
    instagram: "",
    icp: true
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("Salvando...");
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setMsg("Sessão expirada. Faça login."); window.location.href="/login"; return; }

    const { data: stage } = await supabase
      .from("pipeline_stages")
      .select("id")
      .eq("name", "SQL")
      .single();

    const payload = {
      empresa: form.empresa,
      segmento: form.segmento,
      origem: form.origem,
      site: form.site || null,
      instagram: form.instagram || null,
      icp: form.icp,
      sdr_id: session.user.id,
      stage_id: stage?.id || null
    };

    const { error } = await supabase
      .from("deals")
      .insert(payload)
      .select("id")
      .single();

    if (error) { setMsg(error.message); return; }

    // vai direto para a lista
    window.location.href = "/deals";
  };

  return (
    <main style={{ maxWidth: 520, margin: "24px auto", fontFamily:"system-ui,-apple-system,Segoe UI,Roboto,sans-serif" }}>
      <h1>Nova Reunião</h1>
      <form onSubmit={submit}>
        <label>Empresa<input name="empresa" value={form.empresa} onChange={onChange} required style={input}/></label>
        <label>Segmento<input name="segmento" value={form.segmento} onChange={onChange} required style={input}/></label>
        <label>Origem
          <select name="origem" value={form.origem} onChange={onChange} style={input}>
            <option>Inbound</option>
            <option>Outbound</option>
          </select>
        </label>
        <label>Site<input name="site" value={form.site} onChange={onChange} placeholder="https://..." style={input}/></label>
        <label>Instagram<input name="instagram" value={form.instagram} onChange={onChange} placeholder="@perfil" style={input}/></label>
        <label style={{display:"flex", alignItems:"center", gap:8, margin:"8px 0"}}>
          <input type="checkbox" name="icp" checked={form.icp} onChange={onChange}/>
          ICP (cliente dentro do perfil)
        </label>
        <button type="submit" style={btn}>Salvar</button>
        <a href="/deals" style={{marginLeft:12}}>Ver reuniões</a>
      </form>
      <p style={{marginTop:12}}>{msg}</p>
    </main>
  );
}

const input = { display:"block", width:"100%", padding:10, margin:"6px 0 12px", border:"1px solid #ddd", borderRadius:8 };
const btn = { padding:"10px 14px", borderRadius:8, border:"1px solid #111" };


"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = "/login"; return; }
      setSession(session);
      const { data: prof } = await supabase
        .from("profiles")
        .select("name, role, email")
        .eq("id", session.user.id)
        .single();
      setProfile(prof || null);
      setLoading(false);
    })();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) return <main style={{padding:16}}>Carregando…</main>;

  return (
    <main style={{ padding: 16 }}>
      <h1>Gestão à Vista ✅</h1>
      <p>Bem-vindo {profile?.name || session.user.email} — <b>{(profile?.role || "").toUpperCase()}</b></p>
      <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap:"wrap" }}>
        <a href="/nova-reuniao" style={btn}>Nova Reunião</a>
        <a href="/tv" style={btn}>Wallboard (/tv)</a>
        <button onClick={signOut} style={btnOutline}>Sair</button>
      </div>
    </main>
  );
}

const btn = { padding:"10px 14px", borderRadius:8, border:"1px solid #111", textDecoration:"none", display:"inline-block" };
const btnOutline = { ...btn, background:"white" };

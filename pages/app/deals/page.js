"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Deals() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href="/login"; return; }
      const { data, error } = await supabase
        .from("deals")
        .select("id, empresa, segmento, origem, icp, created_at, points_claimed, points_validated")
        .order("created_at", { ascending: false })
        .limit(50);
      if (!error) setRows(data || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <main style={{padding:16}}>Carregando…</main>;

  return (
    <main style={{padding:16}}>
      <h1>Reuniões</h1>
      <a href="/" style={{display:"inline-block", margin:"8px 0"}}>← voltar</a>
      <table border="1" cellPadding="8" style={{borderCollapse:"collapse", width:"100%"}}>
        <thead>
          <tr>
            <th>Empresa</th><th>Segmento</th><th>Origem</th><th>ICP</th><th>Claimed</th><th>Validated</th><th>Criado</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.empresa}</td>
              <td>{r.segmento}</td>
              <td>{r.origem}</td>
              <td>{r.icp ? "SIM" : "NÃO"}</td>
              <td>{r.points_claimed}</td>
              <td>{r.points_validated}</td>
              <td>{new Date(r.created_at).toLocaleString("pt-BR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

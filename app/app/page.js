"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Gestão à Vista ✅</h1>
      <p>App online. Supabase URL: <code>{process.env.NEXT_PUBLIC_SUPABASE_URL}</code></p>
      <ul>
        <li><Link href="/tv">Wallboard (/tv)</Link></li>
        <li><Link href="/offline">Página offline</Link></li>
      </ul>
      <p style={{marginTop:16}}>Depois do deploy: login com <b>gestor@demo.com / Senha!123</b>.</p>
    </main>
  );
}

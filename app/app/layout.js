export const metadata = { title: "Gestão à Vista", description: "PWA SDR/Closer" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1f2937" />
      </head>
      <body style={{ fontFamily:"system-ui,-apple-system,Segoe UI,Roboto,sans-serif", padding:16 }}>
        {children}
      </body>
    </html>
  );
}

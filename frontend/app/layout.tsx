import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dermascalp',
  description: 'Analisis kondisi kulit kepala dengan teknologi Deep Learning & Grad-CAM',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body style={{
        background: 'linear-gradient(to bottom, #0a1628 0%, #0d2040 20%, #0e2647 50%, #0d2040 80%, #0a1628 100%)',
        minHeight: '100vh',
      }}>
        {children}
      </body>
    </html>
  )
}
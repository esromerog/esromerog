import type { Metadata } from 'next'
import '@/app/global.scss';

export const metadata: Metadata = {
  title: 'Esteban Romero',
  description: 'Hi! Welcome to my portfolio website :)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

import type { Metadata } from 'next'

import './global.scss'

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
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

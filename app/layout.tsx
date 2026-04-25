import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://abadAfonsoJaime.github.io/portfolio'),
  title: {
    default: 'Jaime Abad - Data Engineer & Azure Architect',
    template: '%s | Jaime Abad'
  },
  description: 'IT Professional with 8+ years experience in SQL Server, ETL development, Azure architecture, and full-stack development. Expert in database design, CI/CD pipelines, and digital transformation.',
  keywords: ['Data Engineer', 'SQL Server DBA', 'Azure Architect', 'ETL Developer', 'Full Stack Developer'],
  authors: [{ name: 'Jaime Abad' }],
  creator: 'Jaime Abad',
  publisher: 'Jaime Abad',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abadAfonsoJaime.github.io/portfolio',
    title: 'Jaime Abad - Data Engineer & Azure Architect',
    description: 'Professional portfolio showcasing expertise in SQL Server, Azure, ETL, and full-stack development.',
    siteName: 'Jaime Abad Portfolio',
    images: [
      {
        url: '/portfolio/paella_20190420.jpg',
        width: 1200,
        height: 630,
        alt: 'Jaime Abad - Data Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaime Abad - Data Engineer & Azure Architect',
    description: 'Professional portfolio showcasing expertise in SQL Server, Azure, ETL, and full-stack development.',
    images: ['/portfolio/paella_20190420.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}', {
                custom_map: {'dimension1': 'basePath'},
                basePath: '/portfolio'
              });
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jaime Abad",
              "jobTitle": "Data Engineer & Azure Architect",
              "description": "IT Professional with 8+ years experience in SQL Server database administration, ETL development, and Azure architecture",
              "url": "https://abadAfonsoJaime.github.io/portfolio",
              "sameAs": [
                "https://www.linkedin.com/in/jaime-abad",
                "https://github.com/abadAfonsoJaime"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Madrid",
                "addressCountry": "Spain"
              },
              "knowsAbout": [
                "SQL Server",
                "Azure Data Factory",
                "ETL Development",
                "Database Administration",
                "CI/CD Pipelines",
                "PowerShell",
                "Full-Stack Development"
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

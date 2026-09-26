import Script from 'next/script';

export function GtagScripts() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Z12LCY13ES"
        strategy="beforeInteractive"
      />
      <Script id="gtag-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-Z12LCY13ES');`}
      </Script>
    </>
  );
}

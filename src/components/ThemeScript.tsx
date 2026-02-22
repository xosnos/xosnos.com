'use client';

import Script from 'next/script';

const ThemeScript = () => {
  return (
    <Script id="theme-switcher" strategy="afterInteractive">
      {`
        (function() {
          try {
            var hour = new Date().getHours();
            var theme = (hour >= 6 && hour < 18) ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
          } catch (e) {}
        })();
      `}
    </Script>
  );
};

export default ThemeScript;

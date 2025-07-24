import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import DevConsoleSuppressor from './components/DevConsoleSuppressor';
import SessionProviderWrapper from './components/SessionProviderWrapper';

export const metadata = {
  title: 'MO-PCCO.R3 - NextJS Financial Dashboard',
  description: 'David Clerk Module 25 Capstone Project - Financial Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <SessionProviderWrapper>
          <DevConsoleSuppressor />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

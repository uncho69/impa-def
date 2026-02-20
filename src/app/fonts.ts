import { Montserrat, Inter, Source_Code_Pro } from 'next/font/google';

export const montserrat = Montserrat({
  variable: '--font-montserrat',
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const sourceCode = Source_Code_Pro({
  variable: '--font-source-code',
  display: 'swap',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

/** Combined font variable classNames for body */
export const fontClassNames = `${montserrat.variable} ${inter.variable} ${sourceCode.variable}`;

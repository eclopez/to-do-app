import * as React from 'react';
import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'To Do App',
  description:
    'To Do App by Erik Lopez featuring Next.js 15, React 19, and Tailwind 4',
};

function RootLayout(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
export { metadata };

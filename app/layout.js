import './globals.css';

export const metadata = {
  title: 'Cadastro Simples',
  description: 'Sistema simples em Next.js com MySQL'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

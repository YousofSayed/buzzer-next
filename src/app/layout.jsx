import "./globals.css";

export const metadata = {
  title: "Buzzer",
  description: "Ecommerce app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

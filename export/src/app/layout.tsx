// The <html> element is rendered by app/[locale]/layout.tsx so it can carry
// the right lang attribute; this root layout only passes children through.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

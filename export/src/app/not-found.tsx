import Link from "next/link";

// Requests outside any locale (rare, the proxy adds one) fall back to a plain page.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: "4rem 1rem", textAlign: "center" }}>
        <h1>Page not found</h1>
        <p>
          <Link href="/">Asian Technocast home</Link>
        </p>
      </body>
    </html>
  );
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-white">
      <main>{children}</main>
    </section>
  );
}

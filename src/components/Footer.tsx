export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-neutral-200 bg-white/60 backdrop-blur">
      <div className="container-custom py-8 text-center">
        <p className="text-neutral-600 text-sm">ImparoDeFi © {year}. All rights reserved.</p>
      </div>
    </footer>
  );
}

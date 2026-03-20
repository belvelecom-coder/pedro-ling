export default function Footer() {
  return (
    <footer
      className="py-10 px-5 md:px-[120px] text-center"
      style={{ background: "#1A1A1A", color: "#888888" }}
    >
      <p className="font-heading text-lg mb-1" style={{ color: "#D4A373" }}>
        Pedro Ling
      </p>
      <p className="text-sm mb-4">Professional Wedding Dance Instructor</p>
      <p className="text-xs" style={{ color: "#555555" }}>
        © {new Date().getFullYear()} Pedro Ling. All rights reserved.
      </p>
    </footer>
  );
}

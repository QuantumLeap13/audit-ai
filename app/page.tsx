import { HeroSection } from "@/components/landing/hero-section";
import { AuditForm } from "@/components/forms/audit-form";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />

      <section className="container mx-auto px-4 py-12">
        <AuditForm />
      </section>
    </main>
  );
}
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="font-display text-8xl font-bold text-bg-subtle">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-text-primary">
            Page <GradientText>Not Found</GradientText>
          </h1>
          <p className="mt-4 text-text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button href="/" icon={<ArrowLeft size={16} />}>
              Back to Home
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

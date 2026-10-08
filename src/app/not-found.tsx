import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <p className="mb-4 text-sm font-bold text-brand">404</p>
      <h1 className="text-4xl font-black uppercase">Page not found.</h1>
      <p className="mx-auto mt-5 max-w-md text-ash">This page isn&apos;t available. Explore the menu or head back home.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <ButtonLink href="/menu">Explore the menu</ButtonLink>
        <ButtonLink href="/" variant="secondary">Back home</ButtonLink>
      </div>
    </Container>
  );
}

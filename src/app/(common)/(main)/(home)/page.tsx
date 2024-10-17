import { Button, Container, Text } from "@/components/atoms";

export default function Home() {
  return (
    <Container>
      <div className="mt-5">
        <Button>Test Button</Button>
        <Text variant="h1">This is H1 component</Text>
      </div>
    </Container>
  );
}

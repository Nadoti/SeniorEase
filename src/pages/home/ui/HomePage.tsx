import { Badge, Card, IconButton, LinkButton, Slider, Text } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { Check, Menu, Plus, Trash } from "lucide-react";
import { useState } from "react";

export function HomePage() {
  function teste() {
    console.log('sssss')
  }
  const [fontSize, setFontSize] = useState(16)
  return (
    <div>
      <h1>SeniorEase</h1>
      <p>Bem-vindo ao SeniorEase.</p>
      <Card variant="surface" size="2">
        <h3>Título</h3>
        <p>Conteúdo do card</p>
      </Card>
      <Card variant="classic" size="3" color="neutral"></Card>
      <Card variant="classic" size="3" color="primary"></Card>
      <Card variant="classic" size="3" color="danger"></Card>
      <Card variant="classic" size="3" color="success"></Card>
      <Card variant="classic" size="3" color="warning"></Card>

      <Card variant="surface" size="2" >
        <Text size="1" color="muted">E-mail</Text>
        <Text size="3">joao@email.com</Text>
      </Card>

      <Text size="2" color="muted">Tamanho da fonte: {fontSize}px</Text>
      <Slider
        min={12}
        max={32}
        step={2}
        value={fontSize}
        onValueChange={setFontSize}
        aria-label="Tamanho da fonte"
      />
    </div>
  );
}

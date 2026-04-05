import { Avatar, Badge, Card, Heading, IconButton, LinkButton, Slider, Switch, Text } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { Check, CircleCheck, Menu, Palette, Plus, Sparkles, Trash, Type } from "lucide-react";
import { useState, useEffect } from "react";
import styles from './HomePage.module.css';

export function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <section className={styles.container}>
      <div className={styles.headerHome}>
        <Heading color="white">Bem-vindo ao SeniorEase</Heading>
        <Text color="default" size="4">Sua plataforma digital acessível. Organize suas tarefas, configure lembretes e personalize a interface para criar um ambiente perfeito para suas necessidades.</Text>
      </div>
      <div className={styles.cardContainer}>
        <Card className={styles.card} style={{ backgroundColor: '#2B8CE6', borderColor: '#2B8CE6' }}>
          <Palette size={32} color="#FFFFFF" />
          <Heading size="3" color="white" style={{ color: '#FFFFFF' }}>Escuro</Heading>
          <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }} size="2">Tema Atual</Text>
        </Card>
        <Card color="primary" className={styles.card} style={!isDarkMode ? { backgroundColor: '#FFFFFF' } : undefined}>
          <Type size={32} color="#2B8CE6" />
          <Heading size="3" color="white">16px</Heading>
          <Text color="default" size="2" style={!isDarkMode ? { color: '#6B7280' } : undefined}>Tamanho da Fonte</Text>
        </Card>
        <Card color="primary" className={styles.card} style={!isDarkMode ? { backgroundColor: '#FFFFFF' } : undefined}>
          <Palette size={32} color="#2B8CE6" />
          <Heading size="3" color="white">Desativado</Heading>
          <Text color="default" size="2" style={!isDarkMode ? { color: '#6B7280' } : undefined}>Leitor de Voz</Text>
        </Card>
        <Card color="primary" className={styles.card} style={!isDarkMode ? { backgroundColor: '#FFFFFF' } : undefined}>
          <Palette size={32} color="#2B8CE6" />
          <Heading size="3" color="white">Normal</Heading>
          <Text color="default" size="2" style={!isDarkMode ? { color: '#6B7280' } : undefined}>Indicadores de Foco</Text>
        </Card>
      </div>

      <div className={styles.cardAcessibilityContainer}>

        <Card color="primary" style={!isDarkMode ? { backgroundColor: '#FFFFFF' } : undefined}>
          <div className={styles.headerCard}>
            <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<Sparkles color="#4EADFF" />} />
            <Heading size="1" color="white">Ajustes Rápidos</Heading>
          </div>
          <div className={styles.cardActionsContainer}>
            <div className={styles.cardAcessibilityContent} style={!isDarkMode ? { borderBottomColor: '#F3F4F6' } : undefined}>
              <span className={styles.cardAcessibilityContentText}>
                <Heading size="1" color="white">Modo Escuro</Heading>
                <Text color="default" size="2">Alternar entre tema claro e escuro</Text>
              </span>
              <Switch
                color="primary"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
            <div className={styles.cardAcessibilityContent} style={!isDarkMode ? { borderBottomColor: '#F3F4F6' } : undefined}>
              <span className={styles.cardAcessibilityContentText}>
                <Heading size="1" color="white">Leitor de Voz</Heading>
                <Text color="default" size="2">Ler conteúdos das páginas em voz alta</Text>
              </span>
              <Switch color="primary" checked={true} />
            </div>
            <div className={styles.cardAcessibilityContent} style={!isDarkMode ? { borderBottomColor: '#F3F4F6' } : undefined}>
              <span className={styles.cardAcessibilityContentText}>
                <Heading size="1" color="white">Indicadores de Foco</Heading>
                <Text color="default" size="2">Destacar visualmente navegação do teclado</Text>
              </span>
              <Switch color="primary" checked={true} />
            </div>

          </div>
        </Card>

        <Card color="primary" style={!isDarkMode ? { backgroundColor: '#FFFFFF' } : undefined}>
          <div className={styles.headerCard}>
            <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<CircleCheck color="#4EADFF" />} />
            <Heading size="1" color="white">Dicas de Acessibilidade</Heading>
          </div>
          <div className={styles.tipsAcessibilityContainer}>
            <div className={styles.tipsAcessibilityContent}>
              <Badge color="success" size="2" style={{ color: '#4ADE80' }}>1</Badge>
              <span className={styles.tipsAcessibilityTitle}>
                <Heading color="white" size="1">Ajuste a Tipografia</Heading>
                <Text color="default" size="2">Fontes sem serifa como Inter são geralmente mais fáceis de ler em telas.</Text>
                <LinkButton href="/" color="primary" size="2" variant="ghost">
                  Configurar Tipografia {'->'}
                </LinkButton>
              </span>
              <div>
              </div>
            </div>
            <div className={styles.tipsAcessibilityContent}>
              <Badge color="success" size="2" style={{ color: '#4ADE80' }}>2</Badge>
              <span className={styles.tipsAcessibilityTitle}>
                <Heading color="white" size="1">Feedback Visual</Heading>
                <Text color="default" size="2">Ative indicadores de foco mais fortes se você usa navegação por teclado.</Text>
                <LinkButton href="/" color="primary" size="2" variant="ghost">
                  Configurar Foco {'->'}
                </LinkButton>
              </span>
              <div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

import { Avatar, Badge, Card, Heading, LinkButton, Switch, Text } from "@/shared/ui";
import { CircleCheck, Palette, Sparkles, Type } from "lucide-react";
import styles from './HomePage.module.css';
import { useHome } from '../model/useHome';
export function HomePage() {
  const {
    isDarkMode, setIsDarkMode,
    ttsEnabled, toggleTts,
    focusEnabled, toggleFocus,
    themeName, fontSizeText, ttsText, focusText
  } = useHome();
  return (
    <section className={styles.container}>
      <div className={styles.headerHome}>
        <Heading color="white">Bem-vindo ao SeniorEase</Heading>
        <Text color="default" size="4">Sua plataforma digital acessível. Organize suas tarefas, configure lembretes e personalize a interface para criar um ambiente perfeito para suas necessidades.</Text>
      </div>
      <div className={styles.cardContainer}>
        <Card className={`${styles.card} ${styles.themeHighlightCard}`}>
          <Palette size={32} color="#FFFFFF" />
          <Heading size="3" className={styles.themeHighlightTitle}>{themeName}</Heading>
          <Text className={styles.themeHighlightSubtitle} size="2">Tema Atual</Text>
        </Card>
        <Card color="primary" className={styles.card}>
          <Type size={32} color="#2B8CE6" />
          <Heading size="3" color="white">{fontSizeText}</Heading>
          <Text color="default" size="2" className={styles.subtitleText}>Tamanho da Fonte</Text>
        </Card>
        <Card color="primary" className={styles.card}>
          <Palette size={32} color="#2B8CE6" />
          <Heading size="3" color="white">{ttsText}</Heading>
          <Text color="default" size="2" className={styles.subtitleText}>Leitor de Voz</Text>
        </Card>
        <Card color="primary" className={styles.card}>
          <Palette size={32} color="#2B8CE6" />
          <Heading size="3" color="white">{focusText}</Heading>
          <Text color="default" size="2" className={styles.subtitleText}>Indicadores de Foco</Text>
        </Card>
      </div>
      <div className={styles.cardAcessibilityContainer}>
        <Card color="primary">
          <div className={styles.headerCard}>
            <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<Sparkles color="#4EADFF" />} />
            <Heading size="1" color="white">Ajustes Rápidos</Heading>
          </div>
          <div className={styles.cardActionsContainer}>
            <div className={styles.cardAcessibilityContent}>
              <span className={styles.cardAcessibilityContentText}>
                <Heading size="1" color="white">Modo Escuro</Heading>
                <Text color="default" size="2">Alternar entre tema claro e escuro</Text>
              </span>
              <Switch color="primary" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
            </div>
            <div className={styles.cardAcessibilityContent}>
              <span className={styles.cardAcessibilityContentText}>
                <Heading size="1" color="white">Leitor de Voz</Heading>
                <Text color="default" size="2">Ler conteúdos das páginas em voz alta</Text>
              </span>
              <Switch color="primary" checked={ttsEnabled} onCheckedChange={toggleTts} />
            </div>
            <div className={styles.cardAcessibilityContent}>
              <span className={styles.cardAcessibilityContentText}>
                <Heading size="1" color="white">Indicadores de Foco</Heading>
                <Text color="default" size="2">Destacar visualmente navegação do teclado</Text>
              </span>
              <Switch color="primary" checked={focusEnabled} onCheckedChange={toggleFocus} />
            </div>
          </div>
        </Card>
        <Card color="primary">
          <div className={styles.headerCard}>
            <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<CircleCheck color="#4EADFF" />} />
            <Heading size="1" color="white">Dicas de Acessibilidade</Heading>
          </div>
          <div className={styles.tipsAcessibilityContainer}>
            <div className={styles.tipsAcessibilityContent}>
              <Badge color="success" size="2" className={styles.badgeText}>1</Badge>
              <span className={styles.tipsAcessibilityTitle}>
                <Heading color="white" size="1">Ajuste a Tipografia</Heading>
                <Text color="default" size="2">Fontes sem serifa como Inter são geralmente mais fáceis de ler em telas.</Text>
                <LinkButton href="/" color="primary" size="2" variant="ghost">Configurar Tipografia {'->'}</LinkButton>
              </span>
              <div></div>
            </div>
            <div className={styles.tipsAcessibilityContent}>
              <Badge color="success" size="2" className={styles.badgeText}>2</Badge>
              <span className={styles.tipsAcessibilityTitle}>
                <Heading color="white" size="1">Feedback Visual</Heading>
                <Text color="default" size="2">Ative indicadores de foco mais fortes se você usa navegação por teclado.</Text>
                <LinkButton href="/" color="primary" size="2" variant="ghost">Configurar Foco {'->'}</LinkButton>
              </span>
              <div></div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

import { Avatar, Card, Heading, Text, RadioCard, Switch, Separator } from "@/shared/ui";
import styles from './AppearancePage.module.css';
import { Palette, Sun, Moon, Settings, PanelLeft, MoreHorizontal } from "lucide-react";
import { useAppearance } from '../model/useAppearance';

export function AppearancePage() {
  const { theme, setTheme, navMode, setNavMode, keyboardNavEnabled, setKeyboardNavEnabled } = useAppearance();

  return (
    <section>
      <div className={styles.header}>
        <Heading color="white">Aparência</Heading>
        <Text className="dynamic-text">Personalize o tema visual e o comportamento do menu flutuante.</Text>
      </div>

      <Card color="primary">
        <div className={styles.appearanceCardMain}>
          <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<Palette color="#4EADFF" />} />
          <Heading size="1" color="white">Tema Principal</Heading>
        </div>
        <div className={styles.themeGrid}>
          <RadioCard name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} contentClassName={styles.themeOptionLight} variant="ghost">
            <div className={styles.themeOptionHeader}><Sun size={32} /><Text weight="medium">Modo Claro</Text></div>
          </RadioCard>
          <RadioCard name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} contentClassName={styles.themeOptionDark} variant="ghost">
            <div className={styles.themeOptionHeader}><Moon size={32} color="#93D1FD" /><Text weight="medium">Modo Escuro</Text></div>
          </RadioCard>
        </div>
      </Card>

      <Card color="primary" className={styles.navCard}>
        <div className={styles.appearanceCardMain}>
          <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<Settings color="#4EADFF" />} />
          <Heading size="1" color="white">Modo de Navegação</Heading>
        </div>
        <div className={styles.sectionLabel}><Text weight="bold" color="white" size="2">Estilo de Navegação</Text></div>
        <div className={styles.themeGrid}>
          <RadioCard name="navMode" value="lateral" checked={navMode === 'lateral'} onChange={() => setNavMode('lateral')} contentClassName={styles.navOption} variant="ghost">
            <div className={styles.navOptionHeader}>
              <Avatar size="1" variant="soft" color="neutral" fallback={<PanelLeft size={20} className={navMode === 'lateral' ? styles.navOptionActiveIcon : styles.navOptionIcon} />} radius="sm" />
              <Heading size="1" className={navMode === 'lateral' ? styles.navOptionActiveText : styles.navOptionText}>Lateral</Heading>
            </div>
            <Text size="2" color="muted">Menu fixo na lateral esquerda da tela</Text>
          </RadioCard>
          <RadioCard name="navMode" value="flutuante" checked={navMode === 'flutuante'} onChange={() => setNavMode('flutuante')} contentClassName={styles.navOption} variant="ghost">
            <div className={styles.navOptionHeader}>
              <Avatar size="1" variant="soft" color="neutral" fallback={<MoreHorizontal size={20} className={navMode === 'flutuante' ? styles.navOptionActiveIcon : styles.navOptionIcon} />} radius="sm" />
              <Heading size="1" className={navMode === 'flutuante' ? styles.navOptionActiveText : styles.navOptionText}>Flutuante</Heading>
            </div>
            <Text size="2" color="muted">Dock centralizado com ícones e nomes</Text>
          </RadioCard>
        </div>

        <div>
          <Card color="success">
            <Heading color="white" size="2">Navegaçao por Teclado</Heading>
            <div className={styles.keyboardRow}>
              <div className={styles.keyboardTextCol}>
                <Text>Use atalhos de teclado para navegar: P (Painel), C (Configurações), T (Tarefas), G (Guiada), L (Lembretes), H (Histórico), U (Perfil). Dentro de Configurações, use 1-9 para os sub-itens.</Text>
              </div>
              <Switch checked={keyboardNavEnabled} onCheckedChange={setKeyboardNavEnabled} size="3" color="success" />
            </div>
            <Separator color="success" />
            <div className={styles.shortcutsContainer}>
              <Heading size="2" className={styles.shortcutsTitle}>Atalhos ativos</Heading>
              <div className={styles.shortcutsGrid}>
                {[['P', 'Painel'], ['C', 'Configurações'], ['T', 'Tarefas'], ['G', 'Guiada'], ['L', 'Lembretes'], ['H', 'Histórico'], ['U', 'Perfil'], ['1-9', 'Sub-itens']].map(([key, label]) => (
                  <div key={key} className={styles.shortcutItem}>
                    <span className={styles.shortcutKey}>{key}</span>
                    <Text size="2" className={styles.shortcutText}>{label}</Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </section>
  );
}
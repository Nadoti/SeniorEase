import { Avatar, Card, Heading, Text, RadioCard, Switch, Separator } from "@/shared/ui";
import styles from './AppearancePage.module.css';
import { Palette, Sun, Moon, Settings, PanelLeft, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { useNavMode } from '@/shared/model/navModeState';
import { keyboardNavState } from '@/shared/model/keyboardNavState';

export function AppearancePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  });

  const { navMode, setNavMode } = useNavMode();
  const [keyboardNavEnabled, setKeyboardNavEnabled] = useRecoilState(keyboardNavState);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
          <RadioCard
            name="theme"
            value="light"
            checked={theme === 'light'}
            onChange={() => setTheme('light')}
            contentClassName={styles.themeOptionLight}
            variant="ghost"
          >
            <div className={styles.themeOptionHeader}>
              <Sun size={32} />
              <Text weight="medium">Modo Claro</Text>
            </div>
          </RadioCard>

          <RadioCard
            name="theme"
            value="dark"
            checked={theme === 'dark'}
            onChange={() => setTheme('dark')}
            contentClassName={styles.themeOptionDark}
            variant="ghost"
          >
            <div className={styles.themeOptionHeader}>
              <Moon size={32} color="#93D1FD" />
              <Text weight="medium">Modo Escuro</Text>
            </div>
          </RadioCard>
        </div>
      </Card>

      <Card color="primary" style={{ marginTop: 'var(--space-8)' }}>
        <div className={styles.appearanceCardMain}>
          <Avatar size="3" variant="soft" color="primary" radius="md" fallback={<Settings color="#4EADFF" />} />
          <Heading size="1" color="white">Modo de Navegação</Heading>
        </div>

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Text weight="bold" color="white" size="2">Estilo de Navegação</Text>
        </div>

        <div className={styles.themeGrid}>
          <RadioCard
            name="navMode"
            value="lateral"
            checked={navMode === 'lateral'}
            onChange={() => setNavMode('lateral')}
            contentClassName={styles.navOption}
            variant="ghost"
          >
            <div className={styles.navOptionHeader}>
              <Avatar size="1" variant="soft" color="neutral" fallback={<PanelLeft size={20} color="#4EADFF" />} radius="sm" />
              <Heading
                size="1"
                color="info"
                style={navMode === 'lateral' ? { color: theme === 'dark' ? '#4EADFF' : '#1A6FC2' } : undefined}
              >
                Lateral
              </Heading>
            </div>
            <Text size="2" color="muted">Menu fixo na lateral esquerda da tela</Text>
          </RadioCard>

          <RadioCard
            name="navMode"
            value="flutuante"
            checked={navMode === 'flutuante'}
            onChange={() => setNavMode('flutuante')}
            contentClassName={styles.navOption}
            variant="ghost"
          >
            <div className={styles.navOptionHeader}>
              <Avatar size="1" variant="soft" color="neutral" fallback={<MoreHorizontal size={20} color="#4EADFF" />} radius="sm" />
              <Heading
                size="1"
                color="info"
                style={navMode === 'flutuante' ? { color: theme === 'dark' ? '#4EADFF' : '#1A6FC2' } : undefined}
              >
                Flutuante
              </Heading>
            </div>
            <Text size="2" color="muted">Dock centralizado com ícones e nomes</Text>
          </RadioCard>
        </div>

        <div>
          <Card color="success">
            <Heading color="white" size="2">Navegaçao por Teclado</Heading>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', margin: 'var(--space-4) 0' }}>
              <div style={{ flex: 1 }}>
                <Text>Use atalhos de teclado para navegar: P (Painel), C (Configurações), T (Tarefas), G (Guiada), L (Lembretes), H (Histórico), U (Perfil). Dentro de Configurações, use 1-9 para os sub-itens.</Text>
              </div>
              <Switch checked={keyboardNavEnabled} onCheckedChange={setKeyboardNavEnabled} size="3" color="success" />
            </div>
            <Separator color="success" />

            <div className={styles.shortcutsContainer}>
              <Heading size="2" style={{ color: '#4ADE80' }}>Atalhos ativos</Heading>

              <div className={styles.shortcutsGrid}>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>P</span>
                  <Text size="2" style={{ color: '#4ADE80' }}>Painel</Text>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>C</span>
                  <Text size="2" style={{ color: '#4ADE80' }}>Configurações</Text>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>T</span>
                  <Text size="2" style={{ color: '#4ADE80' }}>Tarefas</Text>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>G</span>
                  <Text size="2" style={{ color: '#4ADE80' }}>Guiada</Text>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>L</span>
                  <Text size="2" style={{ color: '#4ADE80' }}>Lembretes</Text>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>H</span>
                  <Text size="2" style={{ color: '#4ADE80' }}>Histórico</Text>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>U</span>
                  <Text size="2" style={{ color: '#4ADE80' }}>Perfil</Text>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>1-9</span>
                  <Text size="2" style={{ color: '#4ADE80' }}>Sub-itens</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </section>
  );
}
import { Link } from 'react-router';
import { Eye as EyeIcon, EyeOff } from 'lucide-react';
import { useLogin } from '../model/useLogin';
import { Heading, Text, Button, Card } from '@/shared/ui';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const {
    mostrarSenha,
    setMostrarSenha,
    handleLogin,
  } = useLogin();

  return (
    <div className={styles.wrapper}>
      {/* Top Logo */}
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon} />
        <Text size="3" weight="bold" color="white" className={styles.logoNome}>
          SeniorEase
        </Text>
      </div>

      {/* Main Login Card */}
      <Card variant="classic" size="3" className={styles.loginCard}>
        <div className={styles.formHeader}>
          <Heading size="4" align="center">Bem-vindo de volta</Heading>
          <Text size="2" color="muted" align="center">
            Entre com campos grandes e legíveis. Cada ação é direta e fácil de entender.
          </Text>
        </div>

        <div className={styles.campos}>
          <div className={styles.campo}>
            <label className={styles.label} htmlFor="email">
              <Text weight="medium">E-mail</Text>
            </label>
            <input
              id="email"
              type="email"
              placeholder="nome@exemplo.com"
              className={styles.input}
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label} htmlFor="senha">
              <Text weight="medium">Senha</Text>
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="senha"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Digite sua senha"
                className={styles.input}
              />
              <div className={styles.btnMostrarWrapper}>
                <Button
                  variant="ghost"
                  size="1"
                  onClick={() => setMostrarSenha(v => !v)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <EyeIcon size={16} />}
                  <Text size="1" weight="medium">{mostrarSenha ? 'Ocultar' : 'Mostrar'}</Text>
                </Button>
              </div>
            </div>
          </div>

          <Button onClick={handleLogin} size="3" color="primary" fullWidth className={styles.submitBtn}>
            Entrar
          </Button>

          <footer className={styles.footer}>
            <Text size="2" color="muted">Não tem conta?</Text>
            <Link to="/cadastro" className={styles.linkCadastro}>
              Cadastre-se
            </Link>
          </footer>
        </div>
      </Card>
    </div>
  );
}

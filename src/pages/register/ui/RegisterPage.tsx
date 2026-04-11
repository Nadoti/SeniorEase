import { Link } from 'react-router';
import { Eye as EyeIcon, EyeOff } from 'lucide-react';
import { Heading, Text, Button, Card } from '@/shared/ui';
import { useRegister } from '../model/useRegister';
import styles from './RegisterPage.module.css';

export function RegisterPage() {
  const {
    mostrarSenha,
    setMostrarSenha,
    handleRegister,
  } = useRegister();

  return (
    <div className={styles.wrapper}>
      {/* Top Logo */}
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon} />
        <Text size="3" weight="bold" color="white" className={styles.logoNome}>
          SeniorEase
        </Text>
      </div>

      {/* Main Register Card */}
      <Card variant="surface" size="3" className={styles.registerCard}>
        <div className={styles.formHeader}>
          <Heading size="4" align="center">Cadastre-se</Heading>
          <Text size="2" color="muted" align="center">
            Pode ficar tranquilo(a). O SeniorEase é feito para oferecer uma configuração calma e confiante.
          </Text>
        </div>

        <form onSubmit={handleRegister} className={styles.campos}>
          <div className={styles.campo}>
            <label className={styles.label} htmlFor="nome">
              <Text weight="medium">Nome Completo</Text>
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label} htmlFor="email">
              <Text weight="medium">Endereço de e-mail</Text>
            </label>
            <input
              id="email"
              type="email"
              placeholder="nome@exemplo.com"
              className={styles.input}
              required
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
                placeholder="Crie uma senha"
                className={styles.input}
                required
              />
              <div className={styles.btnMostrarWrapper}>
                <Button
                  variant="ghost"
                  type="button"
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

          <Button type="submit" size="3" color="primary" fullWidth className={styles.submitBtn}>
            Criar conta
          </Button>

          <footer className={styles.footer}>
            <Text size="2" color="muted">Já tem uma conta?</Text>
            <Link to="/login" className={styles.linkEntrar}>
              Entrar
            </Link>
          </footer>
        </form>
      </Card>
    </div>
  );
}

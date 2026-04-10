import { useState } from 'react';
import { Link } from 'react-router';
import { Eye as EyeIcon, EyeOff } from 'lucide-react';
import styles from './LoginPage.module.css';
export function LoginPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [manterConectado, setManterConectado] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.formSide}>
        <div className={styles.logo}>
          <div className={styles.logoIcon} />
          <div className={styles.logoTexts}>
            <span className={styles.logoNome}>SeniorEase</span>
            <span className={styles.logoSub}>Acesso acessível</span>
          </div>
        </div>
        <div className={styles.formContent}>
          <h1 className={styles.titulo}>Bem-vindo de volta</h1>
          <p className={styles.subtitulo}>
            Entre com campos grandes e legíveis. Cada ação é direta, reversível e fácil de entender.
          </p>
          <div className={styles.campos}>
            <div className={styles.campo}>
              <label className={styles.label} htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="nome@exemplo.com"
                className={styles.input}
              />
            </div>
            <div className={styles.campo}>
              <label className={styles.label} htmlFor="senha">Senha</label>
              <div className={styles.inputWrapper}>
                <input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.mostrarSenha}
                  onClick={() => setMostrarSenha(v => !v)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <EyeIcon size={16} />}
                  {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>
            <div className={styles.opcoes}>
              <label className={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={manterConectado}
                  onChange={e => setManterConectado(e.target.checked)}
                  className={styles.checkbox}
                />
                Manter-me conectado
              </label>
              <Link to="/recuperar-senha" className={styles.linkEsqueci}>
                Esqueceu a senha?
              </Link>
            </div>
            <div className={styles.infoBox}>
              <p className={styles.infoTitulo}>Suporte claro antes de continuar</p>
              <p className={styles.infoTexto}>
                Você pode revisar as informações antes de enviá-las. Nada é enviado até você pressionar o botão principal.
              </p>
            </div>
            <button type="button" className={styles.btnPrimario}>
              Entrar
            </button>
            <Link to="/cadastro" className={styles.btnSecundario}>
              Criar uma conta
            </Link>
          </div>
          <p className={styles.rodape}>
            Ao entrar, você mantém suas preferências de acessibilidade, tamanho de fonte e configurações de lembretes.
          </p>
        </div>
      </div>
      <div className={styles.infoPainel}>
        <div className={styles.infoTag}>Acesso digital independente</div>
        <h2 className={styles.infoTituloGrande}>
          Uma experiência de acesso que permanece calma, legível e previsível.
        </h2>
        <p className={styles.infoDescricao}>
          O painel visual reforça a confiança com uma cena simples e linguagem direta, mantendo a mesma estrutura tranquila usada no cadastro.
        </p>
        <div className={styles.imagemPlaceholder} />
        <div className={styles.infoCards}>
          <div className={styles.infoCard}>
            <p className={styles.infoCardTitulo}>Campos legíveis</p>
            <p className={styles.infoCardTexto}>Texto grande e contraste mais forte reduzem a hesitação.</p>
          </div>
          <div className={styles.infoCard}>
            <p className={styles.infoCardTitulo}>Feedback guiado</p>
            <p className={styles.infoCardTexto}>Cada ação explica o que acontece antes e depois do envio.</p>
          </div>
          <div className={styles.infoCard}>
            <p className={styles.infoCardTitulo}>Mesma estrutura</p>
            <p className={styles.infoCardTexto}>Entrar e cadastrar mantêm o mesmo layout dividido para facilitar o reconhecimento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

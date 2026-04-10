import { useState } from 'react';
import { Link } from 'react-router';
import styles from './RegisterPage.module.css';
export function RegisterPage() {
  const [aceito, setAceito] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.formSide}>
        <div className={styles.logo}>
          <div className={styles.logoIcon} />
          <span className={styles.logoNome}>SeniorEase</span>
        </div>
        <div className={styles.formContent}>
          <h1 className={styles.titulo}>Crie sua conta SeniorEase</h1>
          <p className={styles.subtitulo}>
            Configure acesso seguro a lembretes de medicamentos, consultas e atualizações familiares em um lugar acessível.
          </p>
          <div className={styles.campos}>
            <div className={styles.campo}>
              <label className={styles.label} htmlFor="nome">Nome completo</label>
              <input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
                className={styles.input}
              />
            </div>
            <div className={styles.campo}>
              <label className={styles.label} htmlFor="email">Endereço de e-mail</label>
              <input
                id="email"
                type="email"
                placeholder="nome@exemplo.com"
                className={styles.input}
              />
            </div>
            <div className={styles.campo}>
              <label className={styles.label} htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Crie uma senha"
                className={styles.input}
              />
            </div>
            <div className={styles.campo}>
              <label className={styles.label} htmlFor="confirmarSenha">Confirmar senha</label>
              <input
                id="confirmarSenha"
                type="password"
                placeholder="Digite sua senha novamente"
                className={styles.input}
              />
            </div>
            <p className={styles.dicaSenha}>
              Use pelo menos 12 caracteres com uma mistura de letras, números e símbolos para maior proteção.
            </p>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                checked={aceito}
                onChange={e => setAceito(e.target.checked)}
                className={styles.checkbox}
              />
              Concordo com os Termos de Serviço e Política de Privacidade, e quero receber atualizações acessíveis no meu e-mail.
            </label>
            <div className={styles.botoes}>
              <button type="button" className={styles.btnPrimario}>
                Criar conta
              </button>
              <button type="button" className={styles.btnSecundario}>
                Precisa de ajuda?
              </button>
            </div>
          </div>
          <p className={styles.rodape}>
            Já tem uma conta?{' '}
            <Link to="/entrar" className={styles.linkEntrar}>
              Entre para continuar.
            </Link>
          </p>
        </div>
      </div>
      <div className={styles.infoPainel}>
        <div className={styles.imagemPlaceholder} />
        <div className={styles.infoConteudo}>
          <span className={styles.infoTag}>Integração guiada</span>
          <h2 className={styles.infoTituloGrande}>
            Feito para uma configuração calma e confiante.
          </h2>
          <p className={styles.infoDescricao}>
            O SeniorEase mantém as rotinas de saúde essenciais visíveis, legíveis e fáceis de compartilhar com cuidadores de confiança desde o primeiro dia.
          </p>
          <ul className={styles.infoLista}>
            <li>• Texto grande e alto contraste em todas as tarefas diárias</li>
            <li>• Lembretes compartilhados para familiares e cuidadores</li>
            <li>• Recuperação de conta segura e opções de suporte claras</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

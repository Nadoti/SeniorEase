import { useNavigate } from 'react-router';
export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <button onClick={() => navigate('/')}>Voltar para o início</button>
    </div>
  );
}

import { atomWithStorage } from 'jotai/utils';

/**
 * Estado de autenticação persistente.
 * true = usuário logado (acesso ao dashboard)
 * false = usuário deslogado (acesso ao login)
 */
export const authState = atomWithStorage<boolean>('seniorease_auth', false);

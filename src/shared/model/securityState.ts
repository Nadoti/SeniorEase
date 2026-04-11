import { atomWithStorage } from 'jotai/utils';

/**
 * Estado global e persistente para as Confirmações Extras de Segurança.
 * Salvo no LocalStorage do navegador para manter a preferência do usuário.
 */
export const securityState = atomWithStorage<boolean>('seniorease_extra_security', true);

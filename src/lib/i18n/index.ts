import keysets from './keysets';

export const i18n = (key: string) => {
    return keysets[key] || key;
}
import keysets from './keysets';

type Keysets = 'statuses';

export const i18n = (key: string) => {
    return keysets[key] || key;
}
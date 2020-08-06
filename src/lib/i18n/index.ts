import statuses from './keysets/statuses';

const KEYSETS = {
    statuses
};

type Keysets = 'statuses';

export const i18n = (keyset: Keysets, key: string) => {
    return KEYSETS[keyset][key] || key;
}
import React, { useState, useCallback } from 'react';
import _debounce from 'lodash/debounce';

import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { request } from '@lib/request';

interface IOwnProps {
    value?: string;
    label?: string;
    onSelect?: (value: string) => void;
}

export const AdressSuggest: React.FC<IOwnProps> = (props) => {
    const { onSelect, label } = props;

    const [options, setOptions] = useState([]);
    const [error, setError] = useState(false);
    const [value, setValue] = useState(props.value || '');
    const [selectedOption, setSelectedOption] = useState(props.value || '');

    const onInputChange = useCallback((event) => {
        if (!event) {
            return;
        }

        const val = event.target.value;

        setValue(val)

        if (!val) {
            setSelectedOption(null);
            return setOptions([]);
        }


        getSuggestOptions(val);
    }, []);

    const getSuggestOptions = useCallback(_debounce((val) => {
        request.post('/suggest/adress', { value: val }).then(r => {
            if (!r.data.result) {
                return setOptions([]);
            }

            const suggestOptions = r.data.result.map(item => item.fullName);

            setOptions(suggestOptions);
        })
    }, 500), []);

    const onSelectValue = useCallback((event, val = '') => {
        setValue(val);

        setSelectedOption(val);

        onSelect && onSelect(val);
    }, [onSelect]);

    const onBlurInput = useCallback(() => {
        if (selectedOption !== value) {
            setError(true);
        } else {
            setError(false);
        }
    }, [value, selectedOption]);

    const onFocusInput = useCallback(() => {
        setError(false);
    }, []);

    return (
        <Autocomplete
            options={options}
            freeSolo
            fullWidth
            value={selectedOption}
            inputValue={value || ''}
            onInputChange={onInputChange}
            onChange={onSelectValue}
            onBlur={onBlurInput}
            onFocus={onFocusInput}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={error}
                    helperText={error && "Нужно выбрать адрес из списка"}
                    label={label || "Адрес"}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    )
};
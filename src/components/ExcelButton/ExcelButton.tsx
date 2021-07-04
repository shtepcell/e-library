import React from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import { IconButton, Tooltip } from '@material-ui/core';

const cnExcelButton = cn('ExcelButton');

interface IOwnProps extends IClassNameProps {
    href?: string;
    onClick?(): void;
}

import './ExcelButton.scss';
import { useCallback } from 'react';

export const ExcelButton = React.memo<IOwnProps>(({ className, href, onClick }) => {
    const onClickHandler = useCallback(() => {
        // window.location.href = '/export/contracts' + '?' + window.location.search;
        onClick && onClick();
    }, [onClick]);

    return (
        <Tooltip title="Выгрузить в Excel" placement="right">
            <IconButton size="medium" className={cnExcelButton(null, [className])} href={href} onClick={onClickHandler} target="_blank">
                <div className={cnExcelButton('Icon')} />
            </IconButton>
        </Tooltip>
    );
});

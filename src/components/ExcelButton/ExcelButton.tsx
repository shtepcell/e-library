import React from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import { IconButton, Tooltip } from '@material-ui/core';

const cnExcelButton = cn('ExcelButton');

interface IOwnProps extends IClassNameProps {
    href?: string;
}

import './ExcelButton.scss';

export const ExcelButton = React.memo<IOwnProps>(({ className, href }) => {
    return (
        <Tooltip title="Выгрузить в Excel" placement="right">
            <IconButton size="medium" className={cnExcelButton(null, [className])} href={href} target="_blank">
                <div className={cnExcelButton('Icon')} />
            </IconButton>
        </Tooltip>
    );
});

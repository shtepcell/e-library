import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import './Icon.scss';

const cnIcon = cn('Icon');

interface IIconProps extends IClassNameProps {
    view: string;
    size: 's' | 'm' | 'l';
}

export const Icon: FunctionComponent<IIconProps> = ({ view, size, className }) => {
    return (
        <span className={cnIcon({ view, size }, [className])} />
    )
}
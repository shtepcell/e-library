import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import './Icon.scss';

const cnIcon = cn('Icon');

interface IIconProps extends IClassNameProps {
    view: string;
    size: 's' | 'sm' | 'm' | 'l';
    title: string;
}

export const Icon: FunctionComponent<IIconProps> = ({ view, size, className, title }) => {
    return (
        <span className={cnIcon({ view, size }, [className])} title={title}/>
    )
}
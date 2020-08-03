import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import './Link.scss';

const cnLink = cn('Link');

interface ILinkProps extends IClassNameProps {
    href?: string;
}

export const Link: FunctionComponent<ILinkProps> = ({ href, className, children }) => {
    return (
        <a href={href} className={cnLink(null, [className])}>
            {children}
        </a>
    )
}
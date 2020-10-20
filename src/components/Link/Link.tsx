import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import { Link as ReactRouterLink } from 'react-router-dom';

import './Link.scss';

const cnLink = cn('Link');

interface ILinkProps extends IClassNameProps {
    href?: string;
    target?: string;
    normal?: boolean;
}

export const Link: FunctionComponent<ILinkProps> = ({ href, className, children, target, normal }) => {
    if (normal) {
        return <a className={cnLink(null, [className])} href={href} target={target}>
            {children}
        </a>
    }

    return (
        <ReactRouterLink to={href} className={cnLink(null, [className])}>
            {children}
        </ReactRouterLink>
    )
}
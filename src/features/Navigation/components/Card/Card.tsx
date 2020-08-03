import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import './Card.scss';

const cnCard = cn('Card');

interface ICardProps extends IClassNameProps {}

export const Card: FunctionComponent<ICardProps> = ({ children, className }) => {
    return (
        <div className={cnCard(null, [className])}>
            {children}
        </div>
    )
}
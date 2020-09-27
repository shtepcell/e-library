import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import DescriptionIcon from '@material-ui/icons/Description';

import './DocumentItem.scss';

const cnDocumentItem = cn('DocumentItem');

interface IOwnProps {
};

export class DocumentItem extends PureComponent<IOwnProps> {

    render() {
        return (
            <div className={cnDocumentItem()}>
               <DescriptionIcon color="primary" />
               <div className={cnDocumentItem('Name')}>Акт оказания услуг</div>
               <div className={cnDocumentItem('Date')}>04.2020</div>
            </div>
        )
    }
}
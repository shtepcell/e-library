import React, { PureComponent } from 'react';
import moment from 'moment';
import { cn } from '@bem-react/classname';

import { Link } from '@material-ui/core';
import { Link as LinkSimple } from '@components/Link';
import DescriptionIcon from '@material-ui/icons/Description';

import './DocumentItem.scss';

const cnDocumentItem = cn('DocumentItem');

interface IOwnProps {
    type: string;
    period: Date;
    file: string;
    onEditClick: VoidFunction;
};

export class DocumentItem extends PureComponent<IOwnProps> {
    onEditClick = (event) => {
        event.preventDefault();
        this.props.onEditClick();
    }

    render() {
        const { type, period, file, } = this.props;

        return (
            <LinkSimple normal className={cnDocumentItem()} href={file} target="_blank">
               <DescriptionIcon color="primary" />
               <div className={cnDocumentItem('Name')}>{type}</div>
               <div className={cnDocumentItem('Date')}>{moment(period).format('MM.YYYY')}</div>
               <Link component="span" className={cnDocumentItem('Edit')} onClick={this.onEditClick}>Править</Link>
            </LinkSimple>
        )
    }
}
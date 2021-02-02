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
    file?: string;
    onEditClick: VoidFunction;
    comment?: string;
};

export class DocumentItem extends PureComponent<IOwnProps> {
    onEditClick = (event?: React.MouseEvent) => {
        event.preventDefault();
        this.props.onEditClick();
    }

    render() {
        const { type, file, comment } = this.props;

        return (
            <div style={{ display: 'flex' }}>
                <LinkSimple normal className={cnDocumentItem({ noFile: !file })} href={file} onClick={!file ? this.onEditClick : undefined} target="_blank">
                    <DescriptionIcon color="primary" />
                    <div className={cnDocumentItem('Name')}>{type}</div>
                    <Link component="span" className={cnDocumentItem('Edit')} onClick={this.onEditClick}>Править</Link>
                </LinkSimple>
                {comment && (
                    <div className={cnDocumentItem('Comment')}>
                        <div className={cnDocumentItem('CommentIcon')}></div>
                        {comment}
                    </div>
                )}
            </div>
        )
    }
}
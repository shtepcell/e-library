import moment from 'moment';
import React, { useState, createRef, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { generateMonth } from '@lib/helper';
import { DocumentItem } from '@features/ContractPage/components/DocumentItem/DocumentItem';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import './Timeline.scss';

const cnTimeline = cn('Timeline');

interface IOwnProps {
    documents?: any;
    from?: Date;
    to?: Date;
    onEditDocument: (id: number) => void;
    onAddDocument: (period: string) => void;
}

const groupDocumentsByMoth = (documents = []) => {
    const result = {};

    documents.forEach(doc => {
        const period = moment(doc.period).format('MM.YYYY');

        if (result[period]) {
            result[period].push(doc);
        } else {
            result[period] = [doc];
        }
    })

    return result;
}

export const Timeline: React.FC<IOwnProps> = React.memo((props) => {
    const { from, to, documents, onEditDocument, onAddDocument } = props;

    const [months] = useState(generateMonth({ from, to }));

    const documentsByPeriod = groupDocumentsByMoth(documents);
    const timelineRef = createRef<HTMLDivElement>();

    useEffect(() => {
        timelineRef.current.scrollTo({ top: 9999999 });

        return () => {}
    }, [timelineRef]);

    const currentMonth = moment(Date.now()).format('MM.YYYY');

    return (
        <div className={cnTimeline()} ref={timelineRef}>
            {months.map(i => {
                return (
                    <div key={i}>
                        <div className={cnTimeline('Period', { current: currentMonth === i })} id={`period-${i}`}>{i}</div>
                        <div className={cnTimeline('Divider', { current: currentMonth === i })}></div>
                        <div className={cnTimeline('Docs')}>
                            {documentsByPeriod[i] ? documentsByPeriod[i].map(({ type, period, file, id }) => (
                                <DocumentItem key={id} type={type} file={file} onEditClick={() => onEditDocument(id)} />
                            )) : null}
                            <IconButton color="primary" onClick={() => onAddDocument(i)} size="small">
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});
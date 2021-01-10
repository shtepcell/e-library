import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import { IContract } from '@typings/IContract';

import './Contract.scss';
import { Link } from '@material-ui/core';
import { getFullName } from '@lib/helper';
import { DocumentUpload } from '@features/DocumentUpload';
import { DocumentItem } from '../DocumentItem/DocumentItem';
import { IDocument } from '@typings/IDocument';
import moment from 'moment';
import { Timeline } from '@features/Timeline/Timeline';
import { onPresetPeriod } from '@store/modules/contractPage';
const cnContract = cn('Contract');

interface IContractProps {
    contract?: IContract;
    draftDocument?: Partial<IDocument>;
    documents?: any[];
    openDocumentDialog?: boolean;

    onEditClick?: () => void;
    onEditDocument?: (id: number) => void;
    onSwitchDocumentDialog?: (value: boolean, period?: string) => void;
    onPresetPeriod: typeof onPresetPeriod;
};

interface IOwnState {
    date: Date,
    period: Date,
    document?: any;
}


export class Contract extends PureComponent<IContractProps, IOwnState> {
    state = {
        openDocumentDialog: false,
        date: new Date(),
        period: new Date(),
    }

    handleAddDocumentClick = (period?: string) => {
        console.log(period);

        this.props.onPresetPeriod(moment(period, 'MM.YYYY').valueOf());
        this.props.onSwitchDocumentDialog(true);
    }

    handleCloseDialog = () => {
        this.props.onSwitchDocumentDialog(false);
    }

    renderDialog(defaultDeliveryMethod: string) {
        return (
            <DocumentUpload
                defaultDeliveryMethod={defaultDeliveryMethod}
                onClose={this.handleCloseDialog}
                open={this.props.openDocumentDialog}
                contractId={this.props.contract.id}
            />
        )
    }

    render() {
        const { contract, onEditClick, documents, onEditDocument } = this.props;

        if (!contract) {
            return null;
        }

        return (
            <div className={cnContract()}>
                <div className={cnContract('LeftColumn')}>
                    <div className={cnContract('Title')}>
                        Информация по контракту
                        <IconButton className={cnContract('TitleButton')} size="small" onClick={onEditClick}>
                            <CreateIcon />
                        </IconButton>
                    </div>
                    <div className={cnContract('Field', { type: 'status' })}>
                        <div className={cnContract('FieldName')}>
                            Статус
                        </div>
                        <div className={cnContract('FieldValue')}>
                            {contract.status}
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'client' })}>
                        <div className={cnContract('FieldName')}>
                            Клиент
                        </div>
                        <div className={cnContract('FieldValue')}>
                            <Link href={`/sprav/clients/${contract.client.id}`} target="_blank">{contract.client.name}</Link>
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'department' })}>
                        <div className={cnContract('FieldName')}>
                            Департамент
                        </div>
                        <div className={cnContract('FieldValue')}>
                            {contract.department}
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'service-manager' })}>
                        <div className={cnContract('FieldName')}>
                            Дата заключения
                        </div>
                        <div className={cnContract('FieldValue')}>
                            {moment(contract.conclusionDate).format('DD.MM.YYYY')}
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'service-manager' })}>
                        <div className={cnContract('FieldName')}>
                            Дата завершения действия
                        </div>
                        <div className={cnContract('FieldValue')}>
                            {moment(contract.endDate).format('DD.MM.YYYY')}
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'service-manager' })}>
                        <div className={cnContract('FieldName')}>
                            Сервис-менеджер
                        </div>
                        <div className={cnContract('FieldValue')}>
                            {getFullName(contract.serviceManager)}
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'personal-manager' })}>
                        <div className={cnContract('FieldName')}>
                            Персональный менеджер
                        </div>
                        <div className={cnContract('FieldValue')}>
                            {getFullName(contract.personalManager)}
                        </div>
                    </div>
                    {contract.amount && (
                        <div className={cnContract('Field', { type: 'personal-manager' })}>
                            <div className={cnContract('FieldName')}>
                                Сумма контракта
                            </div>
                            <div className={cnContract('FieldValue')}>
                                {contract.amount}
                            </div>
                        </div>
                    )}
                    {contract.fileName && (
                        <div className={cnContract('Field', { type: 'personal-manager' })}>
                            <div className={cnContract('FieldName')}>
                                Вложение
                            </div>
                            <div className={cnContract('FieldValue')}>
                                <Link href={contract.file} target="_blank">{contract.fileName}</Link>
                            </div>
                        </div>
                    )}
                    <div className={cnContract('Field', { type: 'original' })}>
                        <div className={cnContract('FieldName')}>
                            Оригинал в архиве
                        </div>
                        <div className={cnContract('FieldValue')}>
                            {contract.orig ? 'Да' : 'Нет'}
                        </div>
                    </div>
                </div>
                <div className={cnContract('RightColumn')}>
                    <Timeline documents={documents} onEditDocument={onEditDocument} onAddDocument={this.handleAddDocumentClick} />
                    {this.renderDialog(contract.client.deliveryMethod)}
{/*
                    <div className={cnContract('Title')}>
                        Документы
                        <IconButton className={cnContract('TitleButton')} color="primary" size="small" onClick={this.handleAddDocumentClick}>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <div className={cnContract('Documents')}>
                        {(documents || []).map(({ type, period, file, id }) => (
                            <DocumentItem type={type} period={period} file={file} onEditClick={() => onEditDocument(id)} />
                        ))}
                    </div> */}
                    {/* <div className={cnContract('DocumentsLink')}>
                        <Link href={`/documents?contarct=${contract.id}`} target="_blank">Посмотреть все документы контракта</Link>
                    </div> */}
                </div>
            </div>
        )
    }
}
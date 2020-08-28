import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';

import { IContract } from '@typings/IContract';

import './Contract.scss';
const cnContract = cn('Contract');

interface IContractProps {
    contract?: IContract;
};

export class Contract extends PureComponent<IContractProps> {

    render() {
        const { contract } = this.props;

        if (!contract) {
            return null;
        }

        return (
            <div className={cnContract()}>
                <div className={cnContract('LeftColumn')}>
                    {/* <div className={cnContract('Description')}>
                        В архиве отсутсвует оригинал документа. Загрузите пожалуйста скан документа в формате PDF
                    </div>
                    <input id="file" style={{ display: "none" }} type="file" accept=".pdf" />
                    <label htmlFor="file">
                            <Button
                            variant="contained"
                            color="primary"
                            className={cnContract('Upload')}
                            startIcon={<CloudUploadIcon />}
                            component="span"
                        >
                            Загрузить PDF
                        </Button>
                    </label> */}
                    <div className={cnContract('Description')}>
                        В архиве есть оригинал документа. Вы можете просмотреть его, или загрузить новый.
                    </div>
                    <div className={cnContract('Document')}>

                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={cnContract('Upload')}
                        startIcon={<DescriptionIcon />}
                    >
                        Открыть в новом окне
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        className={cnContract('Upload')}
                    >
                        Изменить
                    </Button>
                </div>
                <div className={cnContract('RightColumn')}>
                    <div className={cnContract('Field', { type: 'client' })}>
                        <div className={cnContract('FieldName')}>
                            Клиент
                        </div>
                        <div className={cnContract('FieldValue')}>
                            {contract.client.name}
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'department' })}>
                        <div className={cnContract('FieldName')}>
                            Департамент
                        </div>
                        <div className={cnContract('FieldValue')}>
                            Симферополь
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'service-manager' })}>
                        <div className={cnContract('FieldName')}>
                            Дата заключения
                        </div>
                        <div className={cnContract('FieldValue')}>
                            12.08.2020
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'service-manager' })}>
                        <div className={cnContract('FieldName')}>
                            Дата завершения действия
                        </div>
                        <div className={cnContract('FieldValue')}>
                            12.09.2020
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'service-manager' })}>
                        <div className={cnContract('FieldName')}>
                            Сервис-менеджер
                        </div>
                        <div className={cnContract('FieldValue')}>
                            Зульфия Андатра Прокофьевна
                        </div>
                    </div>
                    <div className={cnContract('Field', { type: 'personal-manager' })}>
                        <div className={cnContract('FieldName')}>
                            Персональный менеджер
                        </div>
                        <div className={cnContract('FieldValue')}>
                            Андрей Картофанович Белиберда
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
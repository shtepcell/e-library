import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import { IContract } from '@typings/IContract';

import './Contract.scss';
import { DocumentItem } from '../DocumentItem/DocumentItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker } from '@material-ui/pickers';
const cnContract = cn('Contract');

interface IContractProps {
    contract?: IContract;
};

interface IOwnState {
    openDocumentDialog: boolean;
    date: Date,
    period: Date,
}


export class Contract extends PureComponent<IContractProps, IOwnState> {
    state = {
        openDocumentDialog: false,
        date: new Date(),
        period: new Date(),
    }

    handleAddDocumentClick = () => {
        this.setState({ openDocumentDialog: true })
    }

    handleCloseDialog = () => {
        this.setState({ openDocumentDialog: false })
    }

    handlePeriodChange = (date) => {
        this.setState({ period: date })
    }

    handleDateChange = (date) => {
        this.setState({ date })
    }

    renderDialog() {
        return (
            <Dialog className={cnContract('DocumentDialog')} fullWidth maxWidth="sm" onClose={this.handleCloseDialog} open={this.state.openDocumentDialog}>
                <DialogTitle id="simple-dialog-title">Загрузка документа</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <div className={cnContract('Row')}>
                            <TextField
                                className={cnContract('DocumentField', { type: 'number' })}
                                label="Номер документа"
                                type="number"
                                variant="outlined"
                            />
                            <TextField
                                className={cnContract('DocumentField', { type: 'type' })}
                                select
                                value={1}
                                variant="outlined"
                                label="Тип документа"
                                >
                                    <MenuItem value={1}>Акт оказанных услуг</MenuItem>
                                    <MenuItem value={2}>Акт свертки</MenuItem>
                                    <MenuItem value={3}>Бланк заказа</MenuItem>
                                    <MenuItem value={4}>Письмо</MenuItem>
                                    <MenuItem value={5}>Претензия</MenuItem>
                            </TextField>
                        </div>
                        <div className={cnContract('Row')}>
                            <KeyboardDatePicker
                                className={cnContract('DocumentField', { type: 'period' })}
                                views={['year', 'month']}
                                disableToolbar
                                value={this.state.period}
                                onChange={this.handlePeriodChange}
                                format="MM.YYYY"
                                id="date-picker-dialog"
                                label="Период"
                                inputVariant="outlined"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                className={cnContract('DocumentField', { type: 'date' })}
                                disableToolbar
                                format="DD.MM.YYYY"
                                id="date-picker-dialog"
                                value={this.state.date}
                                onChange={this.handleDateChange}
                                label="Дата отправки"
                                inputVariant="outlined"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                        <div className={cnContract('Row')}>
                            <TextField className={cnContract('DocumentField', { type: 'track' })} variant="outlined" label="Номер трека" />
                        </div>
                        <div className={cnContract('DialogButtons')}>
                            <FormControlLabel
                                className={cnContract('DialogCheck')}
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Оригинал в архиве"
                            />
                            <Button color="primary">
                                <CloudUploadIcon className={cnContract('UploadIcon')} />
                                Выбрать файл
                            </Button>
                        </div>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDialog} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={this.handleCloseDialog} color="primary" variant="contained">
                        Загрузить
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        const { contract } = this.props;

        if (!contract) {
            return null;
        }

        return (
            <div className={cnContract()}>
                <div className={cnContract('LeftColumn')}>
                    <div className={cnContract('Title')}>
                        Информация по контракту
                        <IconButton className={cnContract('TitleButton')} size="small" >
                            <CreateIcon />
                        </IconButton>
                    </div>
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
                <div className={cnContract('RightColumn')}>
                    <div className={cnContract('Title')}>
                        Документы контракта
                        <IconButton className={cnContract('TitleButton')} color="primary" size="small" onClick={this.handleAddDocumentClick}>
                            <AddIcon />
                        </IconButton>
                    </div>
                    {this.renderDialog()}
                    <div className={cnContract('Documents')}>
                        <DocumentItem />
                        <DocumentItem />
                        <DocumentItem />
                        <DocumentItem />
                    </div>
                </div>
            </div>
        )
    }
}
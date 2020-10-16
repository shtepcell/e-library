import React, { ChangeEventHandler } from 'react';
import { cn } from '@bem-react/classname';
import { Button, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, MenuItem, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';
import { DOCUMENT_TYPES } from '@const/documents';

import './DocumentUpload.scss';
import { request } from '@lib/request';
import { IDocument } from '@typings/IDocument';

const cnDocumentUpload = cn('DocumentUpload');
interface IOwnProps {
    onClose: VoidFunction;
    open: boolean;
    contractId: string;
    draftDocument?: Partial<IDocument>;
}

interface IOwnState {
    number?: number;
    type?: string;
    period?: Date;
    date?: Date;
    trackNumber?: string;
    orig?: boolean;
    file?: File;
    loading?: boolean;
}


export class DocumentUpload extends React.PureComponent<IOwnProps, IOwnState> {
    state: IOwnState = {
        type: DOCUMENT_TYPES[0],
        period: new Date(),
        date: new Date(),
    };

    onDocumentChange = (field: string) => (event) => {
        this.setState({ [field]: event.target.value || event.target.checked });
    }

    onSelectFile: ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({ file: event.target.files[0] })
    }

    handlePeriodChange = (date) => {
        this.setState({ period: date })
    }

    handleDateChange = (date) => {
        this.setState({ date })
    }

    onSaveClick = () => {
        this.setState({ loading: true });

        const {
            number,
            type,
            period,
            date,
            trackNumber,
            orig,
            file,
        } = this.state;

        const formData = new FormData();
        formData.append('number', String(number));
        formData.append('type', type);
        formData.append('period', String(period.valueOf()));
        formData.append('date', String(date.valueOf()));
        formData.append('trackNumber', trackNumber);
        formData.append('orig', String(orig));
        formData.append('file', file);
        formData.append('contract', String(this.props.contractId));

        request.post('/document', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            window.location.reload();
        }).catch(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        const { onClose, open } = this.props;
        const { number, type, period, date, trackNumber, orig, file, loading } = this.state;

        return (
            <Dialog className={cnDocumentUpload()} fullWidth maxWidth="sm" onClose={onClose} open={open}>
                <DialogTitle id="simple-dialog-title">Загрузка документа</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <div className={cnDocumentUpload('Row')}>
                            <TextField
                                className={cnDocumentUpload('DocumentField', { type: 'number' })}
                                label="Номер документа"
                                type="number"
                                onChange={this.onDocumentChange('number')}
                                variant="outlined"
                                value={number}
                            />
                            <TextField
                                className={cnDocumentUpload('DocumentField', { type: 'type' })}
                                select
                                onChange={this.onDocumentChange('type')}
                                value={type}
                                variant="outlined"
                                label="Тип документа"
                            >
                                {DOCUMENT_TYPES.map(item => (
                                    <MenuItem value={item}>{item}</MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={cnDocumentUpload('Row')}>
                            <KeyboardDatePicker
                                className={cnDocumentUpload('DocumentField', { type: 'period' })}
                                views={['year', 'month']}
                                disableToolbar
                                value={period}
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
                                className={cnDocumentUpload('DocumentField', { type: 'date' })}
                                disableToolbar
                                format="DD.MM.YYYY"
                                id="date-picker-dialog"
                                value={date}
                                onChange={this.handleDateChange}
                                label="Дата отправки"
                                inputVariant="outlined"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                        <div className={cnDocumentUpload('Row')}>
                            <TextField
                                className={cnDocumentUpload('DocumentField', { type: 'track' })}
                                variant="outlined"
                                label="Номер трека"
                                onChange={this.onDocumentChange('trackNumber')}
                                value={trackNumber || ''} />
                        </div>
                        <div className={cnDocumentUpload('DialogButtons')}>
                            <FormControlLabel
                                className={cnDocumentUpload('DialogCheck')}
                                control={
                                    <Checkbox
                                        onChange={this.onDocumentChange('orig')}
                                        value={orig}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Оригинал в архиве"
                            />
                            {!file && (
                                <>
                                    <input type="file" id="file" style={{ display: 'none' }} onChange={this.onSelectFile}/>
                                    <label htmlFor="file">
                                        <Button color="primary" component="span">
                                            <CloudUploadIcon className={cnDocumentUpload('UploadIcon')} />
                                            Выбрать файл
                                        </Button>
                                    </label>
                                </>
                            )}
                        </div>
                        {file && (
                            <div className={cnDocumentUpload('Row')}>
                                <Chip
                                    icon={<DescriptionIcon />}
                                    label={file.name}
                                    onDelete={() => this.setState({ file: undefined })}
                                />
                            </div>
                        )}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={this.onSaveClick} color="primary" variant="contained" disabled={!file || !period || !date || !number || loading}>
                        {loading ? 'Загрузка' : 'Загрузить'}
                        {loading && <CircularProgress style={{ width: 16, height: 16, marginLeft: 8 }} />}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
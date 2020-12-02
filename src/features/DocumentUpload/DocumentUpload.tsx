import React, { ChangeEventHandler } from 'react';
import { cn } from '@bem-react/classname';
import { Button, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, MenuItem, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';
import { DOCUMENT_TYPES } from '@const/documents';

import './DocumentUpload.scss';
import { IDocumentUploadProps } from '.';
import { ConfirmDialog } from '@components/ConfirmDialog/ConfirmDialog';

const cnDocumentUpload = cn('DocumentUpload');

interface IOwnState {
    file?: File;
    openDialogRemove?: boolean;
}

const texts = {
    exist: {
        loading: 'Сохранение',
        action: 'Сохранить',
    },
    new: {
        loading: 'Создание',
        action: 'Создать',
    },
}
export class DocumentUploadBase extends React.Component<IDocumentUploadProps, IOwnState> {
    state: IOwnState = {}

    onSelectFile: ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files[0];

        this.setState({ file })

        this.props.onSelectFile(file.name);
    }

    onRemoveFile = () => {
        this.setState({ file: undefined })

        this.props.onRemoveFile();
    }

    onCloseDialog = () => {
        this.props.onClose();
        setTimeout(this.props.onCloseDialog, 300);
    }

    onOpenRemoveDialog = () => {
        this.setState({ openDialogRemove: true });
    }

    onCloseRemoveDialog = () => {
        this.props.onDeleteDocument(this.props.draftDocument.id);
    }

    onSaveClick = () => {
        const { id, number, type, period, date, trackNumber, fileName, comment } = this.props.draftDocument;

        const formData = new FormData();
        formData.append('number', String(number));
        formData.append('type', type);
        formData.append('period', String(period));
        formData.append('date', String(date));
        formData.append('trackNumber', trackNumber);
        this.state.file && formData.append('file', this.state.file);
        fileName && formData.append('fileName', fileName);
        formData.append('contract', String(this.props.contractId));
        (typeof comment === 'string') && formData.append('comment', comment);

        if (id) {
            formData.append('id', String(id));
            this.props.saveDocument(formData);
        } else {
            this.props.createDocument(formData);
        }
    }

    render() {
        const { open, loading, draftDocument, onChangeDate, onChangePeriod, onChangeNumber, onChangeTrack, onChangeType, onChangeComment } = this.props;
        const { id, number, type, period, date, trackNumber, fileName, comment } = draftDocument;
        const { openDialogRemove } = this.state;

        return (
            <Dialog className={cnDocumentUpload()} fullWidth maxWidth="sm" onClose={this.onCloseDialog} open={open}>
                <DialogTitle id="simple-dialog-title">Загрузка документа</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <div className={cnDocumentUpload('Row')}>
                            <TextField
                                className={cnDocumentUpload('DocumentField', { type: 'number' })}
                                label="Номер документа"
                                type="number"
                                onChange={(event) => onChangeNumber(event.target.value)}
                                variant="outlined"
                                value={number}
                            />
                            <TextField
                                className={cnDocumentUpload('DocumentField', { type: 'type' })}
                                select
                                onChange={(event) => onChangeType(event.target.value)}
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
                                onChange={(d) => onChangePeriod(d.valueOf())}
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
                                onChange={(d) => onChangeDate(d.valueOf())}
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
                                onChange={(event) => onChangeTrack(event.target.value)}
                                value={trackNumber || ''} />

                        </div>
                        <div className={cnDocumentUpload('Row')}>
                            <TextField
                                className={cnDocumentUpload('DocumentField', { type: 'comment' })}
                                variant="outlined"
                                label="Комментарий"
                                multiline
                                rowsMax={5}
                                onChange={(event) => onChangeComment(event.target.value)}
                                value={comment || ''} />
                        </div>
                        <div className={cnDocumentUpload('DialogButtons')}>
                            {!fileName && (
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
                        {fileName && (
                            <div className={cnDocumentUpload('Row')}>
                                <Chip
                                    icon={<DescriptionIcon />}
                                    label={fileName}
                                    onDelete={this.onRemoveFile}
                                />
                            </div>
                        )}
                    </form>
                </DialogContent>
                <DialogActions>
                    <div>
                        {id && (
                            <Button onClick={this.onOpenRemoveDialog} color="secondary">
                                Удалить
                            </Button>
                        )}
                    </div>
                    <DialogActions>
                        <Button onClick={this.onCloseDialog} color="primary">
                            Отменить
                        </Button>
                        <Button onClick={this.onSaveClick} color="primary" variant="contained" disabled={!period || !date || !number || loading}>
                            {texts[id ? 'exist' : 'new'][loading ? 'loading' : 'action']}
                            {loading && <CircularProgress style={{ width: 16, height: 16, marginLeft: 8 }} />}
                        </Button>
                    </DialogActions>
                </DialogActions>
                <ConfirmDialog
                    onReject={this.onCloseRemoveDialog}
                    onAgree={this.onCloseRemoveDialog}
                    open={openDialogRemove}
                    textHint="Документ исчезнет из базы навсегда, вложенный файл будет удален."
                    textTitle="Вы уверены, что хотите удалить этот документ?" />
            </Dialog>
        )
    }
}
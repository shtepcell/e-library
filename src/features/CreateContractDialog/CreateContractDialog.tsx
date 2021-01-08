import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import _debounce from 'lodash/debounce';

import './CreateContractDialog.scss';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Chip, CircularProgress
} from '@material-ui/core';
import { IContract, ContractType, ContractStatus } from '@typings/IContract';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Departments } from '@const/departments';
import { i18n } from '@lib/i18n';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import { request } from '@lib/request';
import { getFullName } from '@lib/helper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';

const cnCreateContractDialog = cn('CreateContractDialog');
interface IOwnProps {
    contract?: IContract;
    open?: boolean;
    onClose?: () => void;
};

interface IOwnState {
    contract?: Partial<IContract>;
    personalSuggest: string[];
    serviceSuggest: string[];
    clientSuggest: string[];
    loading?: boolean;
};

export class CreateContractDialog extends Component<IOwnProps, IOwnState> {
    state: IOwnState = {
        contract: {
            type: 'Договор',
            status: 'Активен',
            department: '',
            conclusionDate: new Date(),
            endDate: new Date(),
        },
        personalSuggest: [],
        serviceSuggest: [],
        clientSuggest: [],
    }

    componentDidUpdate(prevProps) {
        if (this.props.contract !== prevProps.contract) {
            this.setState({ contract: this.props.contract || {
                type: 'Договор',
                status: 'Активен',
                department: '',
                conclusionDate: new Date(),
                endDate: new Date(),
            } });
        }
    }

    handlerContractChange = (field: keyof IContract) => (event) => {
        const newContract = { ...this.state.contract };

        // @ts-ignore
        newContract[field] = event.target.value;

        this.setState({ contract: newContract });
    }

    handleOrigChange = (event) => {
        const newContract = { ...this.state.contract };

        // @ts-ignore
        newContract.orig = event.target.checked;

        this.setState({ contract: newContract });
    }

    handleConclusionDateChange = (date) => {
        const newContract = { ...this.state.contract };

        newContract['conclusionDate'] = date;

        this.setState({ contract: newContract });
    };

    handleEndDateChange = (date) => {
        const newContract = { ...this.state.contract };

        newContract['endDate'] = date;

        this.setState({ contract: newContract });
    };

    getSuggestedPManager = _debounce(() => {
        this.setState({ personalSuggest: [] });

        request.get('/managers', {
            params: {
                search: this.state.contract.personalManager,
                limit: 5,
            }
        }).then(({ data : { items }}) => {
            this.setState({ personalSuggest: items.map(getFullName) })
        });
    }, 500);


    getSuggestedSManager = _debounce(() => {
        this.setState({ serviceSuggest: [] });

        request.get('/managers', {
            params: {
                search: this.state.contract.serviceManager,
                limit: 5,
            }
        }).then(({ data: { items } }) => {
            this.setState({ serviceSuggest: items.map(getFullName) })
        });
    }, 500);

    getSuggestClient = _debounce((value) => {
        request.get('/clients', {
            params: {
                search: value,
                limit: 5,
            }
        }).then(({ data }) => {
            this.setState({ clientSuggest: data.items.map(({ name }) => name) })
        });
    }, 500);

    onPManagerChange = (event) => {
        this.handlerContractChange('personalManager')(event);

        this.getSuggestedPManager();
    };

    onSManagerChange = (event) => {
        this.handlerContractChange('serviceManager')(event);

        this.getSuggestedSManager();
    };

    onPManagerSelect = (event) => {
        this.setState({
            contract: {
                ...this.state.contract,
                personalManager: event.target.value,
            }
        })
    }

    onSManagerSelect = (event) => {
        this.setState({
            contract: {
                ...this.state.contract,
                serviceManager: event.target.value,
            }
        })
    }

    onClientSelect = (event) => {
        this.setState({
            contract: {
                ...this.state.contract,
                client: event.target.value,
            }
        })
    }

    onClientChange = (event) => {
        this.handlerContractChange('client')(event);

        this.getSuggestClient(event.target.value);
    };


    onSelectFile = (event) => {
        const file = event.target.files[0];
        this.setState({ contract: { ...this.state.contract, fileName: file.name, file } });
    }

    onRemoveFile = () => {
        const contract = { ...this.state.contract };

        delete contract.file;
        delete contract.fileName;

        this.setState({ contract });
    }

    uploadFile = (id: string) => {
        const { file, fileName } = this.state.contract;

        const formData = new FormData();

        file && formData.append('file', file);
        fileName && formData.append('fileName', fileName);

        return request.post(`/contract/${id}/file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    }

    createHandler = () => {
        this.setState({ loading: true });

        if (this.state.contract.id) {
            request.patch(`/contract/${this.state.contract.id}`, this.state.contract)
                .then(() => this.uploadFile(this.state.contract.id))
                .then(() => window.location.reload())
                .catch(() => this.setState({ loading: true }));
        } else {
            request.post('/contract', this.state.contract)
                .then(({ data: { id } }) => this.uploadFile(id))
                .then(() => window.location.reload())
                .catch(() => this.setState({ loading: true }));
        }
    }


    render() {
        const { open, onClose } = this.props;
        const { type, department, status, serviceManager, personalManager, conclusionDate, endDate, amount, client, orig, fileName, id } = this.state.contract;
        const { serviceSuggest, personalSuggest, clientSuggest, loading } = this.state;

        const disabledCreate = loading || !type || !department || !status || !serviceManager || !personalManager || !conclusionDate || !endDate || !client;

        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" className={cnCreateContractDialog()}>
                <DialogTitle id="simple-dialog-title">Создание контракта</DialogTitle>
                <DialogContent>
                    <div className={cnCreateContractDialog('Row')}>
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'type' })}
                            select
                            value={type}
                            onChange={this.handlerContractChange('type')}
                            variant="outlined"
                            label="Тип контракта"
                            >
                                <MenuItem value="Договор">Договор</MenuItem>
                                <MenuItem value="Государственный контракт">Государственный контракт</MenuItem>
                        </TextField>
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'department' })}
                            select
                            value={department}
                            onChange={this.handlerContractChange('department')}
                            variant="outlined"
                            label="Департамент"
                            >
                                {Departments.map(item => (<MenuItem value={item}>{item}</MenuItem>))}
                        </TextField>
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'status' })}
                            select
                            value={status}
                            onChange={this.handlerContractChange('status')}
                            variant="outlined"
                            label="Статус"
                            >
                                <MenuItem value={i18n('active')}>{i18n('active')}</MenuItem>
                                <MenuItem value={i18n('blocked')}>{i18n('blocked')}</MenuItem>
                                <MenuItem value={i18n('waiting')}>{i18n('waiting')}</MenuItem>
                                <MenuItem value={i18n('deleted')}>{i18n('deleted')}</MenuItem>
                                <MenuItem value={i18n('canceled')}>{i18n('canceled')}</MenuItem>
                        </TextField>
                    </div>
                    <div className={cnCreateContractDialog('Row')}>
                        <Autocomplete
                            options={clientSuggest}
                            className={cnCreateContractDialog('Field', { type: 'client' })}
                            noOptionsText="Нет доступных вариантов"
                            filterOptions={(x) => x}
                            value={client}
                            onInputChange={this.onClientChange}
                            onSelect={this.onClientSelect}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Клинет"
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className={cnCreateContractDialog('Row')}>
                        <Autocomplete
                            className={cnCreateContractDialog('Field', { type: 'serviceManager' })}
                            options={serviceSuggest}
                            noOptionsText="Нет доступных вариантов"
                            filterOptions={(x) => x}
                            value={serviceManager}
                            onSelect={this.onSManagerSelect}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onChange={this.onSManagerChange}
                                    label="Сервис-менеджер"
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Autocomplete
                            options={personalSuggest}
                            className={cnCreateContractDialog('Field', { type: 'personalManager' })}
                            noOptionsText="Нет доступных вариантов"
                            filterOptions={(x) => x}
                            value={personalManager}
                            onSelect={this.onPManageerSelect}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onChange={this.onPManagerChange}
                                    label="Персональный менеджер"
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className={cnCreateContractDialog('Row')}>
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'amount' })}
                            value={amount}
                            onChange={this.handlerContractChange('amount')}
                            variant="outlined"
                            label="Сумма контракта (с НДС)" />
                        <KeyboardDatePicker
                            className={cnCreateContractDialog('Field', { type: 'dateOfConclusion' })}
                            disableToolbar
                            format="DD.MM.YYYY"
                            id="date-picker-dialog"
                            label="Дата заключения контракта"
                            value={conclusionDate}
                            onChange={this.handleConclusionDateChange}
                            inputVariant="outlined"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            className={cnCreateContractDialog('Field', { type: 'endDate' })}
                            disableToolbar
                            format="DD.MM.YYYY"
                            id="date-picker-dialog"
                            label="Дата завершения действия контракта"
                            value={endDate}
                            onChange={this.handleEndDateChange}
                            inputVariant="outlined"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </div>
                    <FormControlLabel
                        className={cnCreateContractDialog('DialogCheck')}
                        control={
                            <Checkbox
                                checked={orig}
                                onChange={this.handleOrigChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Оригинал в архиве"
                    />
                    <>
                    <input type="file" id="contract-file" style={{ display: 'none' }} onChange={this.onSelectFile}/>
                    {fileName ? (
                        <Chip
                            icon={<DescriptionIcon />}
                            label={fileName}
                            onDelete={this.onRemoveFile}
                        />
                    ) : (
                        <label htmlFor="contract-file">
                            <Button color="primary" component="span">
                                <CloudUploadIcon className={cnCreateContractDialog('UploadIcon')} />
                                Выбрать файл
                            </Button>
                        </label>
                    )}
                </>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={this.createHandler} color="primary" variant="contained" disabled={disabledCreate}>
                        {id ? 'Сохранить' : 'Создать'}
                        {loading && <CircularProgress style={{ width: 16, height: 16, marginLeft: 8 }} />}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
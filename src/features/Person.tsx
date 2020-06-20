import React from 'react';
import { IPerson } from '../../types/models/IPerson';

interface IPersonProps {
    className?: string;
}

interface IPersonState {
    person?: IPerson;
}

export class Person extends React.PureComponent<IPersonProps, IPersonState> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8888/api/person/1')
            .then(res => res.json())
            .then((person: IPerson) => {
                this.setState({ person });
            });
    }

    render() {
        return (
            <div className="Person">
                {this.state.person?.name}
            </div>
        )
    }
}

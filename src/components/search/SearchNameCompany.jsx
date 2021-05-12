import React from 'react';
import Server from '../server/server';
import { Form, Row } from 'react-bootstrap';
import SelectForm from '../questionnaire/SelectForm';

export default class SearchNameCompany extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            nameCompany: ''
        }

        this.getDataNotId = this.getDataNotId.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
        this.doChangeValue = this.doChangeValue.bind(this);
    }

    doEmpty() {
    }

    doChangeValue(data) {
        console.log(data);
    }

    async getDataNotId() {
        new Promise((resolve) => {
            resolve(Server.getDataFromServerNotId('Main'))
        }).then(result => {
            // console.log(result);
            this.arrName = [];

            result.forEach(data => {
                let name = (JSON.parse(data.uo_array));
                console.log(name[1].value);
                this.arrName = [...this.arrName, name[1].value]
            })
            console.log(this.arrName);

            this.arrNameCompany = [];

            this.arrName.forEach(data => {
                if (!this.arrNameCompany.includes(data) && data !== undefined) this.arrNameCompany = [...this.arrNameCompany, data]
            })
            console.log(this.arrNameCompany.join(', '));
            this.setState({ nameCompany: this.arrNameCompany.join(', ') })

        }).catch(result => {
            console.log("ErorR: ");
            console.log(result);
        })
    }

    componentDidMount() {
        this.getDataNotId();
    }

    render() {

        const nameCompany = this.state.nameCompany;

        return (
            <>
                <Form.Group>
                    <Row>
                        <SelectForm
                            id={1}
                            width={12}
                            show={true}
                            label="Поиск предприятия по названию:"
                            placeholder="Название предприятия"
                            description=""
                            option={nameCompany}
                            // value={this.value[3] ? this.value[3].value : ''}
                            // value={this.value[3].value}
                            onChangeValue={this.doChangeValue}
                            onChangeVisionBlock={this.doEmpty}
                        />
                    </Row>
                </Form.Group>
            </>
        )
    }
}
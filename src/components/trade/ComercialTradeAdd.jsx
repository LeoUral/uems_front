import React from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import InputForm from '../questionnaire/InputForm';

export default class ComercialTradeAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }

        this.doChangeValue = this.doChangeValue.bind(this);
    }

    doChangeValue(data) {
        this.props.onChangeValue(data);
    }

    render() {

        const id = this.props.id;

        return (
            <>
                <Row>
                    <InputForm
                        id={+id}
                        width={6}
                        show={true}
                        // verify="number"
                        label=""
                        placeholder="Название дополнительного параметра"
                        description="Коммерческие параметры торгов"
                        // value={this.value[1] ? this.value[1].value : ''}
                        onChangeValue={this.doChangeValue}
                    />

                    <InputForm
                        id={+id + 1}
                        width={6}
                        show={true}
                        // verify="number"
                        label=""
                        placeholder="Требование к дополнительному параметру"
                        description="Коммерческие параметры торгов"
                        // value={this.value[1] ? this.value[1].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                </Row>
            </>
        )
    }
}
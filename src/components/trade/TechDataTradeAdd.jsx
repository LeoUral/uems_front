import React from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import TextareaForm from '../questionnaire/TextareaForm';

export default class TechDataTradeAdd extends React.Component {
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

        this.value = this.props.value;

        return (
            <>
                <Row>
                    <TextareaForm
                        rows={3}
                        width={6}
                        show={true}
                        label=""
                        id={+id}
                        placeholder="Название параметра"
                        information="Технические параметры торгов"
                        description="Технические параметры торгов"
                        // value={value}
                        value={this.value[+id] && this.value[+id].value}
                        onChangeValue={this.doChangeValue}
                    />

                    <TextareaForm
                        rows={3}
                        width={6}
                        show={true}
                        label=""
                        id={+id + 1}
                        placeholder="Требование к параметру"
                        information="Требование к параметру"
                        description="Технические параметры торгов"
                        // value={value}
                        value={this.value[+id + 1] && this.value[+id + 1].value}
                        onChangeValue={this.doChangeValue}
                    />
                </Row>
            </>
        )
    }
}
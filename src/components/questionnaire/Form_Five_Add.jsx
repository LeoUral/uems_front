import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import InputForm from './InputForm';
import CheckForm from './CheckForm';

export default class Form_Five_Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus'
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
    }

    //* Пустышка
    doEmpty() {

    }

    //* данные с полей формы, формируются в массив объектов
    doChangeValue(data) {
        this.props.onChangeValue(data);
    }

    componentDidMount() {

    }

    render() {

        const id = this.props.id;
        this.value = this.props.value;

        return (

            <React.Fragment>
                <Row>
                    <InputForm
                        id={+id + 1}
                        width={9}
                        show={true}
                        // verify="number"
                        label=""
                        placeholder="Название предприятия"
                        description="Аутсорсинг, термическая обработка"
                        value={this.value[+id + 1] ? this.value[+id + 1].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                </Row>
                <Row> &nbsp; </Row>
                <Row>
                    <CheckForm
                        id={+id + 2}
                        width={4}
                        show={true}
                        placeholder="Печная"
                        description="Аутсорсинг, термическая обработка"
                        value={this.value[+id + 2] ? this.value[+id + 2].value : ''}
                        onChangeValue={this.doChangeValue}
                        onChangeVisionBlock={this.doEmpty}
                    />
                    <CheckForm
                        id={+id + 3}
                        width={4}
                        show={true}
                        placeholder="Внепечная"
                        description="Аутсорсинг, термическая обработка"
                        value={this.value[+id + 3] ? this.value[+id + 3].value : ''}
                        onChangeValue={this.doChangeValue}
                        onChangeVisionBlock={this.doEmpty}
                    />
                    <CheckForm
                        id={+id + 4}
                        width={4}
                        show={true}
                        placeholder="Коврики(маты)"
                        description="Аутсорсинг, термическая обработка"
                        value={this.value[+id + 4] ? this.value[+id + 4].value : ''}
                        onChangeValue={this.doChangeValue}
                        onChangeVisionBlock={this.doEmpty}
                    />
                    <CheckForm
                        id={+id + 5}
                        width={4}
                        show={true}
                        placeholder="Колпаки"
                        description="Аутсорсинг, термическая обработка"
                        value={this.value[+id + 5] ? this.value[+id + 5].value : ''}
                        onChangeValue={this.doChangeValue}
                        onChangeVisionBlock={this.doEmpty}
                    />
                </Row>
                <Row>
                    <Col>Укажите: Мах длина, ширина, высота (мм) </Col>
                </Row>
                <Row>
                    <InputForm
                        id={+id + 6}
                        width={2}
                        show={true}
                        verify="number"
                        label=""
                        placeholder="Мах длина, мм"
                        description="Аутсорсинг, термическая обработка"
                        value={this.value[+id + 6] ? this.value[+id + 6].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                    <InputForm
                        id={+id + 7}
                        width={2}
                        show={true}
                        verify="number"
                        label=""
                        placeholder="Мах ширина, мм"
                        description="Аутсорсинг, термическая обработка"
                        value={this.value[+id + 7] ? this.value[+id + 7].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                    <InputForm
                        id={+id + 8}
                        width={2}
                        show={true}
                        verify="number"
                        label=""
                        placeholder="Мах высота, мм"
                        description="Аутсорсинг, термическая обработка"
                        value={this.value[+id + 8] ? this.value[+id + 8].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                    <InputForm
                        id={+id + 9}
                        width={2}
                        show={true}
                        verify="number"
                        label=""
                        placeholder="Мах вес деталей, тн"
                        description="Аутсорсинг, термическая обработка"
                        value={this.value[+id + 9] ? this.value[+id + 9].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                    <InputForm
                        id={+id + 10}
                        width={3}
                        show={true}
                        verify="number"
                        label=""
                        placeholder="Мах темп. обраб. деталей, С"
                        description="Аутсорсинг, термическая обработка"
                        value={this.value[+id + 10] ? this.value[+id + 10].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                </Row>
            </React.Fragment>

        )
    }
}
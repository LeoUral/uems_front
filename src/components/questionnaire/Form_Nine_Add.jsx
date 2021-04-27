import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_Nine_Add extends React.Component {
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
                    <SelectForm
                        id={+id}
                        width={4}
                        show={true}
                        label=""
                        placeholder="Виды механизмов"
                        description="Грузоподъемное оборудование"
                        option="Кран-балки, Мостовые краны, Консоли, Другие механизмы"
                        value={this.value[+id] ? this.value[+id].value : ''}
                        // value={this.value[3].value}
                        onChangeValue={this.doChangeValue}
                        onChangeVisionBlock={this.doEmpty}
                    />
                    <InputForm
                        id={+id + 1}
                        width={3}
                        show={true}
                        verify="number"
                        label=""
                        placeholder="Количество, шт"
                        description="Грузоподъемное оборудование"
                        value={this.value[+id + 1] ? this.value[+id + 1].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                    <InputForm
                        id={+id + 2}
                        width={3}
                        show={true}
                        verify="number"
                        label=""
                        placeholder="Грузоподъемность, тн"
                        description="Грузоподъемное оборудование"
                        value={this.value[+id + 2] ? this.value[+id + 2].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                </Row>
                <Row> &nbsp; </Row>

            </React.Fragment>

        )
    }
}
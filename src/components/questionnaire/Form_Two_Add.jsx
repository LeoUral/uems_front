import React from 'react';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_Two_Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus'
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
    }
    //*пустышка
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

                <Form.Group>
                    <Row> Механическая обработка деталей и узлов (указать максимальные значения)</Row>

                    {/* <Row> <span className="span_title" > Ручная резка: </span></Row> */}
                    <Row>
                        <SelectForm
                            id={+id}
                            width={3}
                            show={true}
                            label=""
                            placeholder="Обработка"
                            description="Механическая обработка"
                            option="Токарная, Токарно-карусельная, Сверловка отверстий, Фрезерная обработка, Расточные операции"
                            value={this.value[+id] ? this.value[+id].value : ''}
                            // value={this.value[3].value}
                            onChangeValue={this.doChangeValue}
                            onChangeVisionBlock={this.doEmpty}
                        />

                        <InputForm
                            id={+id + 1}
                            width={2}
                            show={true}
                            verify="number"
                            label=""
                            placeholder="Диаметр, мм"
                            description="Механическая обработка"
                            value={this.value[+id + 1] ? this.value[+id + 1].value : ''}
                            onChangeValue={this.doChangeValue}
                        />
                        <InputForm
                            id={+id + 2}
                            width={2}
                            show={true}
                            verify="number"
                            label=""
                            placeholder="Длина, мм"
                            description="Механическая обработка"
                            value={this.value[+id + 2] ? this.value[+id + 2].value : ''}
                            onChangeValue={this.doChangeValue}
                        />
                        <InputForm
                            id={+id + 3}
                            width={2}
                            show={true}
                            verify="number"
                            label=""
                            placeholder="Высота, мм"
                            description="Механическая обработка"
                            value={this.value[+id + 3] ? this.value[+id + 3].value : ''}
                            onChangeValue={this.doChangeValue}
                        />
                        <InputForm
                            id={+id + 4}
                            width={2}
                            show={true}
                            verify="number"
                            label=""
                            placeholder="Ширина, мм"
                            description="Механическая обработка"
                            value={this.value[+id + 4] ? this.value[+id + 4].value : ''}
                            onChangeValue={this.doChangeValue}
                        />
                        <InputForm
                            id={+id + 5}
                            width={2}
                            show={true}
                            verify="number"
                            label=""
                            placeholder="Масса, тн"
                            description="Механическая обработка"
                            value={this.value[+id + 5] ? this.value[+id + 5].value : ''}
                            onChangeValue={this.doChangeValue}
                        />
                        <SelectForm
                            id={+id + 6}
                            width={3}
                            show={true}
                            label=""
                            placeholder="Наличие ЧПУ обработки"
                            description="Механическая обработка"
                            option="Да, Нет"
                            value={this.value[+id + 6] ? this.value[+id + 6].value : ''}
                            // value={this.value[3].value}
                            onChangeValue={this.doChangeValue}
                            onChangeVisionBlock={this.doEmpty}
                        />
                    </Row>

                </Form.Group>

                <Row><div></div></Row>

            </React.Fragment>
        )
    }
}
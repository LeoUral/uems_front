import React from 'react';
import { Row } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_Twelve_Add extends React.Component {
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
                        width={3}
                        show={true}
                        label=""
                        placeholder="Укажите год"
                        description="Количество рекламаций"
                        option="2015, 2016, 2017, 2018, 2019, 2020, 2021"
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
                        placeholder="Кол-во рекламаций, шт"
                        description="Количество рекламаций"
                        value={this.value[+id + 1] ? this.value[+id + 1].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                </Row>
                <Row> &nbsp; </Row>

            </React.Fragment>

        )
    }
}
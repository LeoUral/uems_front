import React from 'react';
import { Row } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_Ten_Add1 extends React.Component {
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

        const id1 = this.props.id1;
        this.value = this.props.value;

        return (

            <React.Fragment>

                <Row>
                    <SelectForm
                        id={+id1}
                        width={4}
                        show={true}
                        label=""
                        placeholder="Вид сварки"
                        description="Аттестованные технологии сварки"
                        option="Электродуговая, Электрошлаковая, Электронно-лучевая, Лучевая(лазерная), Плазменная, Газовая, Термитная"
                        value={this.value[+id1] ? this.value[+id1].value : ''}
                        // value={this.value[3].value}
                        onChangeValue={this.doChangeValue}
                        onChangeVisionBlock={this.doEmpty}
                    />
                </Row>
                <Row> &nbsp; </Row>

            </React.Fragment>

        )
    }
}
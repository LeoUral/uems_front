import React from 'react';
import { Row } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_Twelve_Add1 extends React.Component {
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

        const id = this.props.id1;
        this.value = this.props.value;

        return (

            <React.Fragment>

                <Row >
                    <SelectForm
                        id={+id}
                        width={6}
                        show={true}
                        label=""
                        placeholder="Справочник методов"
                        description="Методы разрушающего и неразрушающего контроля, собственные"
                        option="Магнитный, Визуально-измерительный (оптический), Электрический, Вихретоковый (электромагнитный), Тепловой, Радиоволновой, Ультразвуковой (акустический), Радиационный (радиографический), Капиллярный (проникающими веществами), Вибрационный"
                        value={this.value[+id] ? this.value[+id].value : ''}
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
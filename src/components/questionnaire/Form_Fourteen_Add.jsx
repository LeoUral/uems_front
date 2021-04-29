import React from 'react';
import { Row } from 'react-bootstrap';
import InputForm from './InputForm';
import CalendarForm from './CalendarForm';

export default class Form_Fourteen_Add extends React.Component {
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
        const placeholder = this.props.placeholder;

        return (

            <React.Fragment>

                <Row>
                    <InputForm
                        id={+id}
                        width={9}
                        show={true}
                        // verify="number"
                        label=""
                        placeholder={'Виды ' + placeholder}
                        description="Разрешительная документация"
                        value={this.value[+id] ? this.value[+id].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                    <CalendarForm
                        id={+id + 1}
                        show={true}
                        placeholder={placeholder}
                        description="Разрешительная документация"
                        value={this.value[+id + 1] ? this.value[+id + 1].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                </Row>
                <Row> &nbsp; </Row>

            </React.Fragment>

        )
    }
}
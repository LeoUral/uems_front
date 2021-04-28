import React from 'react';
import { Row } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_Ten_Add2 extends React.Component {
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

        const id2 = this.props.id2;
        this.value = this.props.value;

        return (

            <React.Fragment>

                <Row>
                    <SelectForm
                        id={+id2}
                        width={2}
                        show={true}
                        label=""
                        placeholder="Разряд"
                        description="Количество сварщиков аттестованных НАКС"
                        option="1, 2, 3, 4, 5, 6"
                        value={this.value[+id2] ? this.value[+id2].value : ''}
                        // value={this.value[3].value}
                        onChangeValue={this.doChangeValue}
                        onChangeVisionBlock={this.doEmpty}
                    />
                    <SelectForm
                        id={+id2 + 1}
                        width={2}
                        show={true}
                        label=""
                        placeholder="Вид сварки"
                        description="Количество сварщиков аттестованных НАКС"
                        option="Электродуговая, Электрошлаковая, Электронно-лучевая, Лучевая(лазерная), Плазменная, Газовая, Термитная"
                        value={this.value[+id2 + 1] ? this.value[+id2 + 1].value : ''}
                        // value={this.value[3].value}
                        onChangeValue={this.doChangeValue}
                        onChangeVisionBlock={this.doEmpty}
                    />

                    <InputForm
                        id={+id2 + 2}
                        width={2}
                        show={true}
                        verify="number"
                        label=""
                        placeholder="Кол-во чел."
                        description="Количество сварщиков аттестованных НАКС"
                        value={this.value[+id2 + 2] ? this.value[+id2 + 2].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                    <InputForm
                        id={+id2 + 3}
                        width={3}
                        show={true}
                        // verify="number"
                        label=""
                        placeholder="Группы свариваемых материалов"
                        description="Количество сварщиков аттестованных НАКС"
                        value={this.value[+id2 + 3] ? this.value[+id2 + 3].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                    <InputForm
                        id={+id2 + 4}
                        width={3}
                        show={true}
                        verify="number"
                        label=""
                        placeholder="Толщина свариваемых мат. мм"
                        description="Количество сварщиков аттестованных НАКС"
                        value={this.value[+id2 + 4] ? this.value[+id2 + 4].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                </Row>
                <Row> &nbsp; </Row>

            </React.Fragment>

        )
    }
}
import React from 'react';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_Three_Add extends React.Component {
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
                        id={+id + 2}
                        width={3}
                        show={true}
                        label=""
                        placeholder="Тип сварки"
                        description="Аттестованные технологии сварки"
                        option="Электродуговая, Электрошлаковая, Электронно-лучевая, Лучевая(лазерная), Плазменная, Газовая, Термитная"
                        value={this.value[+id + 2] ? this.value[+id + 2].value : ''}
                        // value={this.value[3].value}
                        onChangeValue={this.doChangeValue}
                        onChangeVisionBlock={this.doEmpty}
                    />

                    <SelectForm
                        id={+id}
                        width={7}
                        show={true}
                        label=""
                        placeholder="Вид сварки"
                        description="Сварочное производство"
                        option="РД - Ручная дуговая сварка покрытыми электродами, РАД - Ручная аргонодуговая сварка неплавящимеся электродом, Г - Газовая сварка, РДН - Ручная дуговая наплавка покрытыми электродами, РДВ - Ванная ручная дуговая сварка покрытыми электродами, МП - Механизированная сварка плавящимеся электродом в среде активных газов и смесях, КТС - Контактная точечная сварка, КСО - Контактная стыковая сварка оплавлением, МАДП - Механизированная аргонодуговая сварка плавящимся электродом, МФ - Механизированная сварка под флюсом, МПГ - Механизированная сварка порошковой проволокой в среде активных газов, МПС - Механизированная сварка самозащитной порошковой проволокой, МПСВ - Ванная механизированная сварка самозащитной порошковой проволокой, МФН - Ванная механизированная сварка под флюсом, АФ - Автоматическая сварка под флюсом, ААД - Автоматическая аргонодуговая сварка неплавящимся электродом, ААДП - Автоматическая аргонодуговая сварка плавящимся электродом, АПГ - Автоматическая сварка плавящимся электродом в среде активных газов и смесях, АППГ - Автоматическая сварка порошковой проволокой в среде активных газов и смесях, АПИ - Автоматическая сварка порошковой проволокой в среде инертных газов и смесях, АПС - Автоматическая сварка самозащитной порошковой проволокой, П - плазменная сварка, НИ - Сварка нагретым инструментом полимерных материалов, ЗН - Сварка с закладными нагревателями полимерных материалов"
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
                        placeholder="Толщина, мм"
                        description="Сварочное производство"
                        value={this.value[+id + 1] ? this.value[+id + 1].value : ''}
                        onChangeValue={this.doChangeValue}
                    />
                </Row>
            </React.Fragment>

        )
    }
}
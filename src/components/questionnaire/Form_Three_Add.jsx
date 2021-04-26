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
                        id={+id}
                        width={8}
                        show={true}
                        label=""
                        placeholder="Вид сварки"
                        description="Сварочное производство"
                        option="РД - Ручная дуговая сварка покрытыми электродами, РАД - Ручная аргонодуговая сварка неплавящимеся электродом, Г - Газовая сварка, РДН - Ручная дуговая наплавка покрытыми электродами, РДВ - Ванная ручная дуговая сварка покрытыми электродами, МП - Механизированная сварка плавящимеся электродом в среде активных газов и смесях, КТС - Контактная точечная сварка, КСО - Контактная стыковая сварка оплавлением, МФ - Механизированная сварка под флюсом, МПГ - Механизированная сварка порошковой проволокой в среде активных газов, МПС - Механизированная сварка самозащитной порошковой проволокой, МПСВ - Ванная механизированная сварка самозащитной порошковой проволокой, МФН - Ванная механизированная сварка под флюсом, АФ - Автоматическая сварка под флюсом, НИ - Сварка нагретым инструментом полимерных материалов, ЗН - Сварка с закладными нагревателями полимерных материалов"
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
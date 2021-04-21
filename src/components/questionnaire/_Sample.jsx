import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CheckForm from './CheckForm';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class _Sample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            dataValue: []
        }

        this.doChangeValue = this.doChangeValue.bind(this);
    }

    doChangeValue(data) {
        console.log(data);
        this.setState({ dataValue: [...this.state.dataValue, data] })
        setTimeout(() => { console.log(this.state.dataValue) })
    }

    render() {

        const value = "12345"//ARRAY

        return (
            <>
                <Container fluid style={{ width: '80vw', padding: '0' }}>
                    <Row style={{ marginLeft: '0', marginRight: '0', width: '100%' }}>
                        <InputForm
                            id={1} //*ID позиции в анкете
                            width={4} //* ширина поля
                            show={true} //* видимость поля (true / false)
                            label="Полное наименование предприятия"
                            verify="number" //* верификация числовых полей ('number' / "")
                            placeholder="information" //* информация о поле, для базы
                            description="Position" //* описание поля
                            value={value} //* значение передаваемое с сервера
                            onChangeValue={this.doChangeValue} //* функция передающая STORE 
                        />
                        <InputForm
                            id={1}
                            width={4}
                            show={true}
                            verify="number"
                            label="Полное наименование предприятия"
                            placeholder="information"
                            description="Position"
                            value={value}
                            onChangeValue={this.doChangeValue}
                        />

                        <SelectForm
                            id={2}
                            width={4}
                            show={true}
                            label="Полное наименование предприятия"
                            placeholder="information"
                            description="Position"
                            option="position1, position2, position3, position4" //*список для выбора
                            value="position1"
                            onChangeValue={this.doChangeValue}
                        />
                    </Row>
                    <Row>
                        <CheckForm
                            id={3}
                            width={4}
                            show={true}
                            placeholder="information" //* подпись LABEL для чекбокса
                            description="Position"
                            value={false}
                            onChangeValue={this.doChangeValue}
                        />
                    </Row>
                </Container>
            </>
        )
    }
}
import React from 'react';
import { Form, Button, Container, Alert, Row, Col, Badge } from 'react-bootstrap';
import SelectForm from '../questionnaire/SelectForm';
import InputForm from '../questionnaire/InputForm';

export default class FeaturesTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: 1,
            base: [],
            value: [],
            data: [],
            errData: false
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
        this.doChangeVisionBlock = this.doChangeVisionBlock.bind(this);
        this.verificationData = this.verificationData.bind(this);
    }

    doEmpty() {
    }

    doChangeVisionBlock(e) {
        console.log(e);
        if (e !== 'Выбор вида конкурса') {
            this.setState({ show: true })
        } else {
            this.setState({ show: false })
        }
    }

    handleClickSave() {
        console.log('click SAVE');
        console.log(this.state.data);

        this.setState({ value: this.state.data })
        this.verificationData();

        setTimeout(() => {
            if (this.state.errData) {
                this.props.onSaveDataFeatures(this.state.data);
            }
        }, 500)
    }

    doChangeValue(data) {
        console.log(data);
        this.setState({ data: [...this.state.data, data] })

        setTimeout(() => {
            let arrData = [{ id: 0 }];

            this.state.data.forEach((data) => {
                if (typeof (+data.id) !== undefined) arrData[+data.id] = data;
            })
            this.setState({ data: arrData })
        })
        // setTimeout(() => { this.verificationData() })
    }

    verificationData() {
        if (this.state.data.length > 2) {
            this.setState({ errData: true })
        } else {
            this.setState({ errData: false })
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ data: this.props.value });// загружаем данные от родителя
            this.verificationData();
            if (this.props.value[1]) this.setState({ show: true })
        }, 500)
    }

    render() {

        this.value = this.props.value;
        const show = this.state.show;
        const errShow = this.state.errData;

        return (
            <>
                <Container style={{ maxHeight: '60vh', overflowY: 'auto' }} >
                    <Row>
                        <Col>
                            <h4>
                                Особенности торгов &nbsp;
                                 {errShow ?
                                    <Badge variant="info"> ok </Badge>
                                    :
                                    <Badge variant="danger"> Незаполнено </Badge>
                                }
                            </h4>
                        </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                    <Row>
                        <SelectForm
                            id={1}
                            width={3}
                            show={true}
                            label=""
                            placeholder="Выбор вида конкурса"
                            description="Вид конкурса"
                            option="Конкурс на закупку, Конкурс на продажу"
                            value={this.value[1] ? this.value[1].value : ''}
                            // value={this.value[3].value}
                            onChangeValue={this.doChangeValue}
                            onChangeVisionBlock={this.doChangeVisionBlock}
                        />
                        <InputForm
                            id={2}
                            width={9}
                            show={show}
                            // verify="number"
                            label=""
                            placeholder="Наименование конкурса"
                            description="Наименование конкурса"
                            value={this.value[2] ? this.value[2].value : ''}
                            // value={this.value[2].value}
                            onChangeValue={this.doChangeValue}
                        />
                    </Row>
                    <Row>&nbsp;</Row>
                    <Button
                        variant={errShow ? "warning" : 'secondary'}
                        className="btn_trade_form"
                        onClick={this.handleClickSave}
                        style={{ width: '290px' }}
                    >
                        Проверить и сохранить параметры
                           </Button>
                </Container>
            </>
        )
    }
}
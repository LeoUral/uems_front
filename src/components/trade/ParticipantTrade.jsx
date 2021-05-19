import React from 'react';
import { Button, Container, Row, Col, Badge, Jumbotron, Table } from 'react-bootstrap';
import SearchModal from '../search/SearchModal';

export default class ParticipantTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: 1,
            base: [],
            renderTable: [],
            data: [],
            errData: false
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.doChangeShow = this.doChangeShow.bind(this);
        this.doChoiceCompany = this.doChoiceCompany.bind(this);
        this.doTableChoice = this.doTableChoice.bind(this);
        this.verificationData = this.verificationData.bind(this);
    }

    doTableChoice(dataRender) {
        this.setState({ renderTable: dataRender });
    }

    doChoiceCompany(arrId) {
        console.log(arrId);
        this.setState({ data: arrId })
        setTimeout(() => { this.verificationData() }, 500)
    }

    doChangeShow() {
        this.setState({ show: !this.state.show })
    }

    handleClickSave() {
        console.log('click SAVE');
        if (this.state.errData) {
            this.props.onSaveDataParticipant(this.state.data);
            this.props.onRenderTable(this.state.renderTable);
        }

    }

    verificationData() {

        if (this.state.data.length > 0) {
            this.setState({ errData: true })
        } else {
            this.setState({ errData: false })
        }
    }

    doChangeValue(data) {
        console.log(data);
    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({ data: this.props.value, renderTable: this.props.renderTable });// загружаем данные от родителя
            this.verificationData();
            console.log(this.props.value);//test
        }, 500)
    }

    render() {

        const show = this.state.show;
        const renderTable = this.state.renderTable;
        const errShow = this.state.errData;

        return (
            <>
                <div style={{ position: 'absolute', left: '0', top: '-10%' }} >
                    <SearchModal
                        show={show}
                        onChangeShow={this.doChangeShow}
                        onChoiceCompany={this.doChoiceCompany}
                        onTableChoice={this.doTableChoice}
                    />
                </div>
                <Container style={{ maxHeight: '60vh', overflowY: 'auto' }} >
                    <Row>
                        <Col>
                            <h4>
                                Участники торгов &nbsp;
                                 {errShow ?
                                    <Badge variant="info">  ok </Badge>
                                    :
                                    <Badge variant="danger">   Невыбраны </Badge>
                                }
                            </h4>
                        </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                    <Container fluid style={{ padding: '0' }}>
                        <Jumbotron style={{ marginBottom: '0', minHeight: '20vh' }}>

                            {renderTable.length > 0 ?
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Компания</th>
                                            <th>Телефон</th>
                                            <th>E-mail</th>
                                            <th>Город</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderTable}
                                    </tbody>
                                </Table>
                                :
                                <h1>Блок поиска по предприятиям в базе LOTUS</h1>
                            }

                            <Row>&nbsp;</Row>
                            <Button variant="outline-secondary" onClick={this.doChangeShow} > Запустить форму поиска </Button>
                        </Jumbotron>
                    </Container>
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
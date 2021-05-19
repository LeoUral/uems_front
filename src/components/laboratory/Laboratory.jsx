import React from 'react';
import { Jumbotron, Container, Button, Col, Row } from 'react-bootstrap';
import Server from '../server/server';

export default class Laboratory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            base: []
        }
        this.handleClickList = this.handleClickList.bind(this);
        this.parsingDataList = this.parsingDataList.bind(this);
    }

    handleClickList() {
        console.log('List OBJECT:');

        new Promise((resolve) => {
            resolve(Server.getListObject())
        }).then(result => {
            // console.log(result);//test
            this.parsingDataList(result);

        }).catch(result => {
            console.log("ERROR LIST");
            console.log(result);
        })
    }

    parsingDataList(data) {
        data.forEach((data, index) => {
            // console.log('ID USER: ' + data.uo_usid + '   NAME:  ' + data.uo_name);
            this.setState({
                base: [...this.state.base,
                <React.Fragment key={index}>
                    <Row>
                        <Col> ID USER: &nbsp; {data.uo_usid} &nbsp; --- &nbsp; NAME: &nbsp; {data.uo_name}</Col>
                    </Row>
                </React.Fragment>
                ]
            })
        })
    }

    componentDidMount() {

    }

    render() {


        return (
            <>
                <Container fluid style={{ padding: '0' }}>
                    <Jumbotron style={{ marginBottom: '0', minHeight: '78vh', maxHeight: '60vh', overflowY: 'auto' }}>
                        <h1>Стрница системного пользования</h1>
                        <p>Осторжно! Кнопки подключены и ведут к удалению базы данных!</p>
                        <Button
                            variant="secondary"
                            onClick={this.handleClickList}
                            className="btn_trade_form"
                        >
                            Список имен объектов
                          </Button>
                        {this.state.base}
                    </Jumbotron>
                </Container>
            </>
        )
    }
}
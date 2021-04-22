/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { Container } from 'react-bootstrap';
import Form_Main from './Form_Main';
import Server from '../server/server';
import _Sample from './_Sample';


export default class Questionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            show: false,
            data: [],
            view: true
        }
        this.createDataServer = this.createDataServer.bind(this);
        this.sendDataServer = this.sendDataServer.bind(this);
        this.doCreateDataServer = this.doCreateDataServer.bind(this);
        this.doUpdateDataOnServer = this.doUpdateDataOnServer.bind(this);
        // this.doData = this.doData.bind(this);//todo петля данных
    }

    // doData(data) {
    //     this.setState({ data: data })// todo петля данных
    // }

    doCreateDataServer(data, name, id) {
        this.createDataServer(data, name, id);
    }

    doUpdateDataOnServer(data, name, id) {
        this.sendDataOnServer(data, name, id);
    }

    //*Создаем новые данные на сервере
    async createDataServer(data, name, id) {

        new Promise((resolve) => {
            resolve(Server.createDataOnServer(JSON.stringify(data), name, id))
        }).then((result) => {
            console.log("ALL OK: CREATE data on Server");
            console.log(result);
        }).catch(result => {
            console.log('ERROR: NOT create data on Server');
            console.log(result);
        })
    }

    //*Обновляем данные на сервере
    async sendDataServer(data, name, id) {

        new Promise((resolve) => {
            resolve(Server.sendDataOnServer(JSON.stringify(data), name, id))
        }).then(result => {
            console.log("ALL OK: UPDATE data on Server");
            console.log(result);
        }).catch(result => {
            console.log("ERROR: NOT update data on Server");
            console.log(result);
        })
    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true })
        }, 500)
    }

    render() {

        const show = this.state.show;
        const view = this.state.view;

        return (
            <>
                <div style={{ opacity: show ? '1' : '0', transition: ' 0.75s' }} >
                    <Container fluid style={{ padding: '0' }}>

                        {/* <_Sample /> */}

                        {view ?
                            <Form_Main
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                            /> : ''}

                    </Container>
                </div>
            </>
        )
    }
}
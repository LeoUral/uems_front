import React from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import Server from './server/server';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            showOff: false,
            eMail: '',
            password: '',
            error: false
        }

        this.handleClickLogIn = this.handleClickLogIn.bind(this);
        this.handleClickRegistration = this.handleClickRegistration.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.processingError = this.processingError.bind(this);
        this.goInSystem = this.goInSystem.bind(this);
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    handleChangeEmail(e) {
        this.setState({ eMail: e.target.value })
    }

    //* обработка перехода к регистрации
    handleClickRegistration(e) {
        e.preventDefault();
        // console.log('REGISTRATION');//test

        this.setState({ showOff: true });

        setTimeout(() => {
            this.props.onChangeShowLoginPage();
            this.props.onChangeShowRegistration();
        }, 750) // время так же завазано в css
    }

    //* Обрабатываем ввход в ситстему. 
    //* idUser  в локальное хранилище
    //* отключение модалок, переход к осн.блоку
    goInSystem(id) {
        this.setState({ showOff: true, idUser: id });
        localStorage.setItem('idUser', id);

        this.props.onLoadStart(+id);

        setTimeout(() => {
            this.props.onChangeShowLoginPage();
        }, 750) // время так же завазано в css
    }

    //* Данные с сервера о соответствии данных
    async getDataFromServer(login, password) {

        new Promise((resolve) => {
            resolve(Server.getDataLogin(login, password))

        }).then((result) => {
            console.log(result);// test

            if (result) {
                this.goInSystem(result);

            } else {
                console.log("ОТКАЗАНО с СЕРВЕРА");//test
                this.setState({ error: true })
                this.processingError();
            }
        })
            .catch((result) => {
                console.log(result);
                console.log('ERROR LOG IN');
            })
    }

    //* сброс данных, вывод информации об ошибке, перезапуск ввода
    processingError() {
        setTimeout(() => {
            this.setState({ error: false, eMail: '', password: '' })
        }, 2000)
    }

    handleClickLogIn(e) {
        e.preventDefault();
        console.log('LOG IN');
        if (this.state.eMail.length > 0 && this.state.password.length > 0) {
            this.getDataFromServer(this.state.eMail, this.state.password)
            // console.log('ДОСТУПНО');//test
        } else {
            // console.log('ОТКАЗАНО');//test
            // this.props.onChangeShowLoginPage();
        }
    }
    componentDidMount() {
        //*сразу вход, если не было совершено выхода
        if (localStorage.getItem('idUser')) this.props.onChangeShowLoginPage();
    }

    render() {

        const error = this.state.error;

        return (
            <>
                <div className="modal_window">
                    <div className="shadow"></div>
                    <Form className={this.state.showOff ? "modal_form_off" : "modal_form"}>
                        <Container className="container">
                            <Alert variant={error ? "danger" : "success"} style={{ textAlign: 'center' }}>
                                <Alert.Heading>{error ? 'Ошибка входа' : 'Ввойдите в систему'}</Alert.Heading>

                            </Alert>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={this.handleChangeEmail}
                                    value={this.state.eMail}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleChangePassword}
                                    value={this.state.password}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" style={{ marginRight: '40px' }} onClick={this.handleClickLogIn} >
                                Войти
                            </Button>
                            <Button variant="secondary" type="submit" onClick={this.handleClickRegistration}>
                                Регистрация
                            </Button>
                        </Container>
                    </Form>
                </div>
            </>
        )
    }
}
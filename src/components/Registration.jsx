import React from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import Server from './server/server';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            showOff: false,
            colorErrorPass: '',
            colorErrorMail: '',
            eMail: '',
            password: '',
            rePassword: '',
            errorPass: false,
            errorMail: false
        }

        this.handleClickRegistration = this.handleClickRegistration.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeRePassword = this.handleChangeRePassword.bind(this);
        this.sendDataRegistrationUser = this.sendDataRegistrationUser.bind(this);
    }

    handleChangePassword(e) {
        console.log(e.target.value);
        this.setState({ password: e.target.value })
    }

    handleChangeRePassword(e) {
        console.log(e.target.value);
        this.setState({ rePassword: e.target.value })
    }

    handleChangeEmail(e) {
        console.log(e.target.value);
        this.setState({ eMail: e.target.value })
    }

    //* проверка на правильность ввода данных
    verificationPassword() {
        if (this.state.password !== this.state.rePassword || this.state.password.length < 1 || this.state.rePassword.length < 1) {
            this.setState({
                errorPass: true,
                colorErrorPass: '#dc3545'
            });
            console.log(" verif error pass ");
            return false;
        }
        return true;
    }

    verificationMail() {
        if (!this.state.eMail.includes('@') && !this.state.eMail.includes('.')) {
            this.setState({
                errorMail: true,
                colorErrorMail: '#dc3545'
            });
            console.log(" verif error mail ");
            return false;
        }
        console.log(" verif all ok!!! ");
        return true;
    }

    //* проверяем и отправляем данные с формы
    handleClickRegistration(e) {
        e.preventDefault();

        if (this.verificationPassword() && this.verificationMail() || this.verificationMail() && this.verificationPassword()) {

            this.sendDataRegistrationUser(this.state.eMail, this.state.password);

            this.setState({ showOff: true });
            setTimeout(() => {
                this.props.onChangeShowLoginPage();
                this.props.onChangeShowRegistration();
            }, 750)

        } else {
            setTimeout(() => {
                this.setState({
                    errorPass: false,
                    errorMail: false,
                    colorErrorPass: '',
                    colorErrorMail: ''
                })
            }, 750)
        }
    }

    async sendDataRegistrationUser(login, password) {

        new Promise((resolve) => {
            resolve(Server.sendDataRegistration(login, password))
        }).then((result) => {
            console.log(result);
            console.log("All OK, new User on server");
        })
            .catch((result) => {
                console.log(result);
                console.log("Not OK, User not on server");
            })
    }

    render() {

        const colorErrorPass = this.state.colorErrorPass;
        const colorErrorMail = this.state.colorErrorMail;

        return (
            <>
                <>
                    <div className="modal_window">
                        <div className="shadow"></div>
                        <Form className={this.state.showOff ? "modal_form_off" : "modal_form"}>
                            <Container className="container">
                                <Alert variant="success" style={{ textAlign: 'center' }}>
                                    <Alert.Heading>Регистрация в системе</Alert.Heading>

                                </Alert>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Адрес электронной почты</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Введите email"
                                        onChange={this.handleChangeEmail}
                                        style={{ backgroundColor: `${colorErrorMail}` }}
                                    />
                                    <Form.Text className="text-muted">
                                        *Мы никогда не будем делиться вашей электронной почтой ни с кем другим.
                            </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Пароль для входа</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Пароль"
                                        onChange={this.handleChangePassword}
                                        style={{ backgroundColor: `${colorErrorPass}`, transition: '0.5s' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Повторите пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Повторите пароль"
                                        onChange={this.handleChangeRePassword}
                                        style={{ backgroundColor: `${colorErrorPass}`, transition: '0.5s' }}
                                    />
                                </Form.Group>

                                <Button variant="secondary" type="submit" onClick={this.handleClickRegistration}>
                                    Зарегистрироваться
                            </Button>
                            </Container>
                        </Form>
                    </div>
                </>
            </>
        )
    }
}
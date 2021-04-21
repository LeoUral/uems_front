import React from 'react';
import Navigation from '../components/decoration/Navigation';
import LoginPage from '../components/LoginPage';
import Registration from './Registration';

export default class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            show_LoginPage: true,
            show_Registration: false
        }

        this.doChangeShowLoginPage = this.doChangeShowLoginPage.bind(this);
        this.doChangeShowRegistration = this.doChangeShowRegistration.bind(this);
    }

    doChangeShowRegistration() {
        this.setState({ show_Registration: !this.state.show_Registration })
    }

    doChangeShowLoginPage() {
        this.setState({ show_LoginPage: !this.state.show_LoginPage })
    }

    render() {
        return (
            <>
                { this.state.show_LoginPage ?
                    <LoginPage
                        onChangeShowLoginPage={this.doChangeShowLoginPage}
                        onChangeShowRegistration={this.doChangeShowRegistration}
                    /> : ''}

                {this.state.show_Registration ?
                    <Registration
                        onChangeShowLoginPage={this.doChangeShowLoginPage}
                        onChangeShowRegistration={this.doChangeShowRegistration}
                    /> : ''}

                <Navigation />
            </>
        )
    }
}
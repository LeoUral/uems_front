import React from 'react'
import { Container } from 'react-bootstrap';
import Form_Main from './Form_Main';
import _Sample from './_Sample';

export default class Questionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            show: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true })
        }, 500)
    }

    render() {

        const show = this.state.show;

        return (
            <>
                <div style={{ opacity: show ? '1' : '0', transition: ' 0.75s' }} >
                    <Container fluid style={{ padding: '0' }}>

                        {/* <_Sample /> */}

                        <Form_Main />

                    </Container>
                </div>
            </>
        )
    }
}
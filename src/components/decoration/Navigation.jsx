import React from 'react';
import { Container } from 'react-bootstrap';
import NaviBar from './NaviBar';
import SaidBar from './SaidBar';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus'
        }
    }

    render() {
        return (
            <>
                <Container className="navigation" fluid style={{ paddingLeft: '0', paddingRight: '0' }}>
                    <SaidBar />
                    <NaviBar />
                </Container>
            </>
        )
    }
}
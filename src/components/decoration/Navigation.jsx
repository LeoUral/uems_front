import React from 'react';
import { Container } from 'react-bootstrap';
import NaviBar from './NaviBar';
import RightMenuBlock from './RightMenuBlock';
import SaidBar from './SaidBar';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            show: false
        }

        this.doChangeShow = this.doChangeShow.bind(this);
        this.doFocusSaidBar = this.doFocusSaidBar.bind(this);
    }

    doFocusSaidBar() {
        this.setState({ show: false })
    }

    doChangeShow() {
        console.log('CLICK');
        this.setState({ show: !this.state.show })
    }

    render() {
        return (
            <>
                <Container className="navigation" fluid style={{ paddingLeft: '0', paddingRight: '0', width: '99vw' }}>

                    <SaidBar
                        show={this.state.show}
                        onFocusSaidBar={this.doFocusSaidBar}
                    />

                    <RightMenuBlock
                        show={this.state.show}
                        onChangeShow={this.doChangeShow}
                    />

                </Container>
            </>
        )
    }
}
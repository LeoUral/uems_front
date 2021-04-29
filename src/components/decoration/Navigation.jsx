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
            show: false,
            urlPosition: ''
        }

        this.doChangeShow = this.doChangeShow.bind(this);
        this.doFocusSaidBar = this.doFocusSaidBar.bind(this);
        this.doTransferUrl = this.doTransferUrl.bind(this);
    }

    doTransferUrl(url) {
        this.setState({ urlPosition: url })
    }

    doFocusSaidBar() {
        this.setState({ show: false })
    }

    doChangeShow() {
        console.log('CLICK');
        this.setState({ show: !this.state.show })
    }

    render() {

        this.nameCompany = this.props.nameCompany;

        return (
            <>
                <Container className="navigation" fluid style={{ paddingLeft: '0', paddingRight: '0' }}>

                    <SaidBar
                        show={this.state.show}
                        onFocusSaidBar={this.doFocusSaidBar}
                        onTransferUrl={this.doTransferUrl}
                        nameCompany={this.nameCompany}
                    />

                    <RightMenuBlock
                        show={this.state.show}
                        urlPosition={this.state.urlPosition}
                        onChangeShow={this.doChangeShow}
                    />

                </Container>
            </>
        )
    }
}
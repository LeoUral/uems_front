import React from 'react';
import Footer from '../Footer';
import Main from '../Main';
import NaviBar from './NaviBar';

export default class RightMenuBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus'
        }

        this.doChangeShow = this.doChangeShow.bind(this);
    }

    doChangeShow() {
        this.props.onChangeShow();
    }


    render() {

        return (
            <>
                <div className="right-menu-block">
                    <NaviBar
                        onChangeShow={this.doChangeShow}
                        show={this.props.show}
                    />

                    <Main
                        urlPosition={this.props.urlPosition}
                    />

                    <Footer />
                </div>
            </>
        )
    }
}
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
        this.doUpInfoBlock = this.doUpInfoBlock.bind(this);
        this.doCreateTrade = this.doCreateTrade.bind(this);
    }

    doCreateTrade(data) {
        this.props.onCreateTrade(data);
    }

    doUpInfoBlock(data) {
        this.props.onUpInfoBlock(data);
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
                        infoBlock={this.props.infoBlock}
                        onUpInfoBlock={this.doUpInfoBlock}
                        onCreateTrade={this.doCreateTrade}
                    />

                    <Footer />
                </div>
            </>
        )
    }
}
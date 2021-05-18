import React from 'react';
import MainContent from './MainContent';
import Questionnaire from './questionnaire/Questionnaire';
import Search from './search/Search';
import TradeCustomer from './trade/TradeCustomer';
import TradeParticipant from './trade/TradeParticipant';


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus'
        }

        this.doUpInfoBlock = this.doUpInfoBlock.bind(this);
    }

    doUpInfoBlock(data) {
        this.props.onUpInfoBlock(data);
    }

    componentDidMount() {
    }

    render() {

        //* пропсы с URL по которому следует загрузить блок
        const urlPosition = this.props.urlPosition;
        // console.log(urlPosition + ' < in Main');//test

        return (
            <>
                <div>
                    {urlPosition === '' ? <MainContent /> : ''}
                    {urlPosition === "/questionnaire" ?
                        <Questionnaire
                            infoBlock={this.props.infoBlock}
                            onUpInfoBlock={this.doUpInfoBlock}
                        />
                        : ''}
                    {urlPosition === '/tech_others' ?
                        <Search /> : ''}
                    {urlPosition === '/customer' ?
                        <TradeCustomer /> : ''}
                    {urlPosition === '/participant' ?
                        <TradeParticipant /> : ''}
                </div>
            </>
        )
    }
}
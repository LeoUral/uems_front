import React from 'react';
import MainContent from './MainContent';
import Questionnaire from './questionnaire/Questionnaire';
import Search from './search/Search';
import TradeCustomer from './trade/TradeCustomer';
import TradeParticipant from './trade/TradeParticipant';
import Laboratory from './laboratory/Laboratory';


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            showTrade: false
        }

        this.doUpInfoBlock = this.doUpInfoBlock.bind(this);
        this.doCreateTrade = this.doCreateTrade.bind(this);
        this.lookAvailableTrade = this.lookAvailableTrade.bind(this);
    }
    doCreateTrade(data) {
        this.props.onCreateTrade(data);
    }

    doUpInfoBlock(data) {
        this.props.onUpInfoBlock(data);
    }

    //*смотрим наличие доступных торгов как участник
    lookAvailableTrade(data) {
        if (data.otherNumberTrade) {
            let lengthArray = data.otherNumberTrade.length;
            if (lengthArray === 0) {
                this.setState({ showTrade: false })
            } else {
                this.setState({ showTrade: true })
            }
        }

    }

    componentDidMount() {
        setTimeout(() => { this.lookAvailableTrade(this.props.infoBlock) }, 500)
    }

    render() {

        //* пропсы с URL по которому следует загрузить блок
        const urlPosition = this.props.urlPosition;
        // console.log(urlPosition + ' < in Main');//test

        return (
            <>
                <div>
                    {urlPosition === '' ?
                        <MainContent
                            showTrade={this.state.showTrade}
                        /> : ''}
                    {urlPosition === "/questionnaire" ?
                        <Questionnaire
                            infoBlock={this.props.infoBlock}
                            onUpInfoBlock={this.doUpInfoBlock}
                        />
                        : ''}
                    {urlPosition === '/tech_others' ?
                        <Search /> : ''}
                    {urlPosition === '/customer' ?
                        <TradeCustomer
                            onCreateTrade={this.doCreateTrade}
                            keyNameTrade={this.props.keyNameTrade}
                        /> : ''}
                    {urlPosition === '/participant' ?
                        <TradeParticipant
                            keyOtherNumberTrade={this.props.keyOtherNumberTrade}
                        /> : ''}
                    {urlPosition === '/laboratory' ?
                        <Laboratory /> : ''}
                </div>
            </>
        )
    }
}
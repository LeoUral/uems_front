import React from 'react';
import MainContent from './MainContent';
import Questionnaire from './questionnaire/Questionnaire';
import Search from './search/Search';


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

    render() {

        //* пропсы с URL по которому следует загрузить блок
        const urlPosition = this.props.urlPosition;
        console.log(urlPosition + ' < in Main');

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
                </div>
            </>
        )
    }
}
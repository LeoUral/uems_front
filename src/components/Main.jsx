import React from 'react';
import MainContent from './MainContent';
import Questionnaire from './questionnaire/Questionnaire';


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus'
        }
    }

    render() {

        //* пропсы с URL по которому следует загрузить блок
        const urlPosition = this.props.urlPosition;
        console.log(urlPosition + ' < in Main');

        return (
            <>
                <div>
                    {urlPosition === '' ? <MainContent /> : ''}
                    {urlPosition === "/questionnaire" ? <Questionnaire /> : ''}
                </div>
            </>
        )
    }
}
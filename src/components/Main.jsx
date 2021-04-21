import React from 'react';
import MainContent from './MainContent';


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            show_MainContent: true
        }
    }

    render() {

        const show_MainContent = this.state.show_MainContent;

        return (
            <>
                <div>
                    {show_MainContent ? <MainContent /> : ''}
                </div>
            </>
        )
    }
}
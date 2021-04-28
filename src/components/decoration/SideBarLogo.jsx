import React from 'react';
import Server from '../server/server';

export default class SideBarLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            data_Main: [],
            lengthDataFromServer_Main: 0
        }
        this.handleClickLogo = this.handleClickLogo.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.writeParseData = this.writeParseData.bind(this);
    }

    //* получаем данные с сервера
    async getDataFromServer(name, id) {

        new Promise((resolve) => {
            resolve(Server.getDataFromServer(name, id))
        }).then((result) => {
            this.writeParseData(result, name);
            this.setState({ lengthDataFromServer: result.length });
        }).catch((result) => {
            this.setState({ lengthDataFromServer: 0 });
            console.log(result);
        })
        console.log('LOAD DATA FROM SERVER');//test
    }

    //*парсинг данных с сервера
    writeParseData(dataJson, name) {
        let dataNew = [];
        dataJson.forEach((data) => {
            dataNew = [...dataNew, { id: data.id, description: data.description, information: data.information, value: data.value }]
        })
        if (name === 'Main') this.setState({ data_Main: dataNew, lengthDataFromServer_Main: dataNew.length })

    }

    handleClickLogo() {
        console.log('CLICK');
    }

    componentDidMount() {
        this.getDataFromServer('Main', Number(localStorage.getItem('idUser')));
    }

    render() {

        const show = this.props.show;
        this.nameCompany = this.state.data_Main[1]; //! получить название предприятия

        console.log(this.nameCompany);

        return (
            <>
                <div
                    className={show ? 'side_bar_logo-vert' : 'side_bar_logo'}
                    onClick={this.handleClickLogo}
                >
                    {/* {this.nameCompany[1].value} */}
                </div>
            </>
        )
    }
}
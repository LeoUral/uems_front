//* работа с сервером

class Server {
    constructor() {
        this.arrDataFromServer = [];
    }

    //* получаем данные с сервера
    async getDataFromServer(name, id) {
        let urlReg = 'http://api.uems.ru:5000/sthe/api/v1.0/object_read'; // для чтения


        let userBody = {
            key: 'weifeiph7Pie',
            userid: id, //*опционально, может быть пустой
            name: name //todo основной ключ
        };

        let response = await fetch(urlReg, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8;Access-Control-Allow-Origin',
            },
            body: JSON.stringify(userBody)
        });
        // console.log(response);

        let result = await response.json();

        if (result.length > 0) {
            return this.arrDataFromServer = JSON.parse((result[result.length - 1]).uo_array);
        } else {
            return null
        }
    }

    //* отправляем данные на сервер, создаем
    async createDataOnServer(data, name, id) {
        let urlReg = 'http://api.uems.ru:5000/sthe/api/v1.0/object_create'; // создаем      

        let userBody = {
            key: 'weifeiph7Pie',
            userid: id, //*опционально, может быть пустой
            name: name,
            data: data
        };

        let response = await fetch(urlReg, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8;Access-Control-Allow-Origin',
            },
            body: JSON.stringify(userBody)
        });

        let result = await response.json();
        // console.log(result); //test
    }

    //* отправляем данные на сервер, обновление
    async sendDataOnServer(data, name, id) {
        let urlReg = 'http://api.uems.ru:5000/sthe/api/v1.0/object_update'; // для обновление        

        let userBody = {
            key: 'weifeiph7Pie',
            userid: id, //*опционально, может быть пустой
            name: name,
            data: data
        };

        let response = await fetch(urlReg, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8;Access-Control-Allow-Origin',
            },
            body: JSON.stringify(userBody)
        });

        let result = await response.json();
        // console.log('RESULT');//test
        // console.log(result); //test
    }

    //* Сервер для входа в систему
    async getDataLogin(login, password) {

        let url = 'http://api.uems.ru:5000/sthe/api/v1.0/client_auth'; // для входа

        let userBody = {
            key: 'weifeiph7Pie',
            login: login,
            password: password
        };

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8;Access-Control-Allow-Origin',
            },
            body: JSON.stringify(userBody)
        });

        let result = await response.json(); //! полученный ID пользователя
        console.log(result); //* test   ID user

        if (result) {
            console.log('ACCESS'); //test          
            return result;

        } else {
            console.log('NOT ACCESS'); //test
            return result;
        }
    }

    //*Сервер для регистрации нового пользователя
    async sendDataRegistration(eMail, password) {

        let urlReg = 'https://api.uems.ru/sthe/api/v1.0/client_reg'; // для регистрации

        console.log('СЕРВЕР РЕГИСТРАЦИИ');

        let userBody = {
            key: 'weifeiph7Pie',
            login: eMail,
            password: password
        };

        let response = await fetch(urlReg, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8;Access-Control-Allow-Origin',
            },
            body: JSON.stringify(userBody)
        });
        let result = await response.json();

        return result;
    }
}
export default new Server();
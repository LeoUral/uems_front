import React from 'react';
import { Table } from 'react-bootstrap';

export default class SaerchTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    render() {
        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Компания</th>
                            <th>Телефон</th>
                            <th>E-mail</th>
                            <th>Город</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }
}
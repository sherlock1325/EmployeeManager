import React, { Component } from 'react';
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";
import "./index.css"
import AppNavbar from "./AppNavbar";
class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {clients: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/employee')
            .then(response => response.json())
            .then(data => this.setState({clients: data}));
    }

    async remove(id) {
        await fetch(`/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== id);
            this.setState({clients: updatedClients});
        });
    }

    render() {
        const {clients, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const clientList = clients.map(client => {
            return <tr key={client.id}>
                <td style={{whiteSpace: 'nowrap'}}>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="btn btn-primary m-1" tag={Link} to={"/employee/" + client.id}>Edit</Button>
                        <Button size="sm" color="btn btn-danger m-1" onClick={() => this.remove(client.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (

            <div>
                <AppNavbar/>
                <div className="container">


                    <div className="row">

                        <Container fluid>

                            <Table className="mt-4">
                                <thead>
                                <tr>
                                    <th width="30%">Name</th>
                                    <th width="25%">Email</th>
                                    <th width="25%">Phone</th>
                                    <th width="20%">Actions</th>

                                </tr>
                                </thead>
                                <tbody>
                                {clientList}
                                </tbody>
                            </Table>
                        </Container>


                    </div>


                </div>
            </div>
        );
    }


}
export default EmployeeList;
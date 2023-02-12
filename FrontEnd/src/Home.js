import React, {Component} from 'react';
import {Button, ButtonGroup, Card, CardBody, CardSubtitle, CardText, CardTitle, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";
import "./index.css"
import AppNavbar from "./AppNavbar";

class Home extends Component {

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
            return <div className="col-lg-3 employees" key={client.id}>
                <Card
                    style={{
                        width: '18rem'
                    }}
                >
                    <img
                        alt="Sample"
                        src={client.imageUrl}
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            {client.name}
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                             +{client.phone}
                        </CardSubtitle>
                        <CardText>
                            Some quick example text to build on the card title and make up the bulk of the card‘s
                            content.
                        </CardText>
                        <ButtonGroup>
                            <Button size="sm" color="btn btn-outline-primary m-1" tag={Link} to={"/employee/" + client.id}>Edit</Button>
                            <Button size="sm" color="btn btn-outline-danger m-1" onClick={() => this.remove(client.id)}>Delete</Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            </div>


        });

        return (

          <div>
              <AppNavbar/>
              <div className="container">
                  <div>

                  </div>

                  <div className="row">

                      {clientList}

                  </div>
              </div>
          </div>
        );
    }


}

export default Home;
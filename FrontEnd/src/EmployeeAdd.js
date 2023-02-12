import React, {Component, useEffect, useState} from 'react';
import {Link, useParams, withRouter} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from "./AppNavbar";
const EmployeeAdd=()=>{

   const emptyItem = {
        name: '',
        email: '',
       imageUrl: '',
       phone: '',
       jobTitle: ''
    };
    const [group, setGroup] = useState(emptyItem);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        if (id !== 'new') {
            fetch(`/employee`)
                .then(response => response.json())
                .then(data => setGroup(data));
        }
    }, [id, setGroup]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setGroup({ ...group, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/employee`, {
            method:  'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        });
        setGroup(emptyItem);
        navigate('/');
    }


        const title = <h2>{'Add Client'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={group.name || ''}
                               onChange={handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={group.email || ''}
                               onChange={handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="imageUrl">ImageUrl</Label>
                        <Input type="text" name="imageUrl" id="imageUrl" value={group.imageUrl || ''}
                               onChange={handleChange} autoComplete="imageUrl"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input type="number" name="phone" id="phone" value={group.phone || ''}
                               onChange={handleChange} autoComplete="phone"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type={"submit"} >Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
export default (EmployeeAdd);
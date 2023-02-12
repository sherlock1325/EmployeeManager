import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import EmployeeList from "./EmployeeList";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeAdd from "./EmployeeAdd";
import AppNavbar from "./AppNavbar";


class App extends Component {


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/employees" element={<EmployeeList />} />
                            <Route path='/employee/:id'  element={<EmployeeEdit/>}/>
                            <Route path='/employee'  element={<EmployeeAdd/>}/>
                        </Routes>
                    </BrowserRouter>
                </header>
            </div>
        );
    }
}
export default App;

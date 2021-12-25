import axios from 'axios';
import React, { Component } from 'react';

class CustomerAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: "",
            age: "",
            gender: "",
            job: "",
            fileName: ""
        };
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then(res => {
                console.log(res.data);
            });
        this.setState({
            file: null,
            userName: "",
            age: "",
            gender: "",
            job: "",
            fileName: ""
        });
        window.location.reload();
    }

    fileHandler = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    valueHandler = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = "/api/customers";
        const formData = new FormData();
        formData.append("image", this.state.file);
        formData.append("name", this.state.userName);
        formData.append("age", this.state.age);
        formData.append("gender", this.state.gender);
        formData.append("job", this.state.job);
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        return axios.post(url, formData, config);
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <h1>고객추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.fileHandler} /><br />
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.valueHandler} /><br />
                나이: <input type="text" name="age" value={this.state.age} onChange={this.valueHandler} /><br />
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.valueHandler} /><br />
                직업: <input type="text" name="job" value={this.state.job} onChange={this.valueHandler} /><br />
                <button type="submit">추가하기</button>
            </form>
        );
    }
}

export default CustomerAdd;
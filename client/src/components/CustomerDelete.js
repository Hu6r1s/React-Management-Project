import React, { Component } from 'react';
import  { withStyles, Dialog, Button, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

class CustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    deleteCustomer(id) {
        const url = "/api/customers/" + id;
        fetch(url, {
            method: "DELETE"
        });
        this.props.stateRefresh();
    }

    clickOpenHandler = () => {
        this.setState({
            open: true
        });
    }

    clickCloseHandler = () => {
        this.setState({
            open: false
        });
    };

    render() {
        return (
            <div>
            <Button variant='contained' color="secondary" onClick={this.clickOpenHandler}>삭제</Button>
            <Dialog open={this.state.open} onClose={this.clickCloseHandler}>
                <DialogTitle onClose={this.clickCloseHandler}>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 고객 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color="primary" onClick={e => {
                        this.deleteCustomer(this.props.id)
                    }}>삭제</Button>
                    <Button variant='contained' color="primary" onClick={e => {
                        this.deleteCustomer(this.props.id)
                    }}>취소</Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default CustomerDelete;
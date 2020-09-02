import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated, signout} from '../auth';
import { remove } from './apiUser';

class DeleteUser extends Component {
    state = {
        redirect: false
    };
    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        
        remove(userId, token)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                // Signout user
                signout(() => console.log("User is deleted"));
                //then redirect
                this.setState({redirect: true});
            }
            
        });
    }
    deleteConfirm = () => {
        
        let answer = window.confirm("Are you sure you want to delete your account?");
        if(answer) {
            this.deleteAccount();
        }
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <button
            onClick={this.deleteConfirm} 
            className="btn btn-raised btn-danger">
                Delete
            </button>
        );
    }
}

export default DeleteUser;
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AddMessage.css';
import { ResponseMessage } from '../Join';

interface Props {
    authName: string,
    sendMessage: (message: ResponseMessage) => void,
    id: string
}

class AddMessage extends Component<Props> {

    state: ResponseMessage = {
        name: this.props.authName,
        text: '',
        id: this.props.id
    }

    private handleInputChange = (event: { target: { value: string; }; }): void => {
        this.setState({
            text: event.target.value
        })
    }

    private onSendButton = (): void => {
        this.props.sendMessage(this.state);
        console.log(this.state)
        this.setState({
            text: ''
        })
    }

    private handleKeyPress = (event: { key: string; }): void => {
        if (event.key === 'Enter' && this.state.text.trim() !== '') {
            this.onSendButton()
        }
    }
    render() {
        return (
            <div className='add-message-bar'>
                <TextField
                    label='Type a message...'
                    variant='outlined'
                    type='text'
                    onChange={this.handleInputChange}
                    value={this.state.text}
                    fullWidth={true}
                    data-testid='add-message-input'
                    onKeyPress={this.handleKeyPress}
                />
                <Button
                    disabled={!this.state.text.trim() ? true : false}
                    className="submit"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.onSendButton}
                >
                    Send
                </Button>
            </div>
        );
    }
};

export default AddMessage;
import React, { Component, useState } from "react";
import MessageDataService from "../services/message.service";
import { withRouter } from '../common/with-router';
import '../App.css';


class Message extends Component {
    constructor(props) {
      super(props);
      this.getMessage = this.getMessage.bind(this);
      this.updateMessage = this.updateMessage.bind(this);

      this.state = {
        currentMessage: {
          id: null,
          msg_txt: null,
          annotation: null
        },
        count: 0
      };
    }
  
    getMessage(id) {
        MessageDataService.get(id)
            .then(response => {
                const { annotation } = response.data;

                if (annotation !== null) {
                    // If the annotation is not null, fetch a different message
                    this.incrementId();
                } else {
                    // If the annotation is null and msg_txt is not null, update the state with the retrieved message
                    this.setState({
                        currentMessage: response.data,
                    });
                }
            });
    }

    componentDidMount() {
        // Fetch the message with ID 0 when the component mounts
        this.getMessage(0);
    }

    updateMessage(user_annotation) {
        MessageDataService.update(this.state.id,
            this.setState({
                annotation: user_annotation
            })
        )
    }

    updateAnnotation = (newAnnotation) => {
        const { id } = this.state.currentMessage;

        MessageDataService.update(id, { annotation: newAnnotation })
            .then(response => {
                console.log(response.data);
                this.setState({
                    currentMessage: {
                        ...this.state.currentMessage,
                        annotation: newAnnotation
                    },
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    // Method to increment the ID
    incrementId = () => {
        this.setState(prevState => ({
            currentMessage: {
                ...prevState.currentMessage,
                id: prevState.currentMessage.id + 1
            }
        }), () => {
            this.getMessage(this.state.currentMessage.id);
        });
    }

    // Method to increment the ID
    decrementId = () => {
        this.setState(prevState => ({
            currentMessage: {
                ...prevState.currentMessage,
                id: prevState.currentMessage.id - 1
            }
        }), () => {
            // get message but bypass the logic of the getMessage function
            MessageDataService.get(this.state.currentMessage.id)
            .then(response => {
                this.setState({
                    currentMessage: response.data,
                });
            })
        });
    }

    // Method to update the annotation and then increment the ID
    updateAnnotationAndIncrement = (newAnnotation) => {
        // update count
        this.setState(prevState => ({ count: prevState.count + 1 }));
        // Update the annotation
        this.updateAnnotation(newAnnotation);

        // Increment the ID after updating the annotation
        this.incrementId();
    }

    render() {
        const { currentMessage } = this.state;
        const id_max = 3

        return (
            <div>
                
                {this.state.currentMessage.id <= id_max ? (
                    <div className="message-renderer">
                        
                        <h2>Message</h2>
                        
                        <p>Does the following meet the criteria?</p>

                        <div class="display">{ currentMessage.msg_txt }</div>
                        
                        <button onClick={() => this.updateAnnotationAndIncrement(1)}>Yes</button>
                        <button onClick={() => this.updateAnnotationAndIncrement(0)}>No</button> 
                        <button onClick={() => this.updateAnnotationAndIncrement(-1)}>Not Sure</button>
                        <button onClick={this.decrementId}>Back</button>

                        <p>You've annotated { this.state.count } messages.</p>
                    
                    </div>
                    ) : (
                <div>
                    <p>No data left to annotate! Thank you!</p>
                </div>
                )}
            </div>
        );   
    }
}

export default withRouter(Message);
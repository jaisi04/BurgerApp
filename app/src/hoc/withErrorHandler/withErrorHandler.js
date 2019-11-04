import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux1/Aux1'

const withErrorHandler = (WrappedComponet, axios) => {
    return class extends Component {
        
        state = {
            error: null,
            message: 'Uh-ho!BurgerBuilder seemed to be annoyed!'
        }

        componentDidMount(){
            this.reqIC = axios.interceptors.request.use(request=> {
                this.setState(()=>{
                    return {
                        error: null
                    };
                });
                return request;
            })
            this.resIC = axios.interceptors.response.use(res => res, error=> {
                this.setState(()=>{
                    return {
                        error: error
                    };
                });
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqIC);
            axios.interceptors.response.eject(this.resIC);
        }

        errorConfirmHandler(){
            this.setState(()=>{
                return {
                    error: null
                };
            });
        }

        render(){
            return (
                <Aux>
                    <Modal show = {this.state.error} clickHandler = {this.errorConfirmHandler}>
                        {this.state.error ? this.state.message : null}
                    </Modal>
                    <WrappedComponet {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
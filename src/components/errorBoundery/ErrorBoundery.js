import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundery extends Component { 
    state = {   
        error: false
    }

    componentDidCatch(err, errInf) {  
        console.log(err, errInf)
        this.setState({ 
            error: true
        })
    }

    render() {
        const error = this.state.error

        return (
            <>
                {error ? <ErrorMessage /> : this.props.children}
            </>
        )
    }
}

export default ErrorBoundery
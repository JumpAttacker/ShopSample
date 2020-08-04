import {Alert} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";

export interface IErrorAlertMessageProps {
    errorMessage: string | undefined,
    onClose: Function
}

const ErrorAlertMessage: React.FC<IErrorAlertMessageProps> = ({errorMessage, onClose} ) => {
    const closeHandler = () => {
        if (onClose)
            onClose();
    };
    return <Alert show={!!errorMessage} variant="danger">
        <Alert.Heading>Ошибка при запросе на сервер</Alert.Heading>
        <p>
            {errorMessage}
        </p>
        <hr/>
        <div className="d-flex justify-content-end">
            <Button onClick={() => closeHandler()} variant="outline-danger">
                Got it!
            </Button>
        </div>
    </Alert>
}
export default ErrorAlertMessage
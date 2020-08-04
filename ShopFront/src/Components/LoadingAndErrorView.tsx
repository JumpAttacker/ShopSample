import React from "react";
import ErrorAlertMessage from "./ErrorAlertMessage";
import styles from "../Styles/Spinner.module.scss";
import {Spinner} from "react-bootstrap";

export interface ILoadingAndErrorView {
    errorMessage: string | undefined,
    isLoading: boolean,
    onClose: Function,
    children?: any
}

const LoadingAndErrorView: React.FC<ILoadingAndErrorView> = ({isLoading, errorMessage, onClose, children}) => {
    const closeHandler = () => {
        if (onClose)
            onClose();
    };

    return (
        <>
            {isLoading || errorMessage ?
                <>
                    <ErrorAlertMessage errorMessage={errorMessage} onClose={() => closeHandler()}/>
                    {isLoading &&
                    <div className={styles.center}>
                        <Spinner animation="border"/>
                    </div>
                    }
                </> :
                <>
                    {children ? children : <></>}
                </>
            }
        </>)
}
export default LoadingAndErrorView
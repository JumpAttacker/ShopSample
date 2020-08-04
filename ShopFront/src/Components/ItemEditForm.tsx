// Helper styles for demo
import style from "../Styles/ItemEditForm.module.scss";

import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Formik} from "formik";
import * as Yup from "yup";
import {IItem} from "../store/Items/Slice";
import {Button} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import useItems from "../Hook/useItems";

export interface IValidateComponentProp {
    name: string,
    type: 'text' | 'number',
    errors: any,
    touched: any,
    readOnly?: boolean
}

export interface IProps {
    item: IItem | undefined,
    onUpdate: Function,
    onCreate: Function,
}

const ValidatedComponent: React.FC<IValidateComponentProp> = ({name, type, errors, touched, readOnly = false}) => {
    return (
        <>
            <label className={style.label} htmlFor={name} style={{display: "block"}}>{name}</label>
            <Field type={type} name={name}
                   className={
                       errors[name] && touched[name]
                           ? `${style.input} ${style.error}`
                           : style.input
                   }
                   disabled={readOnly}
            />
            <ErrorMessage className={style.feedback} name={name} component="div"/>
        </>
    )
};

const ItemEditForm: React.FC<IProps> = ({item, onUpdate, onCreate}) => {
    const [itemModel, setItemModel] = useState({id: 0, price: 0, description: '', name: ''} as IItem);

    const {goBack} = useHistory();

    useEffect(() => {
        if (item) {
            setItemModel(item);
        }
    }, [item])

    return (
        <div className={style.container}>
            <h1>
                {item ? 'Редактирование предмета' : 'Добавление нового предмета'}
            </h1>

            <Formik
                initialValues={item || itemModel}
                onSubmit={async values => {
                    if (item) {
                        onUpdate(values);
                    } else {
                        onCreate(values)
                    }
                }}
                validationSchema={Yup.object().shape({
                    price: Yup.number().positive().required("Required"),
                    name: Yup.string().required().max(20).min(2),
                    description: Yup.string().required().max(200)
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                        setFieldValue
                    } = props;
                    return (
                        <form onSubmit={handleSubmit} className={style.form}>
                            <ValidatedComponent name={'id'} errors={errors} touched={touched} type={'number'}
                                                readOnly={true}/>
                            <ValidatedComponent name={'name'} errors={errors} touched={touched} type={'text'}/>
                            <ValidatedComponent name={'description'} errors={errors} touched={touched} type={'text'}/>
                            <ValidatedComponent name={'price'} errors={errors} touched={touched} type={'number'}/>

                            <div className={style.buttonContainer}>
                                <Button
                                    type="button"
                                    className="outline"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    Сбросить
                                </Button>

                                <Button type="submit" disabled={isSubmitting}>
                                    {item ? 'Сохранить изменения' : 'Создать'}
                                </Button>

                                <Button className="float-right" variant={"outline-danger"} onClick={() => goBack()}>
                                    Назад
                                </Button>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    )
};
export default ItemEditForm
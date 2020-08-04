import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import {IItem, setItems, deleteItemById} from '../store/Items/Slice';
import useItems from "../Hook/useItems";
import LoadingAndErrorView from "../Components/LoadingAndErrorView";

const ItemsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {GetItems, DeleteItem} = useItems();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(undefined as string | undefined)
    const items: IItem[] = useSelector((state: any) => state.items);
    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            setError(undefined)
            try {
                const fetchData = await GetItems()
                dispatch(setItems(fetchData))
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }

        }
        loadData()
    }, [])

    const editClick = (index: number | undefined = undefined) => {
        if (index !== undefined && index >= 0) {
            history.push("Items/" + items[index].id);
        } else {
            history.push("Items/" + 0);
        }
    };

    const deleteClick = async (index: number) => {
        setLoading(true)
        setError(undefined)
        try {
            await DeleteItem(items[index].id);
            await dispatch(deleteItemById(index));
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    };

    return <>
        <LoadingAndErrorView errorMessage={error} isLoading={loading} onClose={() => setError(undefined)}>
            <div className="d-flex flex-wrap ml-3 mt-3">
                <Card border="info" className='mb-4 mr-4' style={{width: '18em'}}>
                    <Card.Body>
                        <Card.Title>{`Добавить новый товар`}</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success" size="sm" onClick={event => editClick()}>
                            Добавить
                        </Button>
                    </Card.Footer>
                </Card>
                {!loading && !items ? <div>no data</div> : items.map((value, index) =>
                    <Card key={index} border="info" className='mb-4 mr-4' style={{width: '18em'}}>
                        <Card.Body>
                            <Card.Title>{`${value.name} [${value.price}]`}</Card.Title>
                            <Card.Text>
                                {value.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="info" size="sm" onClick={event => editClick(index)}>
                                Edit
                            </Button>
                            <Button variant="danger" size="sm" className="float-right"
                                    onClick={() => deleteClick(index)}>
                                Del
                            </Button>
                        </Card.Footer>
                    </Card>
                )}
            </div>
        </LoadingAndErrorView>
    </>
}

export default ItemsPage;
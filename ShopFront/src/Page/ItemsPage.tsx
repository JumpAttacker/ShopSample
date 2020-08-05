import React, {useEffect, useState} from 'react';
import {Card, Pagination} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import {deleteItemById, IItem, setItems} from '../store/Items/Slice';
import useItems from "../Hook/useItems";
import LoadingAndErrorView from "../Components/LoadingAndErrorView";
import styles from "../Styles/itemsPage.module.scss";
import Paginator from "../Components/Paginator";

export interface IPagination {
    page: number,
    pageSize: number,
    total: number
}

const ItemsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {GetItemsWithPagination, DeleteItem} = useItems();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(undefined as string | undefined)
    const items: IItem[] = useSelector((state: any) => state.items);
    const pageSizes = [5, 10, 15, 20, 25, 30]
    const [paginationData, setPaginationData] = useState({page: 1, pageSize: 10, total: 0} as IPagination)

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            setError(undefined)
            try {
                const fetchData = await GetItemsWithPagination(paginationData)
                console.log('fetchData', fetchData)
                dispatch(setItems(fetchData.data))
                setPaginationData({total: fetchData.total, page: fetchData.page, pageSize: fetchData.pageSize})
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [paginationData.page, paginationData.pageSize])

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

    const handlePageSelected = (page: number) => {
        setPaginationData(prevState => {
            return {...prevState, page}
        })
    }
    const handleRowsOnPageSelected = (pageSize: number) => {
        setPaginationData(prevState => {
            return {...prevState, pageSize}
        })
    }

    return <>
        <LoadingAndErrorView errorMessage={error} isLoading={loading} onClose={() => setError(undefined)}>
            <div className={styles.myFlex}>
                <Paginator
                    disabled={loading}
                    pages={Math.trunc((paginationData.total - 1) / (paginationData.pageSize)) + 1}
                    active={paginationData.page}
                    onChange={(page: number) => handlePageSelected(page)}/>
                <Pagination className='ml-2'>
                    {
                        pageSizes.map((i: number, k: number) => {
                            return <Pagination.Item disabled={loading} key={k}
                                                    onClick={() => handleRowsOnPageSelected(i)}
                                                    active={paginationData.pageSize == i}>{i}</Pagination.Item>
                        })
                    }
                </Pagination>
            </div>
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
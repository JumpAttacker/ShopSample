import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import {IItem} from '../store/Items/Slice';
import useItems from "../Hook/useItems";
import LoadingAndErrorView from "../Components/LoadingAndErrorView";
import ItemEditForm from "../Components/ItemEditForm";

enum SubmitType { Update, Create}

const ItemPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {GetItemById, UpdateItem, CreateItem} = useItems();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined as string | undefined)

    let {id} = useParams();

    const [editItem, setEditItem] = useState(undefined as IItem | undefined)

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            setError(undefined)
            try {
                const itemData = await GetItemById(id)
                setEditItem(itemData)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        if (id > 0)
            loadData()
    }, [])

    const onSubmitHandler = async (values: any, type: SubmitType) => {
        try {
            setLoading(true);
            if (type === SubmitType.Create) {
                await CreateItem(values);
            } else if (type === SubmitType.Update) {
                await UpdateItem(values);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
            history.push("/items");
        }
    }

    return (
        <LoadingAndErrorView errorMessage={error} isLoading={loading} onClose={() => setError(undefined)}>
            <ItemEditForm item={editItem} onCreate={(values: any) => onSubmitHandler(values, SubmitType.Create)}
                          onUpdate={(values: any) => onSubmitHandler(values, SubmitType.Update)}/>
        </LoadingAndErrorView>
    )
}

export default ItemPage;
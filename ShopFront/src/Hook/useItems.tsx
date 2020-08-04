import useRequest from "./useRequest";
import {IItem} from "../store/Items/Slice";

const endpointUrl = 'http://localhost:5003/Shop'

const useItems = () => {
    const {fetchData} = useRequest();

    const GetItems = async () => {
        return await fetchData(endpointUrl);
    }

    const GetItemById = async (id: number) => {
        return await fetchData(endpointUrl + '/' + id);
    }

    const UpdateItem = async (item: IItem) => {
        return await fetchData(endpointUrl, 'put', JSON.stringify(item));
    }

    const CreateItem = async (item: IItem) => {
        return await fetchData(endpointUrl, 'post', JSON.stringify(item));
    }

    const DeleteItem = async (id: number) => {
        return await fetchData(endpointUrl + '/' + id, 'delete');
    }

    return {
        GetItems,
        GetItemById,
        UpdateItem,
        CreateItem,
        DeleteItem,
    }
}

export default useItems;
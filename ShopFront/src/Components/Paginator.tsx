import {Pagination} from "react-bootstrap";
import React from "react";

export interface IPaginatorProps {
    pages: number,
    active: number,
    onChange: Function,
    disabled: boolean
}

const Paginator: React.FC<IPaginatorProps> = ({pages, active, onChange, disabled}) => {
    const renderItems = () => {
        const arr = [];
        for (let index = active - 2; index <= active + 2; index++) {
            if (index > 0 && index <= pages) {
                arr.push(
                    <Pagination.Item
                        disabled={disabled}
                        key={index}
                        onClick={() => onChange(index)}
                        active={active === index}>
                        {index}
                    </Pagination.Item>
                );
            }
        }
        return arr;
    }

    return (
        <Pagination>
            <Pagination.First disabled={disabled} onClick={() => onChange(1)}/>
            {renderItems()}
            <Pagination.Last disabled={disabled} onClick={() => onChange(pages)}/>
        </Pagination>
    )
}

export default Paginator
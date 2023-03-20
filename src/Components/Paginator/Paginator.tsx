import React from 'react';
// @ts-ignore
import classes from "./Paginator.module.css"
import {countPages} from "../../common/functions";

interface IProps {
    totalCount: number
    currentPage: number
    pageSize: number
    setCurrentPage?: any
}

const Paginator = (props: IProps) => {
    const pages = countPages(props.totalCount, props.pageSize)
    function onPageChanged(p: number) {
        props.setCurrentPage(p)
    }
    return <div>
        {pages.map(p => <span className={classes.page} onClick={() => onPageChanged(p)}>{p}</span>)}
    </div>
};

export default Paginator;
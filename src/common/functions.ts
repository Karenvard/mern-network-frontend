import {MenuProps} from "antd";
import React from "react";

type MenuItem = Required<MenuProps>['items'][number];

export function getRouterItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export function countPages(totalCount: number, pageSize: number) {
    const pagesCount = Math.ceil(totalCount / pageSize)
    let pages: number[] = [];
    for (let i = 1; i < pagesCount; i++) {
       if (!(i > 20)) {
           pages.push(i)
       }
    }
    return pages;
}
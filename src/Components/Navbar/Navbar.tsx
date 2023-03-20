import React from 'react';
// @ts-ignore
import classes from "./Navbar.module.css"
import {ContainerOutlined, DesktopOutlined, PieChartOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {getRouterItem} from "../../common/functions";
import {NavLink} from "react-router-dom";


const routerItems = [
        getRouterItem(<NavLink to={"/profile"}>Profile</NavLink>, '1', <PieChartOutlined />),
        getRouterItem(<NavLink to={"/dialogs"}>Dialogs</NavLink>, '2', <DesktopOutlined />),
        getRouterItem(<NavLink to={"/users"}>Users</NavLink>, '3', <ContainerOutlined />),
];

const Navbar = () => {
        return <div className={classes.container}>
                <Menu
                    className={classes.container}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    items={routerItems}/>
        </div>
};

export default Navbar;
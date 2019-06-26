import {Redirect, Route} from "react-router-dom";
import React from "react";

const AdminRoute = ({component: Component, path, isAdmin, ...rest}) => (
    <Route path={path} render={(props) => (
        isAdmin ? (
            <Component {...props} {...rest} />
        ) : (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
        )
    )
    }/>
);

export default AdminRoute



import {Redirect, Route} from "react-router-dom";
import React from "react";

const UserRoute = ({component: Component, path, isAuth, ...rest}) => (
    <Route path={path} render={(props) => (
        isAuth ? (
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

export default UserRoute

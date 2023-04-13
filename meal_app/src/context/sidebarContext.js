// import useContext to handle global state and useReducer for handling the actions
import React, { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/sidebarReducer";

// actions
import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR
} from "../actions/actions";

// initialState
const initialState = {
    iSidebarOpen : false
}

//creating the context
const SidebarContext = createContext({});

// handling the current state using disptach method
export const SidebarProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // using the current open state by disptach method
    const openSidebar = () => {
        dispatch({type: OPEN_SIDEBAR});
    }

    // using the current close state by disptach method
    const closeSidebar = () => {
        dispatch({type: CLOSE_SIDEBAR});
    }

    return(
        // context provider
        <SidebarContext.Provider value = {{
            ...state,
            openSidebar,
            closeSidebar
        }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebarContext = () => {
    return useContext(SidebarContext);
}   
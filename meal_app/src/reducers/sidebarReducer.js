
// importing the open and close actions from actions.js
// import { useContext } from "react";
import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR
} from "../actions/actions";

// defining the open and close action in function sidebarReducer
const sidebarReducer = (state, action) => {

    // switching on action type whether it is open or close
    switch(action.type){

        // open action type
        case OPEN_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: true
            }

        // close action type  
        case CLOSE_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: false
            }
            // if no action is done then return the state
            default:
                return state;
    }
}
// exporting the function
export default sidebarReducer;
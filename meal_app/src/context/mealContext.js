import React, {createContext, useContext, useReducer, useEffect } from 'react';
// importing mealreducer
import { mealReducer } from '../reducers/mealReducer';
import { startFetchCategories } from '../actions/mealsActions';


//creating an obj for initail states
const initialState = {
    categories: [],
    categoryLoading: false,
    categoryError: false,
    categoryMeals: [],
    categoryMealsLoading: false,
    categoryMealsError: false,
    meals: [],
    mealsLoading: false,
    mealsError: false,
    meal: [],
    mealLoading: false,
    mealError: false
}

// creating the context
const MealContext = createContext({});
export const MealProvider = ({children}) => {
    const [state, dispatch] = useReducer(mealReducer, initialState);

    useEffect(()=>{
        startFetchCategories(dispatch);
    }, []);

    return (
        <MealContext.Provider value={{
            ...state,
            dispatch,
            startFetchCategories
        }}>
            {children}
        </MealContext.Provider>
    )
}

// exporting the context
export const useMealContext = () => {
    return useContext(MealContext);
}
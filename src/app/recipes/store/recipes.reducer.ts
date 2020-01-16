import * as RecipeActions from './recipes.actions';

import { Recipe } from '../recipe.model';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes : []
};

export function recipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index], // this copies the original recipe data and then and then spread the data into a new object
        ...action.payload.newRecipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipes, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
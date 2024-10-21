import { TOOGLE_THEME } from "../action/ThemeAction";


const nilaiDefault = {
  theme: "dark",
};

const themeReducer = (state = nilaiDefault, action) => {
  switch (action.type) {
    case TOOGLE_THEME:
        return{
            ...state,
            theme : state.theme === "dark" ? "light" : "dark", 
        };
        default :
        return state ;
  };
};

export default themeReducer;
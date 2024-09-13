
import { LOGIN_DATA,LOGOUT_DATA, HOME_DATA, UNLIKE_POST, LIKE_POST ,} from "./constant";
const initialState = {
    homeData: [],
    logIndata: [],
    likeData: [],
    unlikeData: [],
    isAuthenticated: JSON.parse(localStorage.getItem('auth'))?.isAuthenticated || false,
}


export default function applicationReducer(state = initialState, action) {

    switch (action.type) {
        case LOGIN_DATA:
            return {
                ...state,
                logIndata: action.payload.data,
                isAuthenticated: true
            }
        case LOGOUT_DATA:
            return {
                ...state,
                logIndata: [],
                isAuthenticated: false
            }

        case HOME_DATA:
            return {
                ...state,
                homeData: action.payload.data,
            }
        case LIKE_POST:
            return {
                ...state,
                likeData: action.payload.data,
            }
        case UNLIKE_POST:
            return {
                ...state,
                unlikeData: action.payload.data,
            }

        default:
            return {
                ...state
            }
    }

}
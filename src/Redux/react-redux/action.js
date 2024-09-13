
import { LOGIN_DATA,LOGOUT_DATA, HOME_DATA, UNLIKE_POST, LIKE_POST } from "./constant";

const storeLogData = (apires) => (dispatch) => {
    dispatch({
        type: LOGIN_DATA,
        payload: { data: apires }
    })

}
export {storeLogData}

const storeLogoutData = (apires) => (dispatch) => {
    dispatch({
        type: LOGOUT_DATA,
        payload: { data: apires }
    })

}
export {storeLogoutData}

const storeHomeData = (apires) => (dispatch) => {

    dispatch({
        type: HOME_DATA,
        payload: { data: apires }
    })

}
export {storeHomeData}



const storeLikeData= (apires) => (dispatch) => {
    dispatch({
        type: LIKE_POST,
        payload: { data: apires }
    })

}
export {storeLikeData}


const storeUnLikeData= (apires) => (dispatch) => {
    dispatch({
        type: UNLIKE_POST,
        payload: { data: apires }
    })

}
export {storeUnLikeData}
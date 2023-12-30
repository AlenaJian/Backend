import axios from "axios";
import {
  LoadUserRequest,
  LoadUserSuccess,

  LoadUserFail,
} from "../reducers/userReducer";
// import { LoadShopRequest,LoadShopSuccess,LoadShopFail} from "../reducers/shopReducer";



export const userAction = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
     const { data } = await axios.get("http://localhost:8000/api/u2/user/get-user", 
    {
      withCredentials: true,
    }
    );
    
    dispatch(LoadUserSuccess(data));
  } 
  
  catch (err) {
    dispatch(
      LoadUserFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};


// export const shopAction = () => async (dispatch) => {
//   try {
//     dispatch(LoadShopRequest());
//      const { data } = await axios.get("http://localhost:8000/api/v2/user/get-shop", 
//     {
//       withCredentials: true,
//     }
//     );
    
//     dispatch(LoadShopSuccess(data));
//   } 
  
//   catch (err) {
//     dispatch(
//       LoadShopFail(
//         err.response && err.response.data.message
//           ? err.response.data.message
//           : err.message
//       )
//     );
//   }
// };

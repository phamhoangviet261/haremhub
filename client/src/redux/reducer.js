const { PlaylistAddOutlined } = require("@mui/icons-material");

const initState = {
    user: {
        username: '',
        email: '',
        urlAvatar: ''
    },
    wishlist: []
}

/*action: {
    type: '...',
    payload: data add to state
}*/

const rootReducer = (state = initState, action) => {
    console.log("Redux: ", {state, action})
    switch (action.type) {
        case 'changeUsername':
            return {
                ...state, 
                user: {
                    ...state.user,
                    username: action.payload
                }
            }
    
        default:
            return {
                ...state
            };
    }
}

export default rootReducer;
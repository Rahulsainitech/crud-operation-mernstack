const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'userId':
            return {
                ...state, userId: { value: payload }
            }
        case 'id':
            return {
                ...state, id: { value: payload }
            }
        case 'title':
            return {
                ...state, title: { value: payload }
            }
        case 'body':
            return {
                ...state, body: { value: payload }
            }
       

        default:
            break;
    }
}


export default reducer
// exports.reducer =reducer
// exports.initialState =initialState;
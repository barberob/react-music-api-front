const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'set_display': {
            return { ...state, shouldDisplay: action.value }
        }

        case 'set_all': {
            return {
                shouldDisplay: true,
                error: action.error,
                message: action.message
            }
        }

        default:
            return { ...state }
    }
}

export default tasksReducer

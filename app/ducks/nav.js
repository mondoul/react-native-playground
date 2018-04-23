import Root from '../navigation/rootNavigation';

const BACK = 'Navigation/BACK';
const NAVIGATE = 'Navigation/NAVIGATE';
const RESET = 'Navigation/RESET';

export default nav = (state, action) => {
    if (action.type.indexOf('Navigation') >= 0){
        switch(action.routeName) {
            case 'Orientation':
                action.params = { category: 'orientation', large: true };
                break;
            case 'Exercises':
                action.params = { category: 'exercises', large: false };
                break;
            case 'Sequences':
                action.params = { category: 'sequences', large: false };
                break;
            default:
                break;
        }
    }

    const newState = Root.router.getStateForAction(action, state);
    return newState ? newState : state;
};

export const navigateBack = () => {
    return {
        type: BACK
    }
};

export const navigateToVideoPlayer = (params) => {
    return navigateToRoute('VideoPlayer', params);
};

const navigateToRoute = (routeName, params = {}) =>  {
    return {
        type: NAVIGATE,
        routeName,
        params
    }
};

// Selectors
export const getNavigationParams = (state) => {
    console.log('Nav params', state.navigation.state.params);
    return state.navigation.state.params;
};

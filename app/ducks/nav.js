import Root from '../navigation/rootNavigation';

const BACK = 'Navigation/BACK';
const NAVIGATE = 'Navigation/NAVIGATE';
const RESET = 'Navigation/RESET';

export default nav = (state, action) => {
    const newState = Root.router.getStateForAction(action, state);
    return (newState ? newState : state)
};

export const navigateBack = () => {
    return {
        type: BACK
    }
};

export const navigateToRoute = (routeName, params = {}) =>  {
    return {
        type: NAVIGATE,
        routeName,
        params
    }
};

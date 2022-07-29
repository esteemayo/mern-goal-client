import http from './httpService';

const apiEndpoint = '/goals';

const goalUrl = (goalId) => `${apiEndpoint}/${goalId}`;

export const getGoals = () => http.get(apiEndpoint);

export const createGoal = (goalData) => http.post(apiEndpoint, goalData);

export const deleteGoal = (goalId) => http.delete(goalUrl(goalId));

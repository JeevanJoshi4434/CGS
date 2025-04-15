export const getSessionKey = (testId) => `test-${testId}`;

export const initializeStorage = (testId) => {
    const key = getSessionKey(testId);
    if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, JSON.stringify({}));
    }
};

export const updateAnswer = (testId, page, questionId, answer) => {
    const key = getSessionKey(testId);
    const currentData = JSON.parse(sessionStorage.getItem(key)) || {};
    const pageMap = currentData[page] || {};
    pageMap[questionId] = answer;
    currentData[page] = pageMap;
    sessionStorage.setItem(key, JSON.stringify(currentData));
};

export const getAllAnswers = (testId) => {
    const key = getSessionKey(testId);
    return JSON.parse(sessionStorage.getItem(key)) || {};
};

export const resetAnswers = (testId) => {
    sessionStorage.removeItem(getSessionKey(testId));
};

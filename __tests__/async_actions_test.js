// ./**tests**/async_actions_test.js
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import fetch from 'isomorphic-fetch'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

// We would import these from actions in real case testing.
const success = (todos) => ({
    type: 'FETCH_TODO_SUCCESS',
    todos
});

// Async action creator to fetch to-dos from an API
const fetchTodos = () => (dispatch) => {
    return fetch('https://localhost:8000/api/todos')
        .then(response => {
            return response.json()
        })
        .then(json => {
            dispatch(success(json));
        })
}

describe('async actions', () => {
    let store;
    let fetchTodosData = [
        {
            "id":1,
            "title":"Example",
            "project":"Testing",
            "createdAt":"2017-03-02T23:04:38.003Z",
            "modifiedAt":"2017-03-22T16:44:29.034Z"
        }
    ];
    beforeEach(() => {
        store = mockStore({});
    });
    afterEach(() => {
        // clear all HTTP mocks after each test
        nock.cleanAll();
    });

    it('creates FETCH_TODO_SUCCESS when fetching to-dos has been done', () => {
        // Simulate a successful response
        nock('https://localhost:8000')
            .get('/api/todos') // Route to catch and mock
            .reply(200, fetchTodosData); // Mock reponse code and data

        // Dispatch action to fetch to-dos
        return store.dispatch(fetchTodos())
            .then(() => { // return of async actions
                expect(store.getActions()).toMatchSnapshot();
            })
    })
});

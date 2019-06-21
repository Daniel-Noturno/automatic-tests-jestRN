import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import api from '../../src/services/api';
import rootSaga from '../../src/store/sagas';
import * as actions from '../../src/store/userActions';

const userGithubFixture = require("./fixtures/userGithub.json");

describe('Testing User Github SAGA', () => {
    let sagaTester = null;
    let apiMock = null;

    beforeEach(() => {
        sagaTester = new SagaTester({});
        apiMock = new MockAdapter(api.axiosInstance);
  
        sagaTester.start(rootSaga);
    });
  
    it("can add user", async () => {
        apiMock.onGet("/users/Daniel-Noturno").reply(200, userGithubFixture["/users/Daniel-Noturno"]);
  
        sagaTester.dispatch(actions.addUserRequest("Daniel-Noturno"));
  
        await sagaTester.waitFor(actions.addUserSuccess().type);
  
        expect(sagaTester.getLatestCalledAction())
            .toEqual(actions.addUserSuccess(userGithubFixture["/users/Daniel-Noturno"]));
    });
});

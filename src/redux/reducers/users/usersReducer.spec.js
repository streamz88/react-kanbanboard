import { actions } from "../../constants";

import { kanbanProjectReducers as reducers } from "../";

describe("usersReducer", () => {
  describe("addTeamMember", () => {
    it("should add a team meber to the User model", () => {
      let state;
      state = reducers(
        {
          stages: [
            { order: 1, name: "Todo", tasks: [] },
            { order: 2, name: "Doing", tasks: [] },
            { order: 3, name: "Done", tasks: [] }
          ],
          team: {
            name: "Chater Match Eagles",
            users: [
              { id: 1, firstname: "Oliver", lastname: "Winks", tasks: [] }
            ]
          },
          form: {
            AddTeamMember: {
              registeredFields: {
                firstname: { name: "firstname", type: "Field", count: 1 },
                lastname: { name: "lastname", type: "Field", count: 1 }
              },
              fields: {
                firstname: { visited: true, touched: true },
                lastname: { visited: true, touched: true }
              },
              values: { firstname: "Victor", lastname: "Jegede" },
              anyTouched: true
            }
          }
        },
        {
          type: actions.addTeamMember,
          payload: { firstname: "Victor", lastname: "Jegede" }
        }
      );
      expect(state).toEqual({
        stages: [
          { order: 1, name: "Todo", tasks: [] },
          { order: 2, name: "Doing", tasks: [] },
          { order: 3, name: "Done", tasks: [] }
        ],
        team: {
          name: "Chater Match Eagles",
          users: [
            { id: 1, firstname: "Oliver", lastname: "Winks", tasks: [] },
            { id: 2, firstname: "Victor", lastname: "Jegede", tasks: [] }
          ]
        },
        form: {
          AddTeamMember: {
            registeredFields: {
              firstname: { name: "firstname", type: "Field", count: 1 },
              lastname: { name: "lastname", type: "Field", count: 1 }
            },
            fields: {
              firstname: { visited: true, touched: true },
              lastname: { visited: true, touched: true }
            },
            values: { firstname: "Victor", lastname: "Jegede" },
            anyTouched: true
          }
        }
      });
    });
  });
});

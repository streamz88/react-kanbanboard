import { actions } from "../../constants";

import { kanbanProjectReducers as reducers } from "../";

describe("stagesReducer", () => {
  describe("addStage", () => {
    test("it should add a new stage with a given name and id to Stage model ", () => {
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
            AddStage: {
              registeredFields: {
                name: { name: "name", type: "Field", count: 1 }
              },
              fields: { name: { visited: true, touched: true } },
              values: { name: "New Stage" },
              anyTouched: true
            }
          }
        },
        { type: actions.addStage, payload: { name: "New Stage" } }
      );
      expect(state).toEqual({
        stages: [
          { order: 1, name: "Todo", tasks: [] },
          { order: 2, name: "Doing", tasks: [] },
          { order: 3, name: "Done", tasks: [] },
          { order: 4, name: "New Stage", tasks: [] }
        ],
        team: {
          name: "Chater Match Eagles",
          users: [{ id: 1, firstname: "Oliver", lastname: "Winks", tasks: [] }]
        },
        form: {
          AddStage: {
            registeredFields: {
              name: { name: "name", type: "Field", count: 1 }
            },
            fields: { name: { visited: true, touched: true } },
            values: { name: "New Stage" },
            anyTouched: true
          }
        }
      });
    });
  });

  describe("removeStage", () => {
    test("should remove a stage with a given id", () => {
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
          form: { RemoveStage: { anyTouched: true } }
        },
        { type: actions.removeStage, payload: { order: 1 } }
      );
      expect(state).toEqual({
        stages: [
          { order: 2, name: "Doing", tasks: [] },
          { order: 3, name: "Done", tasks: [] }
        ],
        team: {
          name: "Chater Match Eagles",
          users: [{ id: 1, firstname: "Oliver", lastname: "Winks", tasks: [] }]
        },
        form: { RemoveStage: { anyTouched: true } }
      });
    });
  });

  describe("renameStage", () => {
    test("should rename a stage with a give value", () => {
      let state;
      state = reducers(
        {
          stages: [
            { order: 1, name: "Backlog", tasks: [] },
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
            RenameStage: {
              registeredFields: {
                name: { name: "name", type: "Field", count: 1 }
              },
              fields: { name: { visited: true, touched: true } },
              values: { name: "Backlog" },
              anyTouched: true
            }
          }
        },
        { type: actions.renameStage, payload: { name: "Backlog", order: 1 } }
      );
      expect(state).toEqual({
        stages: [
          { order: 1, name: "Backlog", tasks: [] },
          { order: 2, name: "Doing", tasks: [] },
          { order: 3, name: "Done", tasks: [] }
        ],
        team: {
          name: "Chater Match Eagles",
          users: [{ id: 1, firstname: "Oliver", lastname: "Winks", tasks: [] }]
        },
        form: {
          RenameStage: {
            registeredFields: {
              name: { name: "name", type: "Field", count: 1 }
            },
            fields: { name: { visited: true, touched: true } },
            values: { name: "Backlog" },
            anyTouched: true
          }
        }
      });
    });
  });

  describe("addTask", () => {
    it("", () => {
      let state;
      state = reducers(
        {
          stages: [
            {
              order: 1,
              name: "Todo",
              tasks: [
                null,
                { id: 1, title: "Some Task", description: "New Description" }
              ]
            },
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
            AddTask: {
              registeredFields: {
                id: { name: "id", type: "Field", count: 1 },
                title: { name: "title", type: "Field", count: 1 },
                description: { name: "description", type: "Field", count: 1 }
              },
              fields: {
                title: { visited: true, touched: true },
                description: { visited: true, touched: true },
                id: { touched: true }
              },
              values: { title: "Some Task", description: "New Description" },
              anyTouched: true
            }
          }
        },
        {
          type: "",
          payload: {
            title: "Some Task",
            description: "New Description",
            stageId: 1
          }
        }
      );
      expect(state).toEqual({
        stages: [
          {
            order: 1,
            name: "Todo",
            tasks: [
              null,
              { id: 1, title: "Some Task", description: "New Description" }
            ]
          },
          { order: 2, name: "Doing", tasks: [] },
          { order: 3, name: "Done", tasks: [] }
        ],
        team: {
          name: "Chater Match Eagles",
          users: [{ id: 1, firstname: "Oliver", lastname: "Winks", tasks: [] }]
        },
        form: {
          AddTask: {
            registeredFields: {
              id: { name: "id", type: "Field", count: 1 },
              title: { name: "title", type: "Field", count: 1 },
              description: { name: "description", type: "Field", count: 1 }
            },
            fields: {
              title: { visited: true, touched: true },
              description: { visited: true, touched: true },
              id: { touched: true }
            },
            values: { title: "Some Task", description: "New Description" },
            anyTouched: true
          }
        }
      });
    });
  });

  describe("removeTask", () => {
    it("should remove a task form a given Stage and the Task model", () => {
      let state;
      state = reducers(
        {
          stages: [
            { order: 1, name: "Todo", tasks: [] },
            {
              order: 2,
              name: "Doing",
              tasks: [{ id: "Hk9Pd3OZ7", title: "sdf", description: "sdfsf" }]
            },
            { order: 3, name: "Done", tasks: [] }
          ],
          team: {
            name: "Chater Match Eagles",
            users: [
              { id: 1, firstname: "Oliver", lastname: "Winks", tasks: [] }
            ]
          },
          form: {}
        },
        { type: "REMOVE_TASK", payload: { taskId: "Hk9Pd3OZ7", stageId: 2 } }
      );
      expect(state).toEqual({
        stages: [
          { order: 1, name: "Todo", tasks: [] },
          { order: 2, name: "Doing", tasks: [undefined] },
          { order: 3, name: "Done", tasks: [] }
        ],
        team: {
          name: "Chater Match Eagles",
          users: [{ id: 1, firstname: "Oliver", lastname: "Winks", tasks: [] }]
        },
        form: {}
      });
    });
  });
});

describe("moveTask", () => {
  it("should move a task to target stage", () => {
    let state;
    state = reducers(
      {
        stages: [
          {
            order: 1,
            name: "Todo",
            tasks: [
              null,
              { id: "r1u8c2_-Q", title: "New Task", description: "Description" }
            ]
          },
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
        form: {}
      },
      {
        type: "MOVE_TASK",
        payload: {
          source: { stageId: "1", taskId: "r1u8c2_-Q" },
          destination: { stageId: "2" }
        }
      }
    );
    expect(state).toEqual({
      stages: [
        { order: 1, name: "Todo", tasks: [null, undefined] },
        {
          order: 2,
          name: "Doing",
          tasks: [
            { id: "r1u8c2_-Q", title: "New Task", description: "Description" }
          ]
        },
        { order: 3, name: "Done", tasks: [] }
      ],
      team: {
        name: "Chater Match Eagles",
        users: [
          { id: 1, firstname: "Oliver", lastname: "Winks", tasks: [] },
          { id: 2, firstname: "Victor", lastname: "Jegede", tasks: [] }
        ]
      },
      form: {}
    });
  });
});

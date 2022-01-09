export const todoSerializerOptions = {
  links: (data: any) => ({
    self: `/todos/${data.id}`,
  }),
  topLevelLinks: {
    self: '/todos',
  },
  blacklist: ['updatedAt'],
  relationships: {
    subtasks: {
      type: 'subtasks',
      links: (data: any) => ({
        self: `/todos/${data.id}/subtasks`,
        related: `/todos/${data.id}/subtasks`,
      }),
    },
  } as any,
};

export const subtaskSerializerOptions = {
  links: (data: any) => ({
    self: `/subtask/${data.id}`,
  }),
  topLevelLinks: {
    self: '/subtask',
  },
  blacklist: ['updatedAt'],
};

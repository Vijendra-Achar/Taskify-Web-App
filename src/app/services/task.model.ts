import { user } from './user-data.model';

export interface task {
  data: {
    tasks: [
      {
        completed: boolean;
        assignedTo: user;
        createdBy: user;
        deadline: Date;
        percentageOfCompletion: number;
        description: string;
        _id: string;
        title: string;
      }
    ];
  };
  results: number;
  status: string;
}

export interface taskNotes {
  data: {
    taskNotes: [
      {
        _id: string;
        heading: string;
        notes: string;
        taskId: object;
      }
    ];
  };
}

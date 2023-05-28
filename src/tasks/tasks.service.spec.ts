import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOneBy: jest.fn(),
});

const mockUser = {
  username: 'vikash',
  id: 'someid',
  password: 'sadasdasd',
  tasks: [],
};

describe('TaskService', () => {
  let taskService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    // init NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    taskService = module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls TaskRepository.getTasks and returns the result', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');
      const result = await taskService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and return the result', async () => {
      const mockTasks = {
        title: 'test title',
        description: 'test description',
        id: 'dsadads',
        status: TaskStatus.OPEN,
      };

      taskRepository.findOneBy.mockResolvedValue(mockTasks);
      const result = await taskService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTasks);
    });

    it('calls TasksRepository.findOne and handles error', async () => {
      taskRepository.findOneBy.mockResolvedValue(null);
      expect(taskService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

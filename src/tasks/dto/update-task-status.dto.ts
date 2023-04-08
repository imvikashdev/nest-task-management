import { TaskStatus } from '../task.model';
import { IsEnum } from 'class-validator';

export class updateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

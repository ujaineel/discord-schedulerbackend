export interface CreateTaskDto {
  title: string;
  content?: string;
  published?: boolean;
  dueDate?: Date;
  userId: string;
}

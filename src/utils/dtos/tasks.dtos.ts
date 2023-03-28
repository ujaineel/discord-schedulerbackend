export interface CreateTaskDto {
  title: string;
  content?: string;
  published?: boolean;
  userId: string;
}

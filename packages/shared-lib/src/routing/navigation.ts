import { createEvent } from 'effector';

export const navigateTo = createEvent<{
  path: string;
  params?: Record<string, string>;
}>();

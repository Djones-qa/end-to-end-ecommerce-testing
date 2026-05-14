export interface User {
  username: string;
  password: string;
  description: string;
}

export const users: Record<string, User> = {
  standard: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.TEST_PASSWORD || 'secret_sauce',
    description: 'Standard user with full access',
  },
  locked: {
    username: process.env.LOCKED_USER || 'locked_out_user',
    password: process.env.TEST_PASSWORD || 'secret_sauce',
    description: 'Locked out user — should be denied login',
  },
  problem: {
    username: process.env.PROBLEM_USER || 'problem_user',
    password: process.env.TEST_PASSWORD || 'secret_sauce',
    description: 'Problem user — images may be broken',
  },
};

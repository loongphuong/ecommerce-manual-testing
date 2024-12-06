import * as bcrypt from 'bcrypt';

export const comparePassword = (password: string, hash: string): boolean => {
  if (bcrypt.compareSync(password, hash)) {
    return true;
  } else {
    return false;
  }
};

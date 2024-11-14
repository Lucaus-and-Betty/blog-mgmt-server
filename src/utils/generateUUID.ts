import { v4 as uuidv4 } from 'uuid';

/**
 * @description 生成UUID
 * @returns 生成的UUID
 */
export const generateUUID = () => {
  return uuidv4();
};

export default generateUUID;

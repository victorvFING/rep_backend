import Auditor from '../Models/Auditor';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const audit = (request: any, action: string): void => {
  const userId = request.user_id;
  Auditor.create({ user_id: userId, action });
};

// BD: UUID // USER ID // ACTION // TIME

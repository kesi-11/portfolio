import { cookies } from 'next/headers';

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_auth');
  return token?.value === 'valid';
}

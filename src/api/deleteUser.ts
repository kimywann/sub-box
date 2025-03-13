import { supabase } from '../supabaseClient';
import { adminAuthClient } from '../supabaseAdmin';

export const deleteUser = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const { error } = await adminAuthClient.deleteUser(user.id);

    if (error) throw error;

    // 회원 탈퇴 후 세션 종료
    await supabase.auth.signOut();

    return { success: true, message: '회원 탈퇴가 완료되었습니다.' };
  } catch (error: any) {
    console.error('회원 탈퇴 오류:', error.message);
    return { success: false, error: error.message };
  }
};

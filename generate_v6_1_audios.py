import os
import sys
import asyncio
import edge_tts
from gtts import gTTS

sys.stdout.reconfigure(encoding='utf-8')

AUDIO_DIR = r"C:\Users\Chien\Desktop\ATG\PRJ\KED\audio"
VOICE = "vi-VN-HoaiMyNeural"

# DANH SÁCH TẤT CẢ FILE CẦN SINH CHO V6.1
AUDIO_TASKS = {
    # 1. CÂU HỎI ĐẢO KHO BÁU TG_Q19 -> TG_Q65
    "tg_q19": "Bạn nào không biết bay vậy bé?",
    "tg_q20": "Quả nào có màu vàng ngọt ngào vậy bé?",
    "tg_q21": "Phương tiện nào chạy xình xịch trên đường ray xe lửa vậy bé?",
    "tg_q22": "Đâu là cây bút viết vẽ vào vở của bé?",
    "tg_q23": "Bạn nào kêu meo meo bắt chuột rất tài vậy bé?",
    "tg_q24": "Bạn nào không sống dưới nước vậy bé?",
    "tg_q25": "Bạn vịt có cánh kêu cạp cạp ở đâu vậy bé?",
    "tg_q26": "Quyển sách giúp bé đọc truyện hay ở đâu vậy bé?",
    "tg_q27": "Xe buýt trường học to lớn ở đâu vậy bé?",
    "tg_q28": "Bạn hươu cao cổ có chiếc cổ thật dài ở đâu vậy bé?",
    "tg_q29": "Chiếc ô che mưa che nắng ở đâu vậy bé?",
    "tg_q30": "Bạn gà mái đẻ trứng cho bé ở đâu vậy bé?",
    "tg_q31": "Bông hoa hồng đỏ thắm ở đâu vậy bé?",
    "tg_q32": "Xe cứu hỏa còi hú chữa cháy ở đâu vậy bé?",
    "tg_q33": "Chiếc đồng hồ tích tắc báo giờ ở đâu vậy bé?",
    "tg_q34": "Bạn sư tử chúa sơn lâm dũng mãnh ở đâu vậy bé?",
    "tg_q35": "Quả dưa hấu ruột đỏ ngọt mát ở đâu vậy bé?",
    "tg_q36": "Bé hãy tìm chữ Cờ trong từ con cá nào!",
    "tg_q37": "Bé hãy tìm chữ E trong từ em bé đáng yêu nào!",
    "tg_q38": "Chữ cái nào bắt đầu từ quả táo vậy bé?",
    "tg_q39": "Mờ E nặng ghép thành từ gì thân thương của bé?",
    "tg_q40": "Bờ O huyền ghép thành bạn nào kêu ò e cho sữa ngọt?",
    "tg_q41": "Gờ A huyền ghép thành bạn nào gáy vang buổi sáng?",
    "tg_q42": "Chữ cái nào bắt đầu từ máy bay vậy bé?",
    "tg_q43": "Hát Ô hỏi ghép thành bạn nào dũng cảm chúa sơn lâm?",
    "tg_q44": "Ít xì E ghép thành từ gì chạy bon bon trên phố?",
    "tg_q45": "Đâu là nguyên âm kép trong từ bông hoa thơm ngát?",
    "tg_q46": "Bé tìm chữ Dê trong từ quả dưa hấu nào!",
    "tg_q47": "Dấu nào làm cho chữ A biến thành chữ Á sắc sảo?",
    "tg_q48": "Chữ Ô thêm dấu sắc thành cái gì che đầu khi trời mưa nắng?",
    "tg_q49": "Lờ A sắc ghép thành bộ phận gì xanh tươi của cây?",
    "tg_q50": "Bé tìm từ Cá Vàng ghép bởi hai tiếng nào?",
    "tg_q51": "Bé hãy tìm bạn số 3 cong cong như cánh bướm nào!",
    "tg_q52": "Bé hãy tìm bạn số 4 như chiếc ghế gập xinh xắn nào!",
    "tg_q53": "Bé hãy tìm bạn số 5 với chiếc mũ che đầu thật oai nào!",
    "tg_q54": "Có mấy chú cá nhỏ đang tung tăng bơi lội vậy bé?",
    "tg_q55": "Có mấy bông hoa tươi thắm đang nở vậy bé?",
    "tg_q56": "Hai quả táo thêm một quả táo thì có tất cả mấy quả vậy bé?",
    "tg_q57": "Có ba quả chuối, bé ăn bớt một quả thì còn lại mấy quả chuối?",
    "tg_q58": "Số nào lớn nhất trong các số một, ba và năm vậy bé?",
    "tg_q59": "Số nào bé nhất trong các số hai, bốn và sáu vậy bé?",
    "tg_q60": "Hình nào có ba góc nhọn là hình gì vậy bé?",
    "tg_q61": "Hình tròn lăn lông lốc giống đồ vật nào dưới đây bé ơi?",
    "tg_q62": "Bánh chưng ngày Tết của bé có hình gì vuông vắn?",
    "tg_q63": "Có bốn chú chim, hai chú bay đi mất, còn lại mấy chú chim vậy bé?",
    "tg_q64": "Hai cộng hai bằng mấy ngón tay bé xòe ra nào?",
    "tg_q65": "Ba cộng hai bằng mấy vậy bé yêu thông thái?",

    # 2. HÌNH KHỐI VÀ PHA MÀU
    "shape_circle": "Hình Tròn",
    "shape_square": "Hình Vuông",
    "shape_triangle": "Hình Tam Giác",
    "shape_rectangle": "Hình Chữ Nhật",
    "shape_star": "Hình Ngôi Sao",
    "shape_heart": "Hình Trái Tim",
    "shape_diamond": "Hình Thoi",
    "color_mix_prompt": "Bé hãy chọn hai màu để pha màu ma thuật nhé!",
    "mix_orange": "Màu đỏ pha màu vàng tạo ra màu cam rực rỡ!",
    "mix_green": "Màu lam pha màu vàng tạo ra màu xanh lá cây mát lành!",
    "mix_purple": "Màu đỏ pha màu lam tạo ra màu tím diệu kỳ!",

    # 3. NGUYÊN ÂM KÉP VÀ DẤU THANH
    "vowel_comp_ai": "Nguyên âm kép A I, vần Ai",
    "vowel_comp_ao": "Nguyên âm kép A O, vần Ao",
    "vowel_comp_au": "Nguyên âm kép A U, vần Au",
    "vowel_comp_ay": "Nguyên âm kép A Y, vần Ay",
    "vowel_comp_eo": "Nguyên âm kép E O, vần Eo",
    "vowel_comp_ia": "Nguyên âm kép I A, vần Ia",
    "vowel_comp_oa": "Nguyên âm kép O A, vần Oa",
    "vowel_comp_oi": "Nguyên âm kép O I, vần Oi",
    "vowel_comp_ua": "Nguyên âm kép U A, vần Ua",
    "vowel_comp_ui": "Nguyên âm kép U I, vần Ui",
    "vowel_comp_uy": "Nguyên âm kép U Y, vần Uy",
    "vowel_comp_uwa": "Nguyên âm kép Ư A, vần Ưa",

    # Tone cho Vần AI
    "tone_ai_ai": "Ai (không dấu)",
    "tone_ai_ais": "Ai sắc Ái",
    "tone_ai_aih": "Ai huyền Ài",
    "tone_ai_aio": "Ai hỏi Ải",
    "tone_ai_ain": "Ai ngã Ãi",
    "tone_ai_ait": "Ai nặng Ại",

    # Tone cho Vần AO
    "tone_ao_ao": "Ao (không dấu)",
    "tone_ao_aos": "Ao sắc Áo",
    "tone_ao_aoh": "Ao huyền Ào",
    "tone_ao_aoo": "Ao hỏi Ảo",
    "tone_ao_aon": "Ao ngã Ão",
    "tone_ao_aot": "Ao nặng Ạo",

    # Tone cho Vần EO
    "tone_eo_eo": "Eo (không dấu)",
    "tone_eo_eos": "Eo sắc Éo",
    "tone_eo_eoh": "Eo huyền Èo",
    "tone_eo_eoo": "Eo hỏi Ẻo",
    "tone_eo_eon": "Eo ngã Ẽo",
    "tone_eo_eot": "Eo nặng Ẹo",

    # Tone cho Vần OA
    "tone_oa_oa": "Oa (không dấu)",
    "tone_oa_oas": "Oa sắc Oá",
    "tone_oa_oah": "Oa huyền Oà",
    "tone_oa_oao": "Oa hỏi Oả",
    "tone_oa_oan": "Oa ngã Oã",
    "tone_oa_oat": "Oa nặng Oạ",

    # Tone cho Vần OI
    "tone_oi_oi": "Oi (không dấu)",
    "tone_oi_ois": "Oi sắc Ói",
    "tone_oi_oih": "Oi huyền Òi",
    "tone_oi_oio": "Oi hỏi Ỏi",
    "tone_oi_oin": "Oi ngã Õi",
    "tone_oi_oit": "Oi nặng Ọi",

    # Cấp 1 Ghép Vần: Từ 2 chữ cái không dấu
    "spell_ba_simple": "Bờ A Ba",
    "spell_ca_simple": "Cờ A Ca",
    "spell_bo_simple": "Bờ Ô Bô",
    "spell_me_simple": "Mờ E Me",
    "spell_di_simple": "Đờ I Đi",
    "spell_xe_simple": "Ít xì E Xe",
    "spell_no_simple": "Nờ Ơ Nơ",
    "spell_tu_simple": "Tờ U Tu"
}

async def generate_single_file(key, text):
    out_path = os.path.join(AUDIO_DIR, f"{key}.mp3")
    if os.path.exists(out_path) and os.path.getsize(out_path) > 500:
        return True, "existed"

    try:
        # Edge-TTS
        comm = edge_tts.Communicate(text, VOICE, rate="+0%", pitch="+0Hz")
        await asyncio.wait_for(comm.save(out_path), timeout=5.0)
        if os.path.exists(out_path) and os.path.getsize(out_path) > 500:
            return True, "edge_tts"
    except Exception as e:
        pass

    try:
        # Fallback gTTS
        tts = gTTS(text=text, lang='vi')
        tts.save(out_path)
        if os.path.exists(out_path) and os.path.getsize(out_path) > 500:
            return True, "gTTS"
    except Exception as e:
        return False, str(e)

    return False, "unknown"

async def main():
    os.makedirs(AUDIO_DIR, exist_ok=True)
    print(f"Bắt đầu sinh {len(AUDIO_TASKS)} tệp âm thanh v6.1...")
    success = 0
    failed = 0

    for i, (key, text) in enumerate(AUDIO_TASKS.items()):
        ok, source = await generate_single_file(key, text)
        if ok:
            success += 1
            if source != "existed":
                print(f"[{i+1}/{len(AUDIO_TASKS)}] ✅ {key}.mp3 ({source})")
        else:
            failed += 1
            print(f"[{i+1}/{len(AUDIO_TASKS)}] ❌ {key}.mp3 - Lỗi: {source}")

    print(f"\n--- Hoàn tất sinh audio: Thành công {success}/{len(AUDIO_TASKS)}, Thất bại: {failed} ---")

if __name__ == "__main__":
    asyncio.run(main())

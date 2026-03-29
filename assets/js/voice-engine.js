/**
 * VoiceEngine - Web Speech API 래퍼 (한국어 ko-KR)
 * CommandParser - 한국어 음성 → 구조화된 명령 변환
 */

// ─── VOICE ENGINE ────────────────────────────────
class VoiceEngine extends EventTarget {
    constructor(options = {}) {
        super();
        this.lang = options.lang || 'ko-KR';
        this.recognition = null;
        this.isListening = false;
        this.supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    }

    init() {
        if (!this.supported) return false;
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SR();
        this.recognition.lang = this.lang;
        this.recognition.continuous = true;   // 계속 듣기 모드
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 3;

        this.recognition.onresult = (e) => {
            const last = e.results[e.results.length - 1];
            const transcript = last[0].transcript.trim();
            const isFinal = last.isFinal;
            this.dispatchEvent(new CustomEvent('result', {
                detail: { transcript, isFinal, confidence: last[0].confidence }
            }));
        };

        this.recognition.onstart = () => {
            this.isListening = true;
            this.dispatchEvent(new CustomEvent('listening', { detail: true }));
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.dispatchEvent(new CustomEvent('listening', { detail: false }));
            this.dispatchEvent(new CustomEvent('end'));
        };

        this.recognition.onerror = (e) => {
            console.warn('[VoiceEngine] error:', e.error);
            this.dispatchEvent(new CustomEvent('error', { detail: e.error }));
        };

        return true;
    }

    start() {
        if (!this.recognition) this.init();
        if (this.recognition && !this.isListening) {
            try { this.recognition.start(); }
            catch (e) { console.warn('[VoiceEngine] start error:', e); }
        }
    }

    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    toggle() {
        if (this.isListening) this.stop();
        else this.start();
    }
}

// ─── COMMAND PARSER ──────────────────────────────
class CommandParser {
    constructor() {
        // 한국어 숫자 → 아라비아 숫자
        this.koreanNumbers = {
            // 고유어
            '하나': 1, '둘': 2, '셋': 3, '넷': 4, '다섯': 5,
            '여섯': 6, '일곱': 7, '여덟': 8, '아홉': 9, '열': 10,
            '열하나': 11, '열둘': 12, '열셋': 13, '열넷': 14, '열다섯': 15,
            '열여섯': 16, '열일곱': 17, '열여덟': 18, '열아홉': 19, '스물': 20,
            // 한자어
            '일': 1, '이': 2, '삼': 3, '사': 4, '오': 5,
            '육': 6, '칠': 7, '팔': 8, '구': 9, '십': 10,
            '십일': 11, '십이': 12, '십삼': 13, '십사': 14, '십오': 15,
            '이십': 20, '삼십': 30,
        };

        // 명령 패턴 (우선순위 순서)
        this.patterns = [
            // SEARCH: "{keyword} {N}장 보여줘"
            {
                type: 'search',
                regex: /(.+?)\s*(\d+|[가-힣]+)\s*장\s*(보여|검색|찾아|열어)/,
                extract: (m) => ({
                    query: m[1].trim(),
                    count: this.parseNumber(m[2]) || 10
                })
            },
            // SEARCH: "{keyword} 보여줘/검색/찾아줘"
            {
                type: 'search',
                regex: /(.+?)\s*(보여줘|보여 줘|보여|검색해 줘|검색해줘|검색|찾아줘|찾아 줘|찾아)/,
                extract: (m) => ({ query: m[1].trim(), count: 10 })
            },
            // ZOOM: "{N}번 확대/크게/열어/봐"
            {
                type: 'zoom',
                regex: /(\d+|[가-힣]+)\s*번?\s*(확대|크게|열어|봐|보여|봐줘|보여줘|선택)/,
                extract: (m) => ({ number: this.parseNumber(m[1]) })
            },
            // PRINT: "{N}번 출력/프린트/인쇄"
            {
                type: 'print',
                regex: /(\d+|[가-힣]+)\s*번?\s*(출력|프린트|인쇄|프린터|뽑아)/,
                extract: (m) => ({ number: this.parseNumber(m[1]) })
            },
            // ALL PRINT: "전부 출력" / "다 출력"
            {
                type: 'print_all',
                regex: /(전부|전체|다|모두)\s*(출력|프린트|인쇄|뽑아)/,
                extract: () => ({})
            },
            // STOP: "루나 닫아줘/꺼줘" — 오버레이 닫기 + 음성 OFF
            {
                type: 'stop',
                regex: /루나\s*(닫아|닫아줘|꺼줘|꺼|끝|종료|그만)/,
                extract: () => ({})
            },
            // CLOSE: "닫아/끝/종료" — 오버레이만 닫기 (음성 유지)
            {
                type: 'close',
                regex: /(닫아|닫기|닫아줘|끝|종료|나가|그만|취소)/,
                extract: () => ({})
            },
            // RETRY: "다시" — 같은 검색어로 다시 검색
            {
                type: 'retry',
                regex: /(다시|다시 검색|다시 보여줘|다시 찾아)/,
                extract: () => ({})
            },
            // NEXT: "다음/넘겨"
            {
                type: 'next',
                regex: /(다음|넘겨|넘겨줘|다음거|다음 거)/,
                extract: () => ({})
            },
            // PREV: "이전/뒤로"
            {
                type: 'prev',
                regex: /(이전|뒤로|뒤로 가|이전거|이전 거)/,
                extract: () => ({})
            },
        ];
    }

    parseNumber(str) {
        if (!str) return null;
        const n = parseInt(str);
        if (!isNaN(n)) return n;
        return this.koreanNumbers[str] || null;
    }

    parse(transcript) {
        const text = transcript.trim();

        for (const pattern of this.patterns) {
            const match = text.match(pattern.regex);
            if (match) {
                const result = { type: pattern.type, ...pattern.extract(match), raw: text };
                console.log('[CommandParser]', text, '→', result);
                return result;
            }
        }

        // 폴백: 짧은 텍스트는 검색으로 취급
        if (text.length > 0 && text.length < 20) {
            const result = { type: 'search', query: text, count: 10, raw: text };
            console.log('[CommandParser] fallback:', text, '→', result);
            return result;
        }

        return { type: 'unknown', raw: text };
    }
}

/**
 * Luna Science Lab — 섹션 & 카드 데이터
 * 카드 추가/수정/삭제는 이 파일만 수정하면 됩니다.
 *
 * 섹션 구조:
 *   title  — 섹션 제목
 *   cards  — 카드 배열
 *
 * 카드 구조:
 *   icon   — 이모지 아이콘
 *   title  — 카드 제목
 *   desc   — 설명 텍스트
 *   href   — 링크 경로 (없으면 locked)
 *   status — 'online' | 'soon'
 */

const SCIENCE_SECTIONS = [
    {
        title: '실험실 목록',
        cards: [
            { icon: '🪐', title: '태양계 탐험',  desc: '신비로운 우주의 세계로 떠나요! 태양계 행성들을 탐험하는 과학 교실', href: '../luna-tech/luna-science.html', status: 'online' },
            { icon: '⚛️', title: '분자 빌더',    desc: '원자를 조합해서 분자를 만들어보세요! 드래그 앤 드롭으로 배우는 화학 결합', href: '../luna-tech/atomic-builder.html', status: 'online' },
            { icon: '🌋', title: '지층 빌더',    desc: '모래, 용암, 물을 부어 암석을 만들어보세요! 물리 시뮬레이션으로 배우는 지질학', href: '../luna-tech/strata-builder.html', status: 'online' },
            { icon: '🫀', title: '인체 탐험',    desc: '3D 얼음 블록 인체! 물을 마시면 소화 과정을 따라가보세요', href: '../luna-tech/anatomy-builder.html', status: 'online' },
            { icon: '🔬', title: '광석 감별사',  desc: '돌을 깨고, 불꽃·산성·자성 실험으로 광석을 추리하세요! 20종 광물 도감', href: '../luna-tech/mineral-detective.html', status: 'online' },
            { icon: '🧪', title: '화학 실험실',  desc: '비커에 시약을 넣고 가열하면? 폭발·거품·침전·결정! 진짜 화학 실험을 해보세요', href: '../luna-tech/chem-lab.html', status: 'online' },
            { icon: '🥚', title: '화학 몬스터',  desc: '알에서 태어난 화학 몬스터를 광물로 키워보세요! 400가지 진화를 수집하는 다마고치', href: 'chem-monster.html', status: 'online' },
            { icon: '🧬', title: 'DNA 연구소',   desc: 'DNA 이중나선을 조립하고, 유전자 코드를 해독해보세요', status: 'soon' },
            { icon: '🔭', title: '천체 관측소',  desc: '별자리를 찾고, 성운과 은하를 관측하세요', status: 'soon' },
            { icon: '🌿', title: '생태계 시뮬',  desc: '먹이사슬을 설계하고, 생태계 균형을 관찰해보세요', status: 'soon' },
            { icon: '⚡', title: '전기 회로',    desc: 'LED, 저항, 스위치를 연결해서 나만의 회로를 만들어요', status: 'soon' },
        ]
    },
    {
        title: '관찰 실험실',
        cards: [
            { icon: '🔍', title: '분자 상태 변화 관찰', desc: '고체·액체·기체 분자 운동을 관찰하고, 온도에 따른 상태 변화를 탐구해요', href: '../../molecular-magnifier/index.html', status: 'online' },
        ]
    },
];

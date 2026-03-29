/**
 * 화학 몬스터 다마고치 — 데이터 파일
 * 40종 광물 + 진화 규칙 + 400종 몬스터 이름/외형 데이터
 */

/* ───────────── 8대 원소 타입 ───────────── */
const ELEMENTS = {
  ignis:  { id:'ignis',  nameKr:'이그니스', nameEn:'Ignis',  emoji:'🔥', color:'#ff4444', color2:'#ff6b35', glow:'rgba(255,68,68,.4)', desc:'황화광물의 불꽃' },
  terra:  { id:'terra',  nameKr:'테라',     nameEn:'Terra',  emoji:'💎', color:'#8b5cf6', color2:'#a78bfa', glow:'rgba(139,92,246,.4)', desc:'규산염의 대지' },
  aqua:   { id:'aqua',   nameKr:'아쿠아',   nameEn:'Aqua',   emoji:'🌊', color:'#06b6d4', color2:'#22d3ee', glow:'rgba(6,182,212,.4)',  desc:'할로겐의 물결' },
  volt:   { id:'volt',   nameKr:'볼트',     nameEn:'Volt',   emoji:'⚡', color:'#fbbf24', color2:'#fde68a', glow:'rgba(251,191,36,.4)', desc:'산화광물의 번개' },
  flora:  { id:'flora',  nameKr:'플로라',   nameEn:'Flora',  emoji:'🌿', color:'#10b981', color2:'#34d399', glow:'rgba(16,185,129,.4)', desc:'탄산염의 생명' },
  toxin:  { id:'toxin',  nameKr:'톡신',     nameEn:'Toxin',  emoji:'☠️', color:'#a855f7', color2:'#c084fc', glow:'rgba(168,85,247,.4)', desc:'인산염의 독' },
  lux:    { id:'lux',    nameKr:'룩스',     nameEn:'Lux',    emoji:'🌟', color:'#fcd34d', color2:'#fef3c7', glow:'rgba(252,211,77,.4)', desc:'자연원소의 빛' },
  aero:   { id:'aero',   nameKr:'에어로',   nameEn:'Aero',   emoji:'🌀', color:'#818cf8', color2:'#c7d2fe', glow:'rgba(129,140,248,.4)',desc:'황산염의 바람' }
};
const ELEMENT_IDS = Object.keys(ELEMENTS);

/* ───────────── 40종 광물 ───────────── */
const MINERALS = [
  // IGNIS — 황화광물 (Sulfides)
  { id:'pyrite',       nameKr:'황철석',     nameEn:'Pyrite',       formula:'FeS₂',             element:'ignis', rarity:'common',   cost:1, hunger:15, happy:3,  energy:2,  color:'#ffd700' },
  { id:'galena',       nameKr:'방연석',     nameEn:'Galena',       formula:'PbS',              element:'ignis', rarity:'common',   cost:1, hunger:14, happy:2,  energy:3,  color:'#708090' },
  { id:'cinnabar',     nameKr:'진사',       nameEn:'Cinnabar',     formula:'HgS',              element:'ignis', rarity:'common',   cost:1, hunger:16, happy:4,  energy:1,  color:'#e34234' },
  { id:'sphalerite',   nameKr:'섬아연석',   nameEn:'Sphalerite',   formula:'ZnS',              element:'ignis', rarity:'common',   cost:1, hunger:13, happy:3,  energy:4,  color:'#8b4513' },
  { id:'chalcopyrite', nameKr:'황동석',     nameEn:'Chalcopyrite', formula:'CuFeS₂',           element:'ignis', rarity:'common',   cost:1, hunger:15, happy:5,  energy:2,  color:'#b8860b' },

  // TERRA — 규산염 (Silicates)
  { id:'quartz',       nameKr:'석영',       nameEn:'Quartz',       formula:'SiO₂',             element:'terra', rarity:'common',   cost:1, hunger:12, happy:5,  energy:5,  color:'#e8e8e8' },
  { id:'feldspar',     nameKr:'장석',       nameEn:'Feldspar',     formula:'KAlSi₃O₈',         element:'terra', rarity:'common',   cost:1, hunger:13, happy:4,  energy:4,  color:'#deb887' },
  { id:'olivine',      nameKr:'감람석',     nameEn:'Olivine',      formula:'(Mg,Fe)₂SiO₄',     element:'terra', rarity:'common',   cost:1, hunger:14, happy:3,  energy:3,  color:'#6b8e23' },
  { id:'garnet',       nameKr:'석류석',     nameEn:'Garnet',       formula:'X₃Y₂(SiO₄)₃',     element:'terra', rarity:'uncommon', cost:3, hunger:18, happy:8,  energy:6,  color:'#8b0000' },
  { id:'topaz',        nameKr:'황옥',       nameEn:'Topaz',        formula:'Al₂SiO₄(F,OH)₂',   element:'terra', rarity:'common',   cost:1, hunger:15, happy:6,  energy:4,  color:'#ffcc00' },

  // AQUA — 할로겐화물 (Halides)
  { id:'halite',       nameKr:'암염',       nameEn:'Halite',       formula:'NaCl',             element:'aqua',  rarity:'common',   cost:1, hunger:11, happy:3,  energy:6,  color:'#b0e0e6' },
  { id:'fluorite',     nameKr:'형석',       nameEn:'Fluorite',     formula:'CaF₂',             element:'aqua',  rarity:'common',   cost:1, hunger:13, happy:6,  energy:4,  color:'#7b68ee' },
  { id:'sylvite',      nameKr:'염화칼륨',   nameEn:'Sylvite',      formula:'KCl',              element:'aqua',  rarity:'common',   cost:1, hunger:12, happy:2,  energy:5,  color:'#ff7f50' },
  { id:'cryolite',     nameKr:'빙정석',     nameEn:'Cryolite',     formula:'Na₃AlF₆',          element:'aqua',  rarity:'common',   cost:1, hunger:14, happy:4,  energy:7,  color:'#f0f8ff' },
  { id:'atacamite',    nameKr:'아타카마석', nameEn:'Atacamite',    formula:'Cu₂Cl(OH)₃',       element:'aqua',  rarity:'common',   cost:1, hunger:15, happy:5,  energy:3,  color:'#2e8b57' },

  // VOLT — 산화광물 (Oxides)
  { id:'magnetite',    nameKr:'자철석',     nameEn:'Magnetite',    formula:'Fe₃O₄',            element:'volt',  rarity:'common',   cost:1, hunger:16, happy:2,  energy:8,  color:'#2f2f2f' },
  { id:'hematite',     nameKr:'적철석',     nameEn:'Hematite',     formula:'Fe₂O₃',            element:'volt',  rarity:'common',   cost:1, hunger:15, happy:3,  energy:6,  color:'#8b0000' },
  { id:'corundum',     nameKr:'강옥',       nameEn:'Corundum',     formula:'Al₂O₃',            element:'volt',  rarity:'uncommon', cost:3, hunger:20, happy:7,  energy:9,  color:'#4169e1' },
  { id:'rutile',       nameKr:'금홍석',     nameEn:'Rutile',       formula:'TiO₂',             element:'volt',  rarity:'common',   cost:1, hunger:14, happy:4,  energy:7,  color:'#cd853f' },
  { id:'chromite',     nameKr:'크롬철석',   nameEn:'Chromite',     formula:'FeCr₂O₄',          element:'volt',  rarity:'common',   cost:1, hunger:17, happy:3,  energy:5,  color:'#363636' },

  // FLORA — 탄산염 (Carbonates)
  { id:'calcite',      nameKr:'방해석',     nameEn:'Calcite',      formula:'CaCO₃',            element:'flora', rarity:'common',   cost:1, hunger:12, happy:6,  energy:4,  color:'#fffacd' },
  { id:'malachite',    nameKr:'공작석',     nameEn:'Malachite',    formula:'Cu₂CO₃(OH)₂',      element:'flora', rarity:'uncommon', cost:3, hunger:16, happy:9,  energy:5,  color:'#3cb371' },
  { id:'azurite',      nameKr:'남동석',     nameEn:'Azurite',      formula:'Cu₃(CO₃)₂(OH)₂',   element:'flora', rarity:'common',   cost:1, hunger:14, happy:7,  energy:3,  color:'#007fff' },
  { id:'dolomite',     nameKr:'백운석',     nameEn:'Dolomite',     formula:'CaMg(CO₃)₂',       element:'flora', rarity:'common',   cost:1, hunger:13, happy:5,  energy:6,  color:'#faebd7' },
  { id:'rhodochrosite',nameKr:'능망간석',   nameEn:'Rhodochrosite',formula:'MnCO₃',            element:'flora', rarity:'common',   cost:1, hunger:15, happy:8,  energy:2,  color:'#ff69b4' },

  // TOXIN — 인산염 (Phosphates)
  { id:'apatite',      nameKr:'인회석',     nameEn:'Apatite',      formula:'Ca₅(PO₄)₃(F,OH)',  element:'toxin', rarity:'common',   cost:1, hunger:14, happy:4,  energy:5,  color:'#00ced1' },
  { id:'turquoise',    nameKr:'터키석',     nameEn:'Turquoise',    formula:'CuAl₆(PO₄)₄(OH)₈', element:'toxin', rarity:'uncommon', cost:3, hunger:17, happy:10, energy:4,  color:'#40e0d0' },
  { id:'vivianite',    nameKr:'남철석',     nameEn:'Vivianite',    formula:'Fe₃(PO₄)₂·8H₂O',  element:'toxin', rarity:'common',   cost:1, hunger:13, happy:5,  energy:6,  color:'#191970' },
  { id:'pyromorphite', nameKr:'녹연석',     nameEn:'Pyromorphite', formula:'Pb₅(PO₄)₃Cl',      element:'toxin', rarity:'common',   cost:1, hunger:15, happy:3,  energy:3,  color:'#9acd32' },
  { id:'autunite',     nameKr:'인회우라늄석',nameEn:'Autunite',    formula:'Ca(UO₂)₂(PO₄)₂',   element:'toxin', rarity:'rare',     cost:5, hunger:22, happy:6,  energy:10, color:'#7fff00' },

  // LUX — 자연원소 (Native Elements)
  { id:'gold',         nameKr:'금',         nameEn:'Gold',         formula:'Au',               element:'lux',   rarity:'rare',     cost:5, hunger:25, happy:12, energy:8,  color:'#ffd700' },
  { id:'silver',       nameKr:'은',         nameEn:'Silver',       formula:'Ag',               element:'lux',   rarity:'common',   cost:1, hunger:14, happy:6,  energy:5,  color:'#c0c0c0' },
  { id:'copper',       nameKr:'구리',       nameEn:'Copper',       formula:'Cu',               element:'lux',   rarity:'common',   cost:1, hunger:13, happy:5,  energy:4,  color:'#b87333' },
  { id:'diamond',      nameKr:'다이아몬드', nameEn:'Diamond',      formula:'C',                element:'lux',   rarity:'rare',     cost:5, hunger:30, happy:15, energy:12, color:'#b9f2ff' },
  { id:'sulfur_native',nameKr:'황',         nameEn:'Sulfur',       formula:'S',                element:'lux',   rarity:'common',   cost:1, hunger:12, happy:3,  energy:6,  color:'#ffff00' },

  // AERO — 황산염/붕산염 (Sulfates & Borates)
  { id:'gypsum',       nameKr:'석고',       nameEn:'Gypsum',       formula:'CaSO₄·2H₂O',      element:'aero',  rarity:'common',   cost:1, hunger:11, happy:4,  energy:5,  color:'#f5f5dc' },
  { id:'barite',       nameKr:'중정석',     nameEn:'Barite',       formula:'BaSO₄',            element:'aero',  rarity:'common',   cost:1, hunger:14, happy:3,  energy:6,  color:'#e0e0e0' },
  { id:'celestine',    nameKr:'천청석',     nameEn:'Celestine',    formula:'SrSO₄',            element:'aero',  rarity:'uncommon', cost:3, hunger:18, happy:9,  energy:7,  color:'#87ceeb' },
  { id:'borax',        nameKr:'붕사',       nameEn:'Borax',        formula:'Na₂B₄O₇·10H₂O',   element:'aero',  rarity:'common',   cost:1, hunger:12, happy:5,  energy:4,  color:'#fffaf0' },
  { id:'ulexite',      nameKr:'울렉사이트', nameEn:'Ulexite',      formula:'NaCaB₅O₆(OH)₆',    element:'aero',  rarity:'common',   cost:1, hunger:13, happy:6,  energy:5,  color:'#f0ffff' }
];

const MINERAL_MAP = {};
MINERALS.forEach(m => MINERAL_MAP[m.id] = m);

/* ───────────── 해츨링 8종 (Stage 1) ───────────── */
const HATCHLINGS = {
  ignis:  { nameKr:'이그니 스파크',   nameEn:'Igni Spark',    bodyType:0 },
  terra:  { nameKr:'테라 페블',       nameEn:'Terra Pebble',  bodyType:1 },
  aqua:   { nameKr:'아쿠아 드롭',     nameEn:'Aqua Drop',     bodyType:2 },
  volt:   { nameKr:'볼트 잽',         nameEn:'Volt Zap',      bodyType:3 },
  flora:  { nameKr:'플로라 스프라우트',nameEn:'Flora Sprout',  bodyType:4 },
  toxin:  { nameKr:'톡신 스포어',     nameEn:'Toxin Spore',   bodyType:5 },
  lux:    { nameKr:'룩스 글림',       nameEn:'Lux Gleam',     bodyType:6 },
  aero:   { nameKr:'에어로 위스프',   nameEn:'Aero Wisp',     bodyType:7 }
};

/* ───────────── 유년체 40종 (Stage 2) ───────────── */
/* 각 원소별 5 서브타입: [0]=순수, [1~4]=하이브리드 */
/* 하이브리드 조합 순서: 원소 순서에서 자기 자신 제외 후 첫 4개 */
function getHybridElements(el) {
  const others = ELEMENT_IDS.filter(e => e !== el);
  return others.slice(0, 4);
}

const JUVENILES = {
  ignis: [
    { nameKr:'파이로사이트',   nameEn:'Pyrocyte',     sub:'pure',  hybrid:null },
    { nameKr:'마그마코어',     nameEn:'Magmacore',    sub:'hybrid', hybrid:'terra' },
    { nameKr:'스팀웜',         nameEn:'Steamwyrm',    sub:'hybrid', hybrid:'aqua' },
    { nameKr:'썬더포지',       nameEn:'Thunderforge',  sub:'hybrid', hybrid:'volt' },
    { nameKr:'애시블룸',       nameEn:'Ashbloom',     sub:'hybrid', hybrid:'flora' }
  ],
  terra: [
    { nameKr:'크리스탈리드',   nameEn:'Crystalid',    sub:'pure',  hybrid:null },
    { nameKr:'옵시디모',       nameEn:'Obsidimaw',    sub:'hybrid', hybrid:'ignis' },
    { nameKr:'코랄리스',       nameEn:'Coralith',     sub:'hybrid', hybrid:'aqua' },
    { nameKr:'마그네락',       nameEn:'Magnetrock',   sub:'hybrid', hybrid:'volt' },
    { nameKr:'모스골렘',       nameEn:'Mossgolem',    sub:'hybrid', hybrid:'flora' }
  ],
  aqua: [
    { nameKr:'브라이넬링',     nameEn:'Brineling',    sub:'pure',  hybrid:null },
    { nameKr:'프로스트모',     nameEn:'Frostmaw',     sub:'hybrid', hybrid:'ignis' },
    { nameKr:'타이드쿼츠',     nameEn:'Tidequartz',   sub:'hybrid', hybrid:'terra' },
    { nameKr:'스톰타이드',     nameEn:'Stormtide',    sub:'hybrid', hybrid:'volt' },
    { nameKr:'알개피엔드',     nameEn:'Algaefiend',   sub:'hybrid', hybrid:'flora' }
  ],
  volt: [
    { nameKr:'스파코이드',     nameEn:'Sparkoid',     sub:'pure',  hybrid:null },
    { nameKr:'라바볼트',       nameEn:'Lavabolt',     sub:'hybrid', hybrid:'ignis' },
    { nameKr:'이온셸',         nameEn:'Ionshell',     sub:'hybrid', hybrid:'terra' },
    { nameKr:'아크노드',       nameEn:'Arcnode',      sub:'hybrid', hybrid:'aqua' },
    { nameKr:'쏜쇼크',         nameEn:'Thornshock',   sub:'hybrid', hybrid:'flora' }
  ],
  flora: [
    { nameKr:'펀링',           nameEn:'Fernling',     sub:'pure',  hybrid:null },
    { nameKr:'엠버바인',       nameEn:'Embervine',    sub:'hybrid', hybrid:'ignis' },
    { nameKr:'모스골렘',       nameEn:'Mossgolem',    sub:'hybrid', hybrid:'terra' },
    { nameKr:'시그로브',       nameEn:'Seagrove',     sub:'hybrid', hybrid:'aqua' },
    { nameKr:'잽루트',         nameEn:'Zaprooot',     sub:'hybrid', hybrid:'volt' }
  ],
  toxin: [
    { nameKr:'베노마이트',     nameEn:'Venomite',     sub:'pure',  hybrid:null },
    { nameKr:'설퍼모',         nameEn:'Sulfurmaw',    sub:'hybrid', hybrid:'ignis' },
    { nameKr:'독석골렘',       nameEn:'Toxite',       sub:'hybrid', hybrid:'terra' },
    { nameKr:'에시드풀',       nameEn:'Acidpool',     sub:'hybrid', hybrid:'aqua' },
    { nameKr:'쇼크스포어',     nameEn:'Shockspore',   sub:'hybrid', hybrid:'volt' }
  ],
  lux: [
    { nameKr:'글리머라이트',   nameEn:'Glimmerite',   sub:'pure',  hybrid:null },
    { nameKr:'플레어프리즘',   nameEn:'Flareprism',   sub:'hybrid', hybrid:'ignis' },
    { nameKr:'크리스탈샤인',   nameEn:'Crystashine',  sub:'hybrid', hybrid:'terra' },
    { nameKr:'듀샤인',         nameEn:'Dewshine',     sub:'hybrid', hybrid:'aqua' },
    { nameKr:'볼트글로우',     nameEn:'Voltglow',     sub:'hybrid', hybrid:'volt' }
  ],
  aero: [
    { nameKr:'제피리드',       nameEn:'Zephyrid',     sub:'pure',  hybrid:null },
    { nameKr:'스모크월',       nameEn:'Smokewhirl',   sub:'hybrid', hybrid:'ignis' },
    { nameKr:'샌드스톰',       nameEn:'Sandstorm',    sub:'hybrid', hybrid:'terra' },
    { nameKr:'미스트컬',       nameEn:'Mistcurl',     sub:'hybrid', hybrid:'aqua' },
    { nameKr:'스태틱윈드',     nameEn:'Staticwind',   sub:'hybrid', hybrid:'volt' }
  ]
};

/* ───────────── 기질 (Temperament) ───────────── */
const TEMPERAMENTS = {
  disciplined: { id:'disciplined', nameKr:'단련형', nameEn:'Commander', threshold: 0.6 },
  wild:        { id:'wild',        nameKr:'야생형', nameEn:'Ravager',   threshold: 0 }
};

/* ───────────── 최종 특화 5종 ───────────── */
const SPECIALIZATIONS = [
  { id:'sovereign',  nameKr:'소버린',     nameEn:'Sovereign',  descKr:'순수 원소의 왕',        condition:'sameFeedRatio >= 0.8' },
  { id:'alchemist',  nameKr:'알케미스트', nameEn:'Alchemist',  descKr:'다양한 원소의 조화',    condition:'uniqueElements >= 4' },
  { id:'berserker',  nameKr:'버서커',     nameEn:'Berserker',  descKr:'강력한 에너지의 폭주',  condition:'rareFeeds >= 5 && fastFeed' },
  { id:'guardian',   nameKr:'가디언',     nameEn:'Guardian',   descKr:'균형잡힌 수호자',       condition:'balancedStats && slowFeed' },
  { id:'mythic',     nameKr:'미식',       nameEn:'Mythic',     descKr:'전설적 존재',           condition:'rareFeeds >= 10 && specialCombo' }
];

/* ───────────── 진화 조건 계산 함수 ───────────── */

/** 우세 원소 계산 (해츨링 결정용) */
function getDominantElement(elementCounts) {
  let max = 0, dominant = 'ignis';
  for (const el of ELEMENT_IDS) {
    if ((elementCounts[el] || 0) > max) {
      max = elementCounts[el];
      dominant = el;
    }
  }
  return dominant;
}

/** 보조 원소 계산 (유년체 분기용) */
function getSecondaryElement(elementCounts, primary) {
  const sorted = ELEMENT_IDS.filter(e => e !== primary)
    .sort((a, b) => (elementCounts[b] || 0) - (elementCounts[a] || 0));
  return sorted[0];
}

/** 순수 vs 하이브리드 판단 */
function getSubType(elementCounts, primary) {
  const total = Object.values(elementCounts).reduce((s, v) => s + v, 0) || 1;
  const purityRatio = (elementCounts[primary] || 0) / total;
  if (purityRatio >= 0.8) return 0; // 순수
  const secondary = getSecondaryElement(elementCounts, primary);
  const juvList = JUVENILES[primary];
  for (let i = 1; i < juvList.length; i++) {
    if (juvList[i].hybrid === secondary) return i;
  }
  return 1; // 기본 하이브리드
}

/** 기질 계산 */
function getTemperament(monster) {
  const discipline = monster.discipline.callsTotal > 0
    ? monster.discipline.callsAnswered / monster.discipline.callsTotal : 0.5;
  const petrifyPenalty = Math.min(monster.petrifyCount * 0.15, 0.45);
  const score = discipline - petrifyPenalty;
  return score >= TEMPERAMENTS.disciplined.threshold ? 'disciplined' : 'wild';
}

/** 특화 계산 */
function getSpecialization(monster) {
  const total = monster.totalFeeds || 1;
  const ec = monster.elementCounts;
  const primary = monster.element;
  const sameFeedRatio = (ec[primary] || 0) / total;
  const uniqueElements = ELEMENT_IDS.filter(e => (ec[e] || 0) > 0).length;
  const rareFeeds = (monster.feedHistory || []).filter(f => {
    const m = MINERAL_MAP[f.mineralId];
    return m && m.rarity === 'rare';
  }).length;
  const uncommonFeeds = (monster.feedHistory || []).filter(f => {
    const m = MINERAL_MAP[f.mineralId];
    return m && (m.rarity === 'uncommon' || m.rarity === 'rare');
  }).length;
  // 먹이기 속도: 평균 간격이 짧으면 fast
  const intervals = [];
  const hist = monster.feedHistory || [];
  for (let i = 1; i < hist.length; i++) intervals.push(hist[i].timestamp - hist[i-1].timestamp);
  const avgInterval = intervals.length > 0 ? intervals.reduce((s,v)=>s+v,0)/intervals.length : 999999;
  const fastFeed = avgInterval < 600000; // 10분 미만
  const slowFeed = avgInterval > 1800000; // 30분 이상
  // 스탯 균형
  const stats = monster.stats;
  const statValues = [stats.hunger, stats.happiness, stats.energy, stats.cleanliness];
  const statAvg = statValues.reduce((s,v)=>s+v,0)/4;
  const statVariance = statValues.reduce((s,v)=>s+Math.pow(v-statAvg,2),0)/4;
  const balancedStats = statVariance < 200;
  // 특수 조합 체크 (4종이상 희귀+고급 광물)
  const specialCombo = uncommonFeeds >= 8;

  // 우선순위 판정
  if (rareFeeds >= 10 && specialCombo) return 4; // mythic
  if (sameFeedRatio >= 0.8) return 0; // sovereign
  if (rareFeeds >= 5 && fastFeed) return 2; // berserker
  if (balancedStats && slowFeed) return 3; // guardian
  if (uniqueElements >= 4) return 1; // alchemist
  return 0; // 기본 sovereign
}

/** 전체 몬스터 ID 생성 */
function getMonsterId(element, subType, temperament, specIndex) {
  return `${element}_${subType}_${temperament}_${specIndex}`;
}

/** 몬스터 전체 이름 생성 */
function getMonsterName(element, subType, temperament, specIndex, lang) {
  const juv = JUVENILES[element][subType];
  const temp = TEMPERAMENTS[temperament];
  const spec = SPECIALIZATIONS[specIndex];
  if (lang === 'ko') {
    return `${juv.nameKr} ${temp.nameKr} ${spec.nameKr}`;
  }
  return `${juv.nameEn} ${temp.nameEn} ${spec.nameEn}`;
}

/* ───────────── 진화 시간 설정 ───────────── */
const EVOLUTION_CONFIG = {
  GAME_DAY_MS: 4 * 60 * 60 * 1000,  // 4시간 = 게임 1일
  FEEDS_PER_DAY: 3,
  EGG_FEEDS_TO_HATCH: 6,            // 6번 먹이면 부화
  HATCHLING_DAYS: 5,                 // 게임 5일 후 유년체
  JUVENILE_DAYS: 10,                 // 게임 10일 후 성체
  ADULT_DAYS: 15,                    // 게임 15일 후 최종형
  STAT_DECAY: { hunger: 5, happiness: 3, energy: 2, cleanliness: 2 }, // /시간
  STAT_MAX: 100,
  STAT_PETRIFY_THRESHOLD: 0,        // 모든 스탯 0 → 석화
  ATTENTION_CALL_CHANCE: 0.15,       // 매 게임 시간체크 시 15% 확률
  ATTENTION_CALL_DURATION: 120000,   // 2분 내 응답
  MAX_SLOTS: 3
};

/* ───────────── 몬스터 외형 파라미터 ───────────── */
/* Canvas 렌더링에 사용될 형태 데이터 */
const BODY_SHAPES = {
  egg: {
    draw(ctx, w, h, color, t) {
      // 알 모양 (타원)
      const cx = w/2, cy = h/2;
      const rx = w*0.25, ry = h*0.32;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.sin(t*0.5)*0.03);
      // 그림자
      ctx.beginPath();
      ctx.ellipse(0, ry*0.9, rx*0.7, ry*0.15, 0, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fill();
      // 알 본체
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI*2);
      const grad = ctx.createRadialGradient(-rx*0.3, -ry*0.3, rx*0.1, 0, 0, rx*1.2);
      grad.addColorStop(0, '#fff');
      grad.addColorStop(0.4, color);
      grad.addColorStop(1, shadeColor(color, -40));
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = shadeColor(color, -60);
      ctx.lineWidth = 2;
      ctx.stroke();
      // 균열 (부화 근접 시)
      ctx.restore();
    }
  },
  // 8종 기본 몸체 (원소별)
  bodies: [
    // 0: Ignis — 불꽃 방울형
    { baseShape:'flame', spikes:3, roundness:0.6 },
    // 1: Terra — 각진 결정체
    { baseShape:'crystal', spikes:5, roundness:0.3 },
    // 2: Aqua — 물방울형
    { baseShape:'drop', spikes:0, roundness:0.9 },
    // 3: Volt — 번개 톱니형
    { baseShape:'bolt', spikes:6, roundness:0.4 },
    // 4: Flora — 잎사귀형
    { baseShape:'leaf', spikes:2, roundness:0.7 },
    // 5: Toxin — 포자/버블형
    { baseShape:'spore', spikes:4, roundness:0.5 },
    // 6: Lux — 별/프리즘형
    { baseShape:'star', spikes:5, roundness:0.6 },
    // 7: Aero — 소용돌이형
    { baseShape:'swirl', spikes:0, roundness:0.8 }
  ]
};

/* ───────────── 패턴 텍스쳐 ───────────── */
const PATTERNS = {
  ignis:  'flame',    // 불꽃 무늬
  terra:  'facet',    // 결정면
  aqua:   'ripple',   // 물결
  volt:   'crack',    // 번개 금
  flora:  'vine',     // 덩굴
  toxin:  'bubble',   // 기포/포자점
  lux:    'ray',      // 빛줄기
  aero:   'swirl'     // 소용돌이
};

/* ───────────── 눈 타입 ───────────── */
const EYE_TYPES = {
  hatchling:    { shape:'round',   size:0.12, pupil:0.06 },
  juvenile:     { shape:'almond',  size:0.1,  pupil:0.05 },
  adult:        { shape:'sharp',   size:0.09, pupil:0.04 },
  final:        { shape:'glow',    size:0.11, pupil:0.05 },
  petrified:    { shape:'x',       size:0.08, pupil:0 }
};

/* ───────────── 부속물 (특화별) ───────────── */
const APPENDAGES = {
  sovereign:  { type:'crown',   count:1, descKr:'왕관과 후광',   descEn:'Crown & halo' },
  alchemist:  { type:'crystals',count:4, descKr:'다색 수정체',   descEn:'Multi-crystals' },
  berserker:  { type:'spikes',  count:6, descKr:'가시와 불꽃',   descEn:'Spikes & flames' },
  guardian:   { type:'shield',  count:2, descKr:'방패와 갑옷',   descEn:'Shield & armor' },
  mythic:     { type:'halo',    count:3, descKr:'오로라 날개',   descEn:'Aurora wings' }
};

/* ───────────── 도감 총 개수 ───────────── */
const TOTAL_MONSTERS = 8 * 5 * 2 * 5; // 400

/* ───────────── 업적 정의 ───────────── */
const ACHIEVEMENTS = [
  { id:'first_hatch',    nameKr:'첫 부화',       nameEn:'First Hatch',      condition:'hatchCount >= 1',   reward:10 },
  { id:'feed_100',       nameKr:'100번 먹이기',  nameEn:'100 Feeds',        condition:'totalFeeds >= 100', reward:20 },
  { id:'first_evolve',   nameKr:'첫 진화',       nameEn:'First Evolution',  condition:'evolutionCount >= 1', reward:15 },
  { id:'first_final',    nameKr:'최종형 달성',   nameEn:'Final Form',       condition:'finalCount >= 1',   reward:50 },
  { id:'dex_10',         nameKr:'도감 10종',     nameEn:'Dex 10',           condition:'dexCount >= 10',    reward:30 },
  { id:'dex_50',         nameKr:'도감 50종',     nameEn:'Dex 50',           condition:'dexCount >= 50',    reward:100 },
  { id:'dex_100',        nameKr:'도감 100종',    nameEn:'Dex 100',          condition:'dexCount >= 100',   reward:200 },
  { id:'dex_200',        nameKr:'도감 200종',    nameEn:'Dex 200',          condition:'dexCount >= 200',   reward:500 },
  { id:'dex_400',        nameKr:'완전 수집',     nameEn:'Complete Dex',     condition:'dexCount >= 400',   reward:1000 },
  { id:'all_elements',   nameKr:'8원소 마스터',  nameEn:'All Elements',     condition:'allElementsRaised', reward:200 },
  { id:'petrify_revive', nameKr:'석화 부활',     nameEn:'Stone Revival',    condition:'petrifyRevived >= 1', reward:10 },
  { id:'mythic_unlock',  nameKr:'미식 해금',     nameEn:'Mythic Unlock',    condition:'mythicCount >= 1',  reward:100 },
  { id:'triple_slot',    nameKr:'3마리 동시',    nameEn:'Triple Active',    condition:'activeSlots >= 3',  reward:30 },
  { id:'rare_feast',     nameKr:'희귀 광물 만찬',nameEn:'Rare Feast',       condition:'rareFeeds >= 20',   reward:50 },
  { id:'speed_evolve',   nameKr:'스피드 진화',   nameEn:'Speed Evolve',     condition:'fastestFinal < 4',  reward:80 }
];

/* ───────────── 미니게임 정의 ───────────── */
const MINI_GAMES = [
  { id:'crystal_match', nameKr:'결정 매칭',   nameEn:'Crystal Match',  descKr:'같은 광물을 찾으세요!',   happyReward:20, type:'memory' },
  { id:'element_quiz',  nameKr:'원소 퀴즈',   nameEn:'Element Quiz',   descKr:'화학식을 맞추세요!',      happyReward:25, type:'quiz' },
  { id:'reaction_dodge',nameKr:'반응 피하기', nameEn:'Reaction Dodge', descKr:'위험한 반응을 피하세요!',  happyReward:30, type:'action' }
];

/* ───────────── 유틸리티 ───────────── */
function shadeColor(color, percent) {
  const num = parseInt(color.replace('#',''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R*0x10000 + G*0x100 + B).toString(16).slice(1);
}

function lerpColor(c1, c2, t) {
  const n1 = parseInt(c1.replace('#',''),16), n2 = parseInt(c2.replace('#',''),16);
  const r = Math.round((n1>>16) + ((n2>>16)-(n1>>16))*t);
  const g = Math.round(((n1>>8)&0xff) + (((n2>>8)&0xff)-((n1>>8)&0xff))*t);
  const b = Math.round((n1&0xff) + ((n2&0xff)-(n1&0xff))*t);
  return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

/* ───────────── Export (글로벌) ───────────── */
if (typeof window !== 'undefined') {
  window.CHEM_DATA = {
    ELEMENTS, ELEMENT_IDS, MINERALS, MINERAL_MAP,
    HATCHLINGS, JUVENILES, TEMPERAMENTS, SPECIALIZATIONS,
    EVOLUTION_CONFIG, BODY_SHAPES, PATTERNS, EYE_TYPES, APPENDAGES,
    TOTAL_MONSTERS, ACHIEVEMENTS, MINI_GAMES,
    getDominantElement, getSecondaryElement, getSubType,
    getTemperament, getSpecialization, getMonsterId, getMonsterName,
    shadeColor, lerpColor
  };
}

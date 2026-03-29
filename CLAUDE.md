# 프로젝트 공통 메모리

## 🎨 Unity UI 에셋 라이브러리

### 에셋 위치
`/Users/sky7_mac/Documents/000_homepage/shared-assets/unity-ui/`

### ⭐⭐⭐ 주력 에셋: GUI Pro - Casual Game (LAYERLAB) — 필수 사용!
> **사용자 강력 지시: "항상 이거 사용하도록!" — CSS로 UI를 만들지 말고 반드시 이 에셋의 스프라이트 PNG를 사용할 것**
> **모든 프로젝트에서 버튼, 프레임, 슬라이더, 라벨, 아이콘은 이 에셋 스프라이트를 먼저 적용하고, CSS는 보조 수단으로만 사용**

- **경로**: `shared-assets/unity-ui/gui-pro-casual-game/GUI Pro-CasualGame/`
- **PNG 수**: 1,360개
- **스타일**: 밝고 화려한 캐주얼 게임 UI, 파란 배경 기반, 라운드 버튼
- **핵심 컴포넌트 경로** (`ResourcesData/Sprites/Components/`):
  - `Button/` — 버튼 (10색상 × 3사이즈 + 원형/육각/사각 변형)
    - 색상: Blue, Green, Red, Orange, Purple, Sky, Yellow, Gray, White, BlueGray
    - 크기: 175, 195, 225
    - 특수: Hexagon199, Circle128, Circle147, Square01~06, TaperedDown/Left
  - `Frame/` — 프레임/패널 (BannerFrame, BasicFrame, BorderFrame, ChatFrame, PopupFrame, StageFrame 등)
  - `Popup/` — 팝업 배경 (Popup_Bg, Popup_Bg_Top, Popup_Close 등)
  - `Slider/` — HP바/진행바 (Level01~04, StageHorizontal, Wave)
  - `Label/` — 라벨/배지 (Label01~06 다양한 색상)
  - `IconMisc/` — 잡다 아이콘 (화살표, 체크, 별, 잠금 등)
  - `Icon_ItemIcons/` — 아이템 아이콘 (32/64/128/256/512px, 코인/젬/에너지 등)
  - `Icon_PictoIcons/` — 픽토 아이콘 (32/64/128/256/512px)
  - `Icon_RuneIcons/` — 룬 아이콘 (64/128/256/512px)
  - `Icon_ShopItems/` — 상점 아이템
  - `Icon_Clan/` — 클랜 아이콘
  - `Icon_Flag/` — 국기 아이콘
  - `UI_Etc/` — 기타 (InputField, ResourceBar, Switch, Toggle, UserInfo, Alert)
- **프리뷰 이미지**: `Preview/` 폴더에 64개 화면 예시
- **폰트**: LilitaOne-Regular (SDF Atlas, 다양한 크기)
- **파티클 텍스쳐**: `Particles/Texture/`

### GUI Pro - Fantasy RPG (LAYERLAB)
- **경로**: `shared-assets/unity-ui/gui-pro-fantasy-rpg/GUI Pro-FantasyRPG/`
- **PNG 수**: 4,511개 (가장 많음)
- **스타일**: 다크 판타지 RPG, 금테두리, 고급스러운 느낌
- **핵심 컴포넌트** (`ResourcesData/Sprites/Component/`):
  - `Button/`, `Frame/`, `Popup/`, `Slider/`, `Label-Title/`, `IconMisc/`
  - `Icon_EquipIcons/` — 장비 아이콘 (Shadow/NoShadow 변형, 32~512px)
  - `Icon_ItemIcons/`, `Icon_PictoIcons/`, `Icon_Flag/`
  - `Chest/` — 보물상자 아이콘
- **용도**: 판타지/RPG 테마 게임에 적합 (math-artillery 같은 판타지 게임)

### GUI Pro - Survival Clean (LAYERLAB)
- **경로**: `shared-assets/unity-ui/gui-pro-survival-clean/GUI Pro-SurvivalClean/`
- **PNG 수**: 1,573개
- **스타일**: 깔끔한 서바이벌/모던 UI
- **용도**: 모던/미니멀 테마에 적합

### Fantasy Wooden GUI Free (Black Hammer)
- **경로**: `shared-assets/unity-ui/fantasy-wooden-gui/`
- **PNG 수**: 26개
- **스타일**: 나무/양피지 텍스쳐의 판타지 UI
- **핵심 파일** (`normal_ui_set A/`):
  - TextBTN_Big/Medium/Cancel/New-Start (.png + _Pressed.png)
  - UI board Large/Medium/Small (Set, parchment, stone 변형)
  - IRONY TITLE Large/empty
  - Close Button, Division line, Exclamation 아이콘
  - notice.png
- **용도**: 판타지 게임의 나무 프레임/보드 배경

### Shift - Complete Sci-Fi UI (Michsky)
- **경로**: `shared-assets/unity-ui/shift-complete-sci-fi-ui/`
- **PNG 수**: 223개
- **스타일**: SF/사이버펑크 UI
- **용도**: SF 테마 프로젝트

---

## 🎮 에셋 활용 가이드

### math-artillery (수학 포병) 게임에 추천 에셋
- **카드 프레임**: Casual Game > `Frame/` (BasicFrame_Round12, BorderFrame 등)
- **FIRE 버튼**: Casual Game > `Button/Button01_225_Red.png` 또는 `Button_Hexagon199_Red.png`
- **HP바**: Casual Game > `Slider/Slider_Level01_*` 또는 Fantasy RPG > `Slider/`
- **수식 슬롯 프레임**: Casual Game > `Frame/BasicFrame_Square.png`
- **패널 배경**: Fantasy Wooden GUI > `UI board Large Set.png`
- **아이콘**: Casual Game > `Icon_PictoIcons/` (별, 검, 방패 등)
- **리소스바**: Casual Game > `UI_Etc/ResourceBar_*`

### 용사 타자기 게임에 추천 에셋
- **전체 UI**: Casual Game (밝고 화려한 스타일 → 키즈 타자기에 적합)
- **캐릭터 프레임**: Casual Game > `Frame/` + Fantasy RPG > `Frame/`
- **스테이지 진행바**: Casual Game > `Slider/Slider_StageHorizontal_*`
- **보상 팝업**: Casual Game > `Popup/` + `Label/`
- **아이템 아이콘**: Casual Game > `Icon_ItemIcons/` (코인, 젬, 에너지)

---

## 📦 에셋 원본 (Unity Asset Store 구매)
Unity 삭제 후에도 원본 .unitypackage 보관 위치:
`~/Library/Unity/Asset Store-5.x/` (Unity 삭제 시 같이 삭제될 수 있으므로 주의)

| 에셋명 | 제작자 | 타입 |
|--------|--------|------|
| GUI Pro - Casual Game | LAYERLAB | GUI Skins ⭐주력 |
| GUI Pro - Fantasy RPG | LAYERLAB | GUI Skins |
| GUI Pro - Survival Clean | LAYERLAB | GUI Skins |
| Fantasy Wooden GUI Free | Black Hammer | GUI Skins |
| Shift - Complete Sci-Fi UI | Michsky | GUI Skins |
| 2D Pixel Unit Maker - SPUM | soonsoon | 2D Characters |
| 2000 Faces | Unruly Games | 2D Characters |
| IsometricNaturePack | Artyom Zagorskiy | 2D Isometric Tiles |
| Hero Knight - Pixel Art | Sven Thole | 2D Characters |

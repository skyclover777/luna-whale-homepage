# Claude Chat + Midjourney 이미지 생성 가이드 (2026년 3월)

> **목적**: 이 가이드를 Claude Chat에 붙여넣으면, Claude가 미드저니 프롬프트를 생성하고
> 생성된 이미지를 올바른 위치에 배치하는 방법을 안내해줍니다.
>
> **절대 규칙**: HTML 슬라이드 파일(`pages/lessons/lesson-2026-03-*.html`)은 건들지 않습니다.
> 이미지 파일만 정해진 이름으로 정해진 폴더에 넣으면 자동 반영됩니다.

---

## 1. 현재 상태 요약

### 완성된 레슨 (L01~L12) - 건들지 마세요!

| 레슨 | 제목 | 레벨 | 상태 |
|-------|------|------|------|
| L01 | 내 몸으로 피워낸 작은 식물 | L1 (5~6세) | 이미지 전체 완성 |
| L02 | 땅속 비밀 기지 | L2 (7~9세) | 이미지 전체 완성 |
| L03 | 1cm 새싹의 시선 | L3 (9~13세) | 이미지 전체 완성 |
| L04 | 봄의 소리를 걸어보아요 | L1 (5~6세) | 이미지 전체 완성 |
| L05 | 불어서 만드는 봄의 선율 | L2 (7~9세) | 이미지 전체 완성 |
| L06 | 움직이는 칸딘스키 | L3 (9~13세) | 이미지 전체 완성 |
| L07 | 신비한 동물 사전 | L1 (5~6세) | 이미지 전체 완성 |
| L08 | 타이포그래피 디자이너 | L2 (7~9세) | 이미지 전체 완성 |
| L10 | 꼬마 인디언 추장 | L1 (5~6세) | 이미지 전체 완성 |
| L11 | 고양이 눈동자 우주 | L2 (7~9세) | 이미지 전체 완성 |
| L12 | 반반 투시 해부학 | L3 (9~13세) | 이미지 전체 완성 |

### 이미지 부족한 레슨 - 미드저니로 생성 필요!

| 레슨 | 제목 | 레벨 | 누락 이미지 |
|-------|------|------|------------|
| **L09** | 레트로 게임 디자이너: 8비트 픽셀 아트 로고 | L3 (9~13세) | step3, step4 (2장) |
| **L13** | 무지개 곤충 친구들 | L1 (5~6세) | cover, materials, step1~4, gal01~08 (14장) |
| **L14** | 땅속 비밀 기지: 거대한 씨앗 속 나의 방 | L3 보너스 (9~13세) | cover, materials, step1~4, gal01~08 (14장) |
| **L15** | 땅속 탐험대: 벌레들의 비밀 터널 | L1 (5~6세) | cover, materials, step1~4, gal01~08 (14장) |
| **L16** | 펼치면 팡! 보물찾기 팝업 지도 | L2 (7~9세) | cover, materials, step1~4, gal01~08 (14장) |
| **L17** | 숲의 수호신과 정령의 거처: 판타지 디오라마 | L3 (9~13세) | cover, materials, step1~4, gal01~08 (14장) |

**총 필요 이미지: 약 72장** (+ 갤러리 썸네일)

---

## 2. 이미지 배치 경로

```
/Users/sky7_mac/Documents/000_homepage/images/lessons/2026-03/
├── l{NN}-cover.jpg              ← 커버 슬라이드 배경 (16:9 가로형)
├── l{NN}-materials.jpg          ← 준비물 사진 (정사각~4:3)
├── l{NN}-step1.jpg              ← Step 1 과정 이미지 (16:9 가로형)
├── l{NN}-step2.jpg              ← Step 2
├── l{NN}-step3.jpg              ← Step 3
├── l{NN}-step4.jpg              ← Step 4
├── l{NN}-gal01.jpg ~ gal08.jpg  ← 갤러리 완성작 (정사각 1:1)
├── l{NN}.jpg                    ← 대표 이미지 (cover와 동일 가능)
└── thumbs/
    ├── l{NN}.jpg                ← 대표 썸네일 (400px)
    └── l{NN}-gal01.jpg ~ ...    ← 갤러리 썸네일 (400px)
```

### 파일명 규칙
- `NN`은 2자리 레슨번호: `09`, `13`, `14`, `15`, `16`, `17`
- 모든 이미지는 **JPG** 포맷 (quality 80)
- 갤러리 번호는 `01`부터 시작, 0-padded

---

## 3. 노션 참고 페이지

### 이미지 요청 목록 (미드저니 프롬프트 포함)
- **URL**: https://www.notion.so/321f575a017c811fac10ed416774f6ab
- **내용**: 5개 테마별 기본 프롬프트가 카테고리별로 정리됨
  - B1 = 입체 (L13, L15, L16, L17에 해당)

### 3월 전체 수업 개요
- **URL**: https://www.notion.so/2cff575a017c8159b112cd93823ba24d
- **내용**: 5개 테마의 수업 주제 및 교과 연계 정보

---

## 4. 레슨별 미드저니 프롬프트 가이드

### 공통 스타일 지침
- 아동 미술 수업 결과물 느낌 (children's art class, student artwork)
- 밝고 컬러풀한 톤 (bright, colorful, playful)
- 손으로 만든 느낌 (handcrafted, handmade feel)
- **커버/스텝**: `--ar 16:9` (가로형)
- **준비물**: `--ar 4:3` 또는 `--ar 3:2`
- **갤러리**: `--ar 1:1` (정사각형)
- **버전**: `--v 6.1` 이상

---

### L09 - 레트로 게임 디자이너: 8비트 픽셀 아트 로고 (step3, step4만 필요)

**수업 내용**: 9~13세 아이들이 모눈종이에 8비트 픽셀 스타일로 나만의 로고를 디자인하는 수업

- **Step 3**: 사인펜으로 한 칸 한 칸 정확하게 색을 채우는 단계 (4~6가지 색만 사용)
- **Step 4**: 네임펜으로 외곽선을 따고, 작품 옆에 로고 설명을 적어 완성하는 단계

#### 미드저니 프롬프트

**l09-step3.jpg** (색칠 단계):
```
A close-up of a child's hands carefully coloring grid paper with colored markers, filling each square one by one to create an 8-bit pixel art logo design, 4-6 bright colors used, graph paper on school desk, art class atmosphere, overhead view --ar 16:9 --v 6.1
```

**l09-step4.jpg** (완성 단계):
```
A completed 8-bit pixel art logo on grid paper, outlined with black fine-tip pen, with handwritten description next to it explaining the logo meaning, colorful retro game style design by a 12-year-old student, displayed on classroom desk --ar 16:9 --v 6.1
```

---

### L13 - 무지개 곤충 친구들 (전체 필요)

**수업 내용**: 5~6세 아이들이 색종이와 스티커로 무지개 색 곤충을 만드는 입체 조형 수업

**수업 과정**:
1. Step 1: 다양한 곤충 사진을 보며 특징을 관찰하고, 어떤 곤충을 만들지 정하기
2. Step 2: 도화지에 큰 날개를 그리고 무지개 색으로 칠하기
3. Step 3: 날개를 오리고 몸체, 더듬이, 다리를 붙여 곤충 형태 완성 (눈알 스티커, 뿅뿅이)
4. Step 4: 완성된 곤충에 이름을 붙이고 친구들에게 소개하기

#### 미드저니 프롬프트

**l13-cover.jpg** (커버):
```
A vibrant display of colorful rainbow paper insects made by kindergarten children, butterflies and beetles with bright rainbow wings, googly eyes and pipe cleaner antennae, hung on a colorful classroom wall, playful and cheerful atmosphere, children's art class exhibition --ar 16:9 --v 6.1
```

**l13-materials.jpg** (준비물):
```
Art supplies neatly arranged on a white table for a children's insect craft: colored construction paper in rainbow colors, safety scissors, glue sticks, googly eye stickers, pipe cleaners, pom poms, markers, top-down view, bright and organized --ar 4:3 --v 6.1
```

**l13-step1.jpg** (곤충 관찰):
```
A 5-year-old child looking at colorful insect pictures and reference cards on a classroom table, pointing at a butterfly picture with excitement, art supplies ready nearby, warm classroom setting, overhead angle --ar 16:9 --v 6.1
```

**l13-step2.jpg** (날개 색칠):
```
A young child's hands drawing and coloring large butterfly wings on white paper with bright rainbow colors, red orange yellow green blue purple, crayons and markers scattered around, kindergarten art class, close-up view --ar 16:9 --v 6.1
```

**l13-step3.jpg** (조립):
```
A child's hands assembling a paper insect craft, cutting out colorful rainbow wings and gluing them to a paper body, adding googly eyes and pipe cleaner antennae, craft materials on table, kindergarten art project in progress --ar 16:9 --v 6.1
```

**l13-step4.jpg** (완성 발표):
```
A group of happy kindergarten children holding up their completed rainbow paper insects, each insect unique with different colors and shapes, butterflies ladybugs and dragonflies, bright classroom setting, proud smiles --ar 16:9 --v 6.1
```

**l13-gal01~08** (갤러리 - 다양한 완성작):
```
A completed rainbow butterfly craft made by a 5-year-old child, colorful paper wings with red orange yellow green blue pattern, googly eyes, pipe cleaner antennae, displayed on white paper, children's art project --ar 1:1 --v 6.1
```
```
A cute paper ladybug craft by a young child, red and rainbow spotted wings, black paper body, googly eyes, green paper leaf underneath, kindergarten art class result --ar 1:1 --v 6.1
```
```
A colorful paper dragonfly craft, long body with four rainbow wings, glitter details, pipe cleaner body, made by a 5-year-old, displayed on pastel background --ar 1:1 --v 6.1
```
```
A rainbow caterpillar craft made from colored paper circles, each circle a different color, googly eyes on front, green pipe cleaner legs, kindergarten student artwork --ar 1:1 --v 6.1
```
```
A paper bee craft with yellow and rainbow striped body, white tissue paper wings, black pipe cleaner antennae, smiling face drawn with marker, child's handcraft --ar 1:1 --v 6.1
```
```
A whimsical paper beetle craft in rainbow colors, round body with spots, six paper legs, antennae from pipe cleaners, made by kindergarten child, bright and cheerful --ar 1:1 --v 6.1
```
```
A fantasy rainbow moth craft with large decorative wings, tissue paper and construction paper layers, glitter accents, googly eyes, young child's art project --ar 1:1 --v 6.1
```
```
A collection of three different rainbow insect crafts displayed together, butterfly beetle and dragonfly, each with unique colors and patterns, kindergarten art exhibition --ar 1:1 --v 6.1
```

---

### L14 - 땅속 비밀 기지: 거대한 씨앗 속 나의 방 (전체 필요)

**수업 내용**: 9~13세, 씨앗을 반으로 자른 단면에 상상의 방을 그리는 수업 (입체/상상화)

**수업 과정**:
1. Step 1: 씨앗 안이 나의 방이라면? 아이디어 스케치 (침대, 책상, 간식 창고...)
2. Step 2: 도화지에 큰 씨앗 윤곽 + 반으로 자른 단면 표현 + 방 구조 나누기
3. Step 3: 씨앗 방 안에 가구/소품을 세밀하게 그리기 (사다리, 싱크대 등)
4. Step 4: 안쪽은 밝고 화려하게, 바깥은 어둡고 차분하게 채색 (명도 대비)

#### 미드저니 프롬프트

**l14-cover.jpg**:
```
A magical cross-section illustration of a giant seed underground, inside reveals a cozy miniature room with tiny furniture bed desk and bookshelf, warm glowing light from inside contrasting dark soil outside, detailed children's illustration style, fantasy concept art --ar 16:9 --v 6.1
```

**l14-materials.jpg**:
```
Art supplies arranged on a desk for a drawing class: thick drawing paper, pencils, erasers, colored pencils, watercolor palette, fine-tip markers, reference images of seed cross-sections, top-down view, organized and inviting --ar 4:3 --v 6.1
```

**l14-step1.jpg** (아이디어 스케치):
```
A student's rough pencil sketch on paper showing brainstorming ideas for a room inside a seed, small thumbnail drawings of furniture items like bed desk lamp bookshelf, arrows and notes in Korean, creative planning phase, school desk background --ar 16:9 --v 6.1
```

**l14-step2.jpg** (씨앗 윤곽 + 단면):
```
A child drawing a large seed outline on paper, showing the cross-section with internal room structure sketched in pencil, dividing the inside into floor walls and ceiling, the seed shape dominates the paper, art class in progress --ar 16:9 --v 6.1
```

**l14-step3.jpg** (세밀 묘사):
```
A detailed close-up of a student's drawing showing the inside of a seed transformed into a cozy room, tiny furniture including a bed with blanket, a desk with lamp, a ladder leading up, bookshelf with tiny books, intricate details by a 12-year-old student --ar 16:9 --v 6.1
```

**l14-step4.jpg** (채색):
```
A finished student artwork of a seed cross-section room, the inside painted in bright warm colors with glowing yellow light, the outside soil painted in dark cool browns and greens, strong value contrast between interior and exterior, beautiful watercolor and colored pencil rendering --ar 16:9 --v 6.1
```

**l14-gal01~08** (갤러리):
```
A completed student artwork: cross-section of a walnut shell revealing a cozy bedroom inside, warm orange light, tiny ladder going up, dark brown exterior, watercolor illustration by a 12-year-old --ar 1:1 --v 6.1
```
```
A student drawing of an acorn cut in half showing a miniature kitchen inside, tiny stove and refrigerator, warm lighting, detailed colored pencil work, creative children's art --ar 1:1 --v 6.1
```
```
A seed cross-section illustration with a secret game room inside, tiny arcade machines and beanbag chairs, neon glow from inside, dark soil outside, student artwork --ar 1:1 --v 6.1
```
```
A chestnut shell opened to reveal a tiny library room, floor-to-ceiling bookshelves, reading nook with lamp, warm cozy atmosphere, children's fantasy illustration --ar 1:1 --v 6.1
```
```
A giant sunflower seed split open showing a science lab inside, test tubes and microscope, glowing green light, creative student artwork, watercolor style --ar 1:1 --v 6.1
```
```
A coconut cross-section with a tropical bedroom inside, hammock and surfboard, warm sunset light streaming in, creative student illustration --ar 1:1 --v 6.1
```
```
A pine cone opened to reveal a music room inside, tiny piano and guitar, musical notes floating, warm golden light, detailed student artwork --ar 1:1 --v 6.1
```
```
A peach pit cross-section showing a candy shop inside, shelves of tiny sweets, pink and pastel colors, whimsical children's fantasy illustration --ar 1:1 --v 6.1
```

---

### L15 - 땅속 탐험대: 벌레들의 비밀 터널 (전체 필요)

**수업 내용**: 5~6세, 지점토/종이로 땅속 벌레 터널 세계를 만드는 입체 조형 수업

**수업 과정**:
1. Step 1: 지점토를 던지고 손바닥으로 눌러 땅속 베이스 만들기
2. Step 2: 굵은 빨대로 동그란 구멍 터널을 만들고 손가락으로 넓히기
3. Step 3: 손가락 물감 도장으로 지문 애벌레, 색 클레이로 달팽이/벌레 빚기
4. Step 4: 나뭇잎/나뭇가지로 숲속 정원 꾸미고 역할놀이

#### 미드저니 프롬프트

**l15-cover.jpg**:
```
A colorful cross-section clay diorama of underground bug tunnels made by kindergarten children, winding tunnels with cute clay worms caterpillars and beetles inside, green garden on top with leaves and twigs, bright playful children's art project --ar 16:9 --v 6.1
```

**l15-materials.jpg**:
```
Art supplies for a clay bug tunnel project arranged on table: air-dry clay in earth colors, thick straws, finger paints in bright colors, small clay tools, googly eyes, real leaves and twigs, pom poms, top-down view --ar 4:3 --v 6.1
```

**l15-step1.jpg**:
```
A 5-year-old child's hands pressing and flattening brown air-dry clay on a work surface, making a flat base for underground tunnels, clay pieces scattered around, kindergarten art class, playful messy atmosphere --ar 16:9 --v 6.1
```

**l15-step2.jpg**:
```
A child poking thick straws into clay to make round tunnel holes, creating interconnected underground passages, fingers widening the tunnel openings, cross-section visible, kindergarten craft project in progress --ar 16:9 --v 6.1
```

**l15-step3.jpg**:
```
A child making fingerprint caterpillars with colorful finger paint on clay surface, small clay snails and worms nearby, bright colors pressed into brown clay base, fun sensory art activity for young children --ar 16:9 --v 6.1
```

**l15-step4.jpg**:
```
A completed underground bug tunnel diorama decorated with real leaves and twigs on top as a garden, cute clay bugs visible in tunnels below, a child doing puppet play with finger puppet worms, colorful kindergarten art project --ar 16:9 --v 6.1
```

**l15-gal01~08** (갤러리):
```
A finished clay underground tunnel artwork by a kindergarten child, brown clay base with colorful winding tunnels, bright fingerprint caterpillars and clay beetles inside, leaves on top, children's craft --ar 1:1 --v 6.1
```
```
A cross-section clay diorama showing ant tunnels underground, tiny clay ants carrying food, multiple connected chambers, made by a 5-year-old, playful and colorful --ar 1:1 --v 6.1
```
```
A clay bug world with rainbow worms in tunnels, green clay grass on surface, finger-painted flowers, bright and cheerful kindergarten art project --ar 1:1 --v 6.1
```
```
A child's clay sculpture of a snail family living in underground tunnels, spiral shell details, mushrooms growing on surface, adorable children's craft --ar 1:1 --v 6.1
```
```
A playful clay diorama of ladybugs in underground passages, red spotted bugs in brown clay tunnels, tiny eggs in a chamber, kindergarten art class result --ar 1:1 --v 6.1
```
```
A clay underground world with a big caterpillar in a tunnel, surrounded by roots and rocks, surface has flowers and grass, bright finger-painted colors --ar 1:1 --v 6.1
```
```
A whimsical clay beetle house underground, tiny furniture inside a round chamber, beetle family visible, roots hanging from ceiling, creative child's artwork --ar 1:1 --v 6.1
```
```
A collection of three clay bug tunnel projects displayed together on a table, each unique with different bugs and tunnel designs, kindergarten art exhibition --ar 1:1 --v 6.1
```

---

### L16 - 펼치면 팡! 보물찾기 팝업 지도 (전체 필요)

**수업 내용**: 7~9세, 종이 팝업 기법으로 우리 동네 보물 지도를 만드는 수업

**수업 과정**:
1. Step 1: 좋아하는 장소 3~5곳 정하고 우리 집 중심으로 스케치하기
2. Step 2: 장소를 크게 그리고 오려서 V자/L자 팝업 장치로 세우기
3. Step 3: 마스킹테이프와 마카로 길을 연결하고 안내문 적기
4. Step 4: 나무, 꽃, 사람을 그려 넣어 지도 꾸미고 발표하기

#### 미드저니 프롬프트

**l16-cover.jpg**:
```
A colorful pop-up book style neighborhood treasure map made by elementary school children, paper houses trees and landmarks popping up when opened, bright marker illustrations, dotted path lines connecting locations, playful and creative children's craft --ar 16:9 --v 6.1
```

**l16-materials.jpg**:
```
Craft supplies for a pop-up map project on a table: thick cardstock paper, colored markers and crayons, safety scissors, masking tape rolls, glue sticks, ruler, stickers, washi tape in various colors, top-down view, organized --ar 4:3 --v 6.1
```

**l16-step1.jpg**:
```
An 8-year-old child sketching a simple neighborhood map on paper, drawing their house in the center with favorite places around it like park school bakery, pencil sketch with arrows, planning stage, classroom desk --ar 16:9 --v 6.1
```

**l16-step2.jpg**:
```
A child's hands cutting out colorful paper buildings and folding V-shape and L-shape pop-up mechanisms, paper house standing up from a folded card base, scissors and cut paper pieces on desk, step-by-step pop-up craft --ar 16:9 --v 6.1
```

**l16-step3.jpg**:
```
A child connecting locations on a pop-up map with colorful masking tape roads, writing fun directions like arrows and labels with markers, washi tape paths between pop-up buildings, creative map making in progress --ar 16:9 --v 6.1
```

**l16-step4.jpg**:
```
A completed pop-up treasure map spread open showing colorful paper buildings popping up, trees flowers and tiny people added as decorations, a child proudly presenting their map to classmates, bright classroom setting --ar 16:9 --v 6.1
```

**l16-gal01~08** (갤러리):
```
A completed pop-up neighborhood map by an 8-year-old, colorful paper school building and park popping up, masking tape roads, hand-drawn trees and cars, creative children's craft project --ar 1:1 --v 6.1
```
```
A pop-up treasure map showing a child's house with garden, paper dog and cat figures, dotted trail to hidden treasure spot, bright marker colors, student artwork --ar 1:1 --v 6.1
```
```
A pop-up city map with paper skyscrapers and bridges popping up, colorful road system made with washi tape, tiny drawn people walking, creative student project --ar 1:1 --v 6.1
```
```
A pop-up park map with paper trees and playground equipment standing up, a pond with paper ducks, flowers around the edges, cheerful children's craft --ar 1:1 --v 6.1
```
```
A fantasy pop-up treasure island map, paper palm trees and pirate ship popping up, X marks the spot, wavy blue paper ocean, adventurous student artwork --ar 1:1 --v 6.1
```
```
A pop-up street map with paper bakery shop and ice cream store, awnings folding out, customers drawn walking in, colorful and detailed child's project --ar 1:1 --v 6.1
```
```
A pop-up zoo map with paper animal enclosures popping up, giraffe and elephant visible, winding visitor path, informational signs, creative student craft --ar 1:1 --v 6.1
```
```
Three different pop-up maps displayed together showing variety of student designs, each with unique locations and decorations, elementary school art exhibition --ar 1:1 --v 6.1
```

---

### L17 - 숲의 수호신과 정령의 거처: 판타지 디오라마 (전체 필요)

**수업 내용**: 9~13세, 상자 안에 판타지 숲 세계를 만드는 3D 디오라마 프로젝트

**수업 과정**:
1. Step 1: 세계관 설정서 작성 (수호신 모습, 능력, 정령 거처) + 썸네일 스케치
2. Step 2: 상자 안쪽 숲 배경 + 전경/중경/후경 레이어 세우기 (원근법)
3. Step 3: 클레이와 자연물로 수호신/정령 캐릭터 빚어 배치하기
4. Step 4: LED 불빛으로 신비로운 분위기 연출 + 제목 플레이트 완성

#### 미드저니 프롬프트

**l17-cover.jpg**:
```
A magical fantasy forest diorama inside a shoebox, layered paper trees creating depth, a majestic clay deer guardian spirit glowing in the center, tiny mushroom houses and fairy lights, handcrafted by a middle school student, dramatic moody lighting --ar 16:9 --v 6.1
```

**l17-materials.jpg**:
```
Art supplies for a fantasy diorama project: shoebox, colored cardstock, air-dry clay, small LED fairy lights, natural materials like twigs moss and stones, acrylic paints, hot glue gun, scissors, arranged on table, top-down view --ar 4:3 --v 6.1
```

**l17-step1.jpg** (세계관 설정):
```
A student's fantasy world design sheet, pencil sketches of a forest guardian spirit creature and small fairy characters, notes about their powers and home, thumbnail sketch of the diorama layout, creative planning document on school desk --ar 16:9 --v 6.1
```

**l17-step2.jpg** (배경 + 레이어):
```
A student building layers inside a shoebox diorama, painting forest background on the back wall, cutting and standing paper trees at different depths for foreground middle and background, creating 3D depth effect, art class in progress --ar 16:9 --v 6.1
```

**l17-step3.jpg** (캐릭터 제작):
```
Close-up of a student sculpting a fantasy deer guardian spirit from clay, using twigs for antlers and stones for body details, small fairy figures beside it, natural materials being incorporated into the sculpture, detailed handcraft --ar 16:9 --v 6.1
```

**l17-step4.jpg** (LED + 완성):
```
A completed fantasy forest diorama glowing with hidden LED lights, magical atmosphere with tiny fairy lights among paper trees, clay guardian spirit standing majestically, title plaque at the bottom, stunning student artwork displayed in dark room --ar 16:9 --v 6.1
```

**l17-gal01~08** (갤러리):
```
A completed forest guardian diorama by a 12-year-old, majestic clay deer with twig antlers standing in a paper forest, LED lights creating magical glow, moss and natural materials, stunning student artwork --ar 1:1 --v 6.1
```
```
A fantasy diorama with a dragon guardian spirit protecting a glowing mushroom village, clay figures, paper layered forest, fairy lights, creative middle school project --ar 1:1 --v 6.1
```
```
A mystical owl guardian diorama, clay owl perched on a real twig branch, paper moon backdrop, tiny clay forest spirits below, LED starlight effect, student artwork --ar 1:1 --v 6.1
```
```
A wolf guardian forest diorama, clay wolf figure surrounded by paper pine trees, waterfall made from clear film, LED blue lighting, atmospheric student project --ar 1:1 --v 6.1
```
```
A fairy garden diorama with tiny clay mushroom houses, flower petal roofs, moss pathways, LED warm lights inside houses, enchanted forest setting, detailed craft --ar 1:1 --v 6.1
```
```
A tree spirit diorama, large paper tree with a face carved in bark, tiny clay animals gathered around, autumn leaves scattered, warm LED glow, student artwork --ar 1:1 --v 6.1
```
```
A crystal cave diorama inside a shoebox, clay unicorn guardian, paper stalactites, LED purple and blue lights, glittering details, fantasy student project --ar 1:1 --v 6.1
```
```
Three fantasy diorama projects displayed side by side showing different guardian spirits and forest worlds, each with unique lighting and characters, middle school art exhibition --ar 1:1 --v 6.1
```

---

## 5. 미드저니 생성 후 이미지 배치 방법

### PNG → JPG 변환 (macOS 터미널)

```bash
# 1. 다운로드한 미드저니 이미지를 변환
TARGET="/Users/sky7_mac/Documents/000_homepage/images/lessons/2026-03"

# 커버 이미지 예시 (L13)
sips -s format jpeg -s formatOptions 80 ~/Downloads/midjourney_cover.png --out "$TARGET/l13-cover.jpg"

# 스텝 이미지
sips -s format jpeg -s formatOptions 80 ~/Downloads/midjourney_step1.png --out "$TARGET/l13-step1.jpg"

# 갤러리 이미지 + 썸네일 동시 생성
sips -s format jpeg -s formatOptions 80 ~/Downloads/midjourney_gal01.png --out "$TARGET/l13-gal01.jpg"
sips -Z 400 "$TARGET/l13-gal01.jpg" --out "$TARGET/thumbs/l13-gal01.jpg"

# 대표 이미지 (커버 복사)
cp "$TARGET/l13-cover.jpg" "$TARGET/l13.jpg"
sips -Z 400 "$TARGET/l13.jpg" --out "$TARGET/thumbs/l13.jpg"
```

### 일괄 변환 스크립트 (레슨 하나 전체)

```bash
#!/bin/bash
NN="13"  # 레슨 번호 변경
SRC=~/Downloads/midjourney_l${NN}  # 소스 폴더
TARGET="/Users/sky7_mac/Documents/000_homepage/images/lessons/2026-03"

# 커버
sips -s format jpeg -s formatOptions 80 "$SRC/cover.png" --out "$TARGET/l${NN}-cover.jpg"

# 준비물
sips -s format jpeg -s formatOptions 80 "$SRC/materials.png" --out "$TARGET/l${NN}-materials.jpg"

# 스텝 1~4
for s in 1 2 3 4; do
  sips -s format jpeg -s formatOptions 80 "$SRC/step${s}.png" --out "$TARGET/l${NN}-step${s}.jpg"
done

# 갤러리
i=1
for f in "$SRC"/gal*.png; do
  num=$(printf "%02d" $i)
  sips -s format jpeg -s formatOptions 80 "$f" --out "$TARGET/l${NN}-gal${num}.jpg"
  sips -Z 400 "$TARGET/l${NN}-gal${num}.jpg" --out "$TARGET/thumbs/l${NN}-gal${num}.jpg"
  i=$((i+1))
done

# 대표 이미지 + 썸네일
cp "$TARGET/l${NN}-cover.jpg" "$TARGET/l${NN}.jpg"
sips -Z 400 "$TARGET/l${NN}.jpg" --out "$TARGET/thumbs/l${NN}.jpg"

echo "L${NN} 이미지 배치 완료!"
```

---

## 6. 배포

```bash
cd /Users/sky7_mac/Documents/000_homepage
firebase deploy --only hosting
```

---

## 7. 체크리스트

각 레슨 이미지 생성 후 확인:

- [ ] **L09**: step3, step4 이미지 2장 배치
- [ ] **L13**: cover, materials, step1~4, gal01~08 + thumbs 배치
- [ ] **L14**: cover, materials, step1~4, gal01~08 + thumbs 배치
- [ ] **L15**: cover, materials, step1~4, gal01~08 + thumbs 배치
- [ ] **L16**: cover, materials, step1~4, gal01~08 + thumbs 배치
- [ ] **L17**: cover, materials, step1~4, gal01~08 + thumbs 배치
- [ ] 모든 이미지 JPG 포맷 확인
- [ ] thumbs 폴더 갤러리 썸네일 400px 확인
- [ ] HTML 파일 수정 안 했는지 확인
- [ ] `firebase deploy --only hosting` 배포
- [ ] 사이트에서 각 슬라이드 이미지 로딩 확인

---

## 부록: 썸네일 매핑 (classes-data.js)

> 주의: 카드 목록의 썸네일 번호와 레슨 번호가 다릅니다!
> classes-data.js의 thumbnail 필드가 가리키는 파일:

| 레슨 | thumbnail 파일 | 이미 있음? |
|-------|---------------|-----------|
| L13 | thumbs/l02.jpg | 있음 (별도 교체 불필요) |
| L14 | thumbs/l04.jpg | 있음 |
| L15 | thumbs/l06.jpg | 있음 |
| L16 | thumbs/l07.jpg | 있음 |
| L17 | thumbs/l08.jpg | 있음 |

> 카드 목록 썸네일은 이미 배치되어 있으므로, **슬라이드 내부 이미지만 생성**하면 됩니다.

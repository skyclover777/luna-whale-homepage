/* ═══════════════════════════════════════════════
   English Scene Talk — 35가지 전문분야별 영어회화
   각 장면 10~15개 대화
   ═══════════════════════════════════════════════ */

const sceneList = [
  // ─── 🎨 미술 수업 전용 (Art Class) ───
  { id: "artclass", name: "미술수업 시작", icon: "🖌️", color: "#FF6B6B" },
  { id: "artmaterials", name: "미술 재료", icon: "🎨", color: "#F6AD55" },
  { id: "arttechnique", name: "기법/드로잉", icon: "✏️", color: "#68D391" },
  { id: "colortheory", name: "색채 이론", icon: "🌈", color: "#B794F4" },
  { id: "artcritique", name: "작품 감상", icon: "🖼️", color: "#4FD1C5" },
  { id: "arthistory", name: "미술사/작가", icon: "🏛️", color: "#F6E05E" },
  // ─── 👧 아이들과 실전 대화 (Kids Conversations) ───
  { id: "artpraise", name: "칭찬/격려", icon: "⭐", color: "#F6E05E" },
  { id: "artcrafts", name: "공예/색칠", icon: "🖍️", color: "#FC8181" },
  { id: "artsharing", name: "재료 나누기", icon: "🤝", color: "#76E4F7" },
  { id: "artpresent", name: "작품 발표", icon: "🎤", color: "#9F7AEA" },
  { id: "artcleanup", name: "정리/뒷마무리", icon: "🧹", color: "#68D391" },
  { id: "artgame", name: "아트 게임", icon: "🎲", color: "#F6AD55" },
  // ─── 일반 씬 ───
  { id: "hospital", name: "병원", icon: "🏥", color: "#E53E3E" },
  { id: "school", name: "학교", icon: "🏫", color: "#3182CE" },
  { id: "restaurant", name: "식당", icon: "🍽️", color: "#DD6B20" },
  { id: "airport", name: "공항", icon: "✈️", color: "#805AD5" },
  { id: "hotel", name: "호텔", icon: "🏨", color: "#D69E2E" },
  { id: "shopping", name: "쇼핑몰", icon: "🛍️", color: "#ED64A6" },
  { id: "bank", name: "은행", icon: "🏦", color: "#2F855A" },
  { id: "cafe", name: "카페", icon: "☕", color: "#975A16" },
  { id: "taxi", name: "택시/교통", icon: "🚕", color: "#F6AD55" },
  { id: "postoffice", name: "우체국", icon: "📮", color: "#C53030" },
  { id: "pharmacy", name: "약국", icon: "💊", color: "#38A169" },
  { id: "office", name: "사무실", icon: "💼", color: "#4A5568" },
  { id: "interview", name: "면접", icon: "🎯", color: "#2B6CB0" },
  { id: "realestate", name: "부동산", icon: "🏠", color: "#744210" },
  { id: "police", name: "경찰서", icon: "🚔", color: "#1A365D" },
  { id: "salon", name: "미용실", icon: "💇", color: "#B83280" },
  { id: "gym", name: "헬스장", icon: "🏋️", color: "#C05621" },
  { id: "library", name: "도서관", icon: "📚", color: "#2C7A7B" },
  { id: "cinema", name: "영화관", icon: "🎬", color: "#6B46C1" },
  { id: "tourism", name: "관광", icon: "🗺️", color: "#2F855A" },
  // ─── 15개 추가 ───
  { id: "dentist", name: "치과", icon: "🦷", color: "#E2E8F0" },
  { id: "airplane", name: "비행기 안", icon: "🛩️", color: "#63B3ED" },
  { id: "embassy", name: "대사관/비자", icon: "🏛️", color: "#718096" },
  { id: "carrental", name: "렌터카", icon: "🚗", color: "#48BB78" },
  { id: "homerepair", name: "수리기사", icon: "🔧", color: "#A0AEC0" },
  { id: "gallery", name: "전시회/갤러리", icon: "🎨", color: "#D53F8C" },
  { id: "themepark", name: "놀이공원", icon: "🎢", color: "#F56565" },
  { id: "vet", name: "동물병원", icon: "🐕", color: "#68D391" },
  { id: "dmv", name: "운전면허", icon: "🚙", color: "#4299E1" },
  { id: "wedding", name: "결혼식", icon: "👰", color: "#FBD38D" },
  { id: "beach", name: "해변/리조트", icon: "🏖️", color: "#4FD1C5" },
  { id: "bakery", name: "베이커리", icon: "🍞", color: "#D69E2E" },
  { id: "camping", name: "캠핑장", icon: "🏕️", color: "#48BB78" },
  { id: "party", name: "파티", icon: "🎉", color: "#ED64A6" },
  { id: "dryclean", name: "세탁소", icon: "🧹", color: "#9F7AEA" }
];

const sceneData = {

  // ═══════════════════════════════════════════════════════
  //  🎨 미술 수업 전용 씬 (Art Class Scenes)
  // ═══════════════════════════════════════════════════════

  // ═══════════════════════════════════
  //  B1. 칭찬/격려 (Praise & Encouragement)
  // ═══════════════════════════════════
  artpraise: [
    { speaker: "Wow, I love the colors you chose! How did you decide on them?", correct: "I wanted it to feel warm, so I used lots of red and orange!", wrong1: "I don't know.", wrong2: "I just picked them." },
    { speaker: "Your drawing is so detailed! How long did it take you?", correct: "About 20 minutes! I worked really hard on the eyes.", wrong1: "A long time.", wrong2: "I drew it fast." },
    { speaker: "I can see you worked really hard on this. I'm proud of you!", correct: "Thank you! I kept trying even when it was difficult.", wrong1: "It was easy.", wrong2: "Thanks." },
    { speaker: "This is so creative! Did you come up with this idea yourself?", correct: "Yes! I imagined a sky with two moons and a rainbow river.", wrong1: "No.", wrong2: "I copied it." },
    { speaker: "Your lines are so steady and confident today!", correct: "I practiced holding the brush differently — it really helped!", wrong1: "I know.", wrong2: "They look fine." },
    { speaker: "I really like how you mixed these two colors together.", correct: "I found that blue and yellow make this cool sea-green color!", wrong1: "I mixed them.", wrong2: "It was an accident." },
    { speaker: "You didn't give up when it got hard — that's amazing!", correct: "I wanted to finish it properly. I'm glad I didn't stop!", wrong1: "It wasn't that hard.", wrong2: "I almost gave up." },
    { speaker: "This is the best painting you've done all month!", correct: "Really? I felt more relaxed today, so I think that helped.", wrong1: "I know, it's great.", wrong2: "Is it really?" },
    { speaker: "You have such a good eye for detail — look at this texture!", correct: "I used a dry brush technique. I learned it from last week's class!", wrong1: "I just painted.", wrong2: "It was easy to do." },
    { speaker: "I love how you used the whole canvas. Nothing feels empty!", correct: "My teacher said to think about the background too, so I did!", wrong1: "I just filled it in.", wrong2: "I wasn't sure what to paint there." },
    { speaker: "Your artwork tells such a wonderful story. Can you tell me about it?", correct: "It's a girl who finds a secret garden hidden behind a waterfall!", wrong1: "It's just a painting.", wrong2: "I don't know what it is." },
    { speaker: "You helped your classmate with their painting. That was so kind!", correct: "She didn't know how to make brown, so I showed her how to mix colors.", wrong1: "It was nothing.", wrong2: "I just showed her." },
  ],

  // ═══════════════════════════════════
  //  B2. 공예/색칠 (Crafts & Coloring)
  // ═══════════════════════════════════
  artcrafts: [
    { speaker: "What are we making today?", correct: "Today we're making a collage with torn paper and glue — it's going to look like a mosaic!", wrong1: "Something with paint.", wrong2: "I don't know." },
    { speaker: "How do I fold the paper to make a boat?", correct: "First, fold it in half this way, then fold the top corners down to meet in the middle.", wrong1: "Just fold it.", wrong2: "I can't do it." },
    { speaker: "My glue isn't sticking. What should I do?", correct: "Make sure the surface is clean and dry, then press it firmly for a few seconds.", wrong1: "Add more glue.", wrong2: "It's broken." },
    { speaker: "Can I use glitter on my project?", correct: "Yes! Apply glue first, then sprinkle the glitter and shake off the extra.", wrong1: "I don't know.", wrong2: "Just pour it on." },
    { speaker: "Which crayon should I use for skin color?", correct: "Try mixing peach and light brown — everyone's skin is a different beautiful shade!", wrong1: "The pink one.", wrong2: "I'll use orange." },
    { speaker: "I ripped the paper by accident. What now?", correct: "That's okay! You can layer another piece over it, or use the torn edge as part of the design.", wrong1: "Start over.", wrong2: "It's ruined." },
    { speaker: "Can we use scissors to cut the clay?", correct: "A plastic or wooden clay cutter works better — scissors can damage the blade and squish the clay.", wrong1: "Yes, scissors are fine.", wrong2: "I don't know." },
    { speaker: "My painting looks too light. How do I make the colors stronger?", correct: "Let the first coat dry completely, then add another layer of color on top.", wrong1: "Add more water.", wrong2: "Use a bigger brush." },
    { speaker: "What colors do I need to color this flower realistically?", correct: "Look at the reference photo — you'll see at least three or four shades, from the bright tips to the dark center.", wrong1: "Just use red.", wrong2: "One color is enough." },
    { speaker: "Can I take my craft home today?", correct: "Let's make sure it's completely dry first — if it's still wet, it might get ruined in your bag.", wrong1: "Yes, take it now.", wrong2: "No, leave it here." },
    { speaker: "I don't like how it looks. Can I start over?", correct: "Let's try to fix it first — sometimes a little change can make it look totally different and much better!", wrong1: "Yes, throw it away.", wrong2: "No, it looks fine." },
    { speaker: "My scissors won't cut straight. Any tips?", correct: "Try cutting slowly and turning the paper instead of the scissors — guide the paper toward the blade.", wrong1: "Cut faster.", wrong2: "Use a different pair." },
  ],

  // ═══════════════════════════════════
  //  B3. 재료 나누기/소통 (Sharing Materials)
  // ═══════════════════════════════════
  artsharing: [
    { speaker: "Can I borrow your red paint? I ran out.", correct: "Sure! Just put a small amount on your palette so we both have enough.", wrong1: "No, it's mine.", wrong2: "Take it all." },
    { speaker: "Could you pass me the scissors, please?", correct: "Here you go! Are you almost done? I'll need them back in a few minutes.", wrong1: "Get them yourself.", wrong2: "I'm still using them." },
    { speaker: "I can't reach the water cup. Can you help?", correct: "Of course! Here it is. Should I refill it? The water looks a bit dirty.", wrong1: "That's too bad.", wrong2: "I can't reach either." },
    { speaker: "Do you want to share the big canvas with me?", correct: "Great idea! You can paint the left half and I'll do the right half — let's make it connect in the middle!", wrong1: "I want my own.", wrong2: "Okay, but I get more space." },
    { speaker: "I don't have a pencil. Can anyone lend me one?", correct: "I have a spare! Here — it's already sharpened, so be careful not to press too hard.", wrong1: "I have one but no.", wrong2: "Ask the teacher." },
    { speaker: "Can we use the same glue stick at the same time?", correct: "Let's take turns — you use it first, and I'll wait. I'll start cutting my shapes while you glue.", wrong1: "No, I need it.", wrong2: "Just share it at the same time." },
    { speaker: "Someone took my blue marker! Did you see it?", correct: "Oh, I think I accidentally picked it up — sorry! Here it is, and you can use my purple in exchange.", wrong1: "I don't know.", wrong2: "Maybe you lost it." },
    { speaker: "We only have one eraser for the whole table. How should we share?", correct: "Let's pass it around — whoever needs it raises their hand and we take turns.", wrong1: "First come, first served.", wrong2: "I'll keep it." },
    { speaker: "Can I see how you did that? Your leaves look so real!", correct: "Sure! I used the side of the crayon and rubbed gently — I can show you step by step.", wrong1: "I'll tell you later.", wrong2: "I made it up." },
    { speaker: "You're using a technique I've never seen. Where did you learn that?", correct: "My grandma taught me! It's called sgraffito — you scratch through one paint layer to reveal the color underneath.", wrong1: "I invented it.", wrong2: "I don't know its name." },
    { speaker: "Can we work together on this mural?", correct: "Yes! Let's plan it first so our parts fit together — who wants to paint the sky and who wants the ground?", wrong1: "I'll do mine alone.", wrong2: "Okay, but I go first." },
    { speaker: "The paint table is getting messy. Can we clean it up together?", correct: "Sure! I'll wipe the table and you put the caps back on the paint tubes.", wrong1: "You do it.", wrong2: "It's not my mess." },
  ],

  // ═══════════════════════════════════
  //  B4. 작품 발표 (Presenting Artwork)
  // ═══════════════════════════════════
  artpresent: [
    { speaker: "Can you tell us about your painting?", correct: "Sure! I painted a rainy day in a forest. I used dark greens and blues to show how quiet and peaceful it feels.", wrong1: "It's just a painting.", wrong2: "I don't know what to say." },
    { speaker: "What was the most challenging part?", correct: "Getting the reflections in the puddles right — I had to flip the colors and make them blurry at the edges.", wrong1: "Everything was hard.", wrong2: "Nothing was hard." },
    { speaker: "What would you do differently if you could start again?", correct: "I'd add more texture to the tree bark using a palette knife instead of a regular brush.", wrong1: "Nothing, I like it.", wrong2: "I'd paint something else." },
    { speaker: "What does your artwork mean to you personally?", correct: "It reminds me of walks with my dog in the park — I wanted to capture that peaceful, happy feeling.", wrong1: "Nothing special.", wrong2: "I just made it for class." },
    { speaker: "Which part of this are you most proud of?", correct: "The sky! I blended four colors — pink, orange, purple, and dark blue — to make a sunset gradient.", wrong1: "All of it.", wrong2: "I'm not sure." },
    { speaker: "What inspired you to choose this subject?", correct: "I saw a photo of the Northern Lights and wanted to try to capture those magical moving colors.", wrong1: "Nothing, I just picked it.", wrong2: "The teacher chose it." },
    { speaker: "How long did it take you to finish?", correct: "About three hours total — I worked on it across two sessions and let each layer dry in between.", wrong1: "I don't know.", wrong2: "A long time." },
    { speaker: "Can you explain your color choices?", correct: "I used complementary colors — the orange flowers pop against the blue background because they contrast strongly.", wrong1: "I liked those colors.", wrong2: "I used what was available." },
    { speaker: "What technique did you use for the background?", correct: "I did a wet-on-wet wash — I wet the whole paper first, then dropped in paint so the colors blended on their own.", wrong1: "I just painted it.", wrong2: "I pressed hard." },
    { speaker: "Do you have a title for your artwork?", correct: "Yes — I called it 'The Last Summer Day.' It's about holding onto something beautiful before it disappears.", wrong1: "No title.", wrong2: "I don't know." },
    { speaker: "What feedback would you like from your classmates?", correct: "I'd love to know if the mood comes through — does it feel peaceful to you, or does it feel something else?", wrong1: "Tell me if it's good.", wrong2: "I don't need feedback." },
    { speaker: "Is there anything you want to add to your artwork?", correct: "Maybe a small bird flying in the top corner — to add movement and balance to the composition.", wrong1: "Nothing more.", wrong2: "Yes, but I don't know what." },
  ],

  // ═══════════════════════════════════
  //  B5. 정리/뒷마무리 (Cleanup & Wrap-up)
  // ═══════════════════════════════════
  artcleanup: [
    { speaker: "Time to clean up! What should we do first?", correct: "Cap all the paint tubes and put the brushes in the water to soak — that makes them easier to clean.", wrong1: "Pack our bags.", wrong2: "Wait for the teacher." },
    { speaker: "How do I clean my brushes properly?", correct: "Rinse them in clean water, reshape the bristles gently, and lay them flat or stand them up to dry.", wrong1: "Just shake them in water.", wrong2: "Leave them in the jar." },
    { speaker: "There's paint on the table. How do we clean it?", correct: "Use a damp paper towel to wipe it up while it's still wet — dried paint is much harder to remove!", wrong1: "Leave it for later.", wrong2: "Use a dry cloth." },
    { speaker: "Where should I put my finished painting?", correct: "Place it flat on the drying rack with your name facing up so no one picks up the wrong one.", wrong1: "Just leave it on the table.", wrong2: "Take it home now." },
    { speaker: "The palettes are still messy. What's the best way to clean them?", correct: "Scrape off the dried paint with a palette knife, then wash with warm soapy water and a soft sponge.", wrong1: "Rinse with cold water.", wrong2: "Leave them to dry." },
    { speaker: "Should we pour leftover paint down the drain?", correct: "No — let it dry in the palette and peel it off later, or check if there's a special disposal bin for paint.", wrong1: "Yes, it's fine.", wrong2: "I don't know." },
    { speaker: "My apron is covered in paint. Is that okay?", correct: "That's completely normal — aprons are for protecting your clothes! Hang it up to dry when you're done.", wrong1: "Oh no, it's ruined.", wrong2: "I should wash it now." },
    { speaker: "How do we store the clay so it doesn't dry out?", correct: "Wrap it tightly in plastic wrap, then put it in an airtight container — air makes clay dry out and crack.", wrong1: "Leave it on the table.", wrong2: "Put it back in the box." },
    { speaker: "What should I do with my reference photos?", correct: "File them in your art folder or take a photo with your phone — you might want to reference them for a future project.", wrong1: "Throw them away.", wrong2: "Leave them here." },
    { speaker: "Before you go, what did you learn today?", correct: "I learned how to blend colors smoothly by using a dry brush technique after the first wet layer.", wrong1: "I painted something.", wrong2: "I'm not sure." },
    { speaker: "What will we be working on next time?", correct: "We're going to start oil pastels — could you bring an old cloth or paper towel to blend with?", wrong1: "I don't know.", wrong2: "The same thing?" },
    { speaker: "Can you help me put the paints back in order?", correct: "Sure! Let's sort them by color — warm colors on one side and cool colors on the other.", wrong1: "You do it.", wrong2: "Just put them anywhere." },
  ],

  // ═══════════════════════════════════
  //  B6. 아트 게임/활동 (Art Games & Activities)
  // ═══════════════════════════════════
  artgame: [
    { speaker: "We're playing 'Guess the artist!' I'll describe the style — who is it?", correct: "Is it Van Gogh? The swirling sky and the thick, energetic brushstrokes sound exactly like 'Starry Night'!", wrong1: "I don't know.", wrong2: "Is it Picasso?" },
    { speaker: "For today's game, draw something in 60 seconds. Ready?", correct: "Go! I'll sketch the basic shapes first and add details after — I need to work fast!", wrong1: "That's too fast.", wrong2: "I'm not ready." },
    { speaker: "I'm thinking of a color. It's warm, it's the color of the sun — what is it?", correct: "Yellow! Or maybe orange? Those are both warm and sunny colors.", wrong1: "Blue!", wrong2: "Green!" },
    { speaker: "Let's play 'Add a line.' I'll start — your turn to add something!", correct: "I'll add a curvy river flowing from your mountain — now it looks like a landscape!", wrong1: "I pass.", wrong2: "I don't know what to add." },
    { speaker: "Who can name an art tool starting with the letter B?", correct: "Brush! Also brayer, blending stump, and burnisher all start with B!", wrong1: "Blue.", wrong2: "Bowl." },
    { speaker: "Can you draw an emotion without using any faces or words?", correct: "I'll draw sharp, jagged red and black lines shooting outward — that looks like anger or energy!", wrong1: "That's impossible.", wrong2: "I'll draw a sad face then." },
    { speaker: "In today's challenge, you can only use three colors. Which three do you pick?", correct: "Black, white, and red — with just those I can create strong contrast and really dramatic compositions.", wrong1: "All the bright ones.", wrong2: "My favorite ones." },
    { speaker: "Let's do a blind contour drawing — keep your eyes on the object, not the paper!", correct: "This is so tricky but fun — my hand is moving without looking and the line feels like it's alive!", wrong1: "I'll peek a little.", wrong2: "This is impossible." },
    { speaker: "Who can name a famous painting that has water in it?", correct: "Monet's 'Water Lilies'! And also 'The Great Wave' by Hokusai — that one's dramatic!", wrong1: "The Mona Lisa?", wrong2: "I don't know any." },
    { speaker: "For this round, paint with a tool other than a brush — be creative!", correct: "I'm going to try painting with a crumpled ball of plastic wrap — it makes amazing texture!", wrong1: "I'll use my finger.", wrong2: "Can I still use a brush?" },
    { speaker: "Let's vote — which artwork best shows the theme 'happiness'?", correct: "I vote for this one — the bright yellows and the upward brushstrokes make it feel joyful and light.", wrong1: "The colorful one.", wrong2: "I don't want to vote." },
    { speaker: "Final challenge — make art using only dots. No lines allowed!", correct: "Like Pointillism! Seurat did this — up close it's all dots, but from far away it forms a whole image!", wrong1: "That's too hard.", wrong2: "Can I use small lines?" },
  ],

  // ═══════════════════════════════════
  //  A1. 미술수업 시작 (Art Class)
  // ═══════════════════════════════════
  artclass: [
    { speaker: "Good morning, everyone! Are you ready to start today's class?", correct: "Yes! What are we going to make today?", wrong1: "I'm tired.", wrong2: "Can we go home?" },
    { speaker: "Today we're going to paint with watercolors.", correct: "Oh, I love watercolors! Do we need to wet the paper first?", wrong1: "I don't like watercolors.", wrong2: "What's watercolor?" },
    { speaker: "Please put on your apron before we begin.", correct: "Good idea! I don't want to get paint on my clothes.", wrong1: "I don't want to wear it.", wrong2: "I forgot my apron." },
    { speaker: "First, let's look at today's reference image.", correct: "Wow, it's so beautiful! Are we going to copy this exactly?", wrong1: "I can't draw like that.", wrong2: "This is too hard." },
    { speaker: "Don't worry about making mistakes — just have fun!", correct: "That's a relief! I'll try my best and enjoy the process.", wrong1: "I always make mistakes.", wrong2: "I'm nervous." },
    { speaker: "Can everyone see the board from where you're sitting?", correct: "I can't see very well from here. Can I move to the front?", wrong1: "Yes.", wrong2: "No." },
    { speaker: "Today's theme is 'seasons.' Which season inspires you?", correct: "I love autumn! I want to paint golden leaves falling from the trees.", wrong1: "Summer.", wrong2: "I don't know." },
    { speaker: "Let's start with a light pencil sketch before adding paint.", correct: "Should I press hard or just sketch lightly?", wrong1: "Can I skip the sketch?", wrong2: "I don't want to draw." },
    { speaker: "Take your time and look closely at the shapes and colors.", correct: "I see so many shades — should I mix them or use them straight from the tube?", wrong1: "Okay.", wrong2: "I'm looking." },
    { speaker: "Class is almost over. Start wrapping up your painting.", correct: "Can I take it home today, or does it need to dry first?", wrong1: "Already?", wrong2: "I'm not done." },
    { speaker: "Would you like to share your work with the class?", correct: "Sure! I painted a sunset over the ocean — I mixed orange and pink.", wrong1: "No thanks.", wrong2: "Mine isn't good enough." },
    { speaker: "Remember to clean your brushes before you leave.", correct: "Should I use soap and water, or just rinse them?", wrong1: "I'll do it later.", wrong2: "I forgot." },
  ],

  // ═══════════════════════════════════
  //  A2. 미술 재료 (Art Materials)
  // ═══════════════════════════════════
  artmaterials: [
    { speaker: "Which brush should I use for fine details?", correct: "Use the round tip brush — the thinnest one in your set.", wrong1: "Any brush is fine.", wrong2: "I don't have one." },
    { speaker: "My paint is too thick. What should I do?", correct: "Add a small amount of water and mix it on your palette until it flows smoothly.", wrong1: "Just press harder.", wrong2: "Get a new one." },
    { speaker: "What's the difference between oil paint and acrylic paint?", correct: "Oil takes days to dry and blends beautifully, while acrylic dries in minutes and is easy to clean up.", wrong1: "They're the same.", wrong2: "I don't know." },
    { speaker: "Can I use regular paper for watercolor?", correct: "It's better to use watercolor paper — it's thicker and won't warp when it gets wet.", wrong1: "Yes, any paper is fine.", wrong2: "I'll use my notebook." },
    { speaker: "How do I stop the paint from bleeding?", correct: "Wait for each layer to dry completely before adding the next one.", wrong1: "Paint faster.", wrong2: "Press harder." },
    { speaker: "What is gesso used for?", correct: "Gesso is a primer that prepares canvas for painting — it creates a smooth, absorbent surface.", wrong1: "It's a type of paint.", wrong2: "I don't know." },
    { speaker: "My canvas is too slippery. What's wrong?", correct: "It might not have been primed — try applying a coat of gesso and letting it dry first.", wrong1: "Add more paint.", wrong2: "Just paint over it." },
    { speaker: "Which colors do I mix to make purple?", correct: "Mix red and blue together. For a cooler purple, use more blue; for a warmer one, use more red.", wrong1: "Purple is already in the set.", wrong2: "I don't know." },
    { speaker: "How do I clean oil paint off my brush?", correct: "Use mineral spirits or odorless turpentine, then wash with soap and warm water.", wrong1: "Use regular water.", wrong2: "Leave it to dry." },
    { speaker: "What's the best way to store my brushes?", correct: "Store them upright in a jar or flat — never leave them bristle-down in water, or they'll bend.", wrong1: "Just throw them in a bag.", wrong2: "It doesn't matter." },
    { speaker: "Do I need a fixative for my pastel drawing?", correct: "Yes! Spray a light coat of fixative to keep the pastel from smudging. Hold it about 30 cm away.", wrong1: "No, pastels don't smear.", wrong2: "What's a fixative?" },
    { speaker: "What type of pencil is best for sketching?", correct: "An HB or 2B pencil is great for sketching — B pencils are softer and give darker lines.", wrong1: "Any pencil works.", wrong2: "Use a pen." },
  ],

  // ═══════════════════════════════════
  //  A3. 기법/드로잉 (Techniques & Drawing)
  // ═══════════════════════════════════
  arttechnique: [
    { speaker: "How do I paint a smooth gradient from dark to light?", correct: "Start with your darkest value and gradually add more water or white as you move across.", wrong1: "Just mix them together.", wrong2: "Use different brushes." },
    { speaker: "My lines are shaky when I draw. Any tips?", correct: "Try resting your wrist on the table and drawing from your shoulder for smoother, longer strokes.", wrong1: "Practice more.", wrong2: "Use a ruler." },
    { speaker: "What is the wet-on-wet watercolor technique?", correct: "You paint onto paper that's already wet — the colors spread and blend softly into each other.", wrong1: "Mixing colors on the palette.", wrong2: "Painting with a wet brush." },
    { speaker: "How do I create texture in my painting?", correct: "You can use a palette knife, a crumpled plastic wrap, or a dry brush technique to build texture.", wrong1: "Just paint thickly.", wrong2: "Add more water." },
    { speaker: "Can you explain chiaroscuro?", correct: "It's an Italian technique using strong contrasts between light and shadow to create a 3D effect — like in Caravaggio's paintings.", wrong1: "It means colorful.", wrong2: "It's a type of brush." },
    { speaker: "How do I paint realistic skin tones?", correct: "Mix a base of yellow ochre, white, and a tiny bit of red or burnt sienna, then adjust warm and cool tones for shadows.", wrong1: "Use pink paint.", wrong2: "Mix red and white." },
    { speaker: "What does 'negative space' mean in drawing?", correct: "It's the space around and between the subject — paying attention to it helps you see shapes more accurately.", wrong1: "The empty part of the canvas.", wrong2: "Dark areas in a painting." },
    { speaker: "How do I paint a realistic sky?", correct: "Use a wet wash of cerulean blue, add more pigment at the top, and soften toward the horizon. Add warm yellows near the light source.", wrong1: "Just use blue paint.", wrong2: "Mix blue and white." },
    { speaker: "What's the difference between hatching and cross-hatching?", correct: "Hatching uses parallel lines to show shade, while cross-hatching layers lines in different directions for deeper shadows.", wrong1: "They're the same.", wrong2: "I don't know." },
    { speaker: "How do I get a sharp edge in watercolor?", correct: "Let the area dry completely first, then paint carefully along the edge — or use masking tape or masking fluid.", wrong1: "Just be careful.", wrong2: "Press the brush harder." },
    { speaker: "My painting looks flat. How do I add depth?", correct: "Layer darks and lights, overlap objects, and use atmospheric perspective — making distant things lighter and less detailed.", wrong1: "Add more colors.", wrong2: "Paint bigger." },
    { speaker: "What is impasto technique?", correct: "It's applying thick paint with a palette knife or brush so the paint stands up from the canvas — like Van Gogh's style!", wrong1: "Painting very fast.", wrong2: "Mixing lots of colors." },
  ],

  // ═══════════════════════════════════
  //  A4. 색채 이론 (Color Theory)
  // ═══════════════════════════════════
  colortheory: [
    { speaker: "What are the three primary colors?", correct: "Red, yellow, and blue — you can't make them by mixing other colors, but you can mix them to make all other colors.", wrong1: "Red, green, and blue.", wrong2: "Orange, purple, and green." },
    { speaker: "What do you get when you mix blue and yellow?", correct: "You get green! Mixing equal amounts makes a balanced green, or you can add more of one to shift the tone.", wrong1: "You get purple.", wrong2: "You get orange." },
    { speaker: "What are complementary colors?", correct: "They're colors opposite each other on the color wheel — like red and green, or blue and orange. They create vibrant contrast.", wrong1: "Colors that look similar.", wrong2: "Warm and cool colors." },
    { speaker: "What's the difference between warm and cool colors?", correct: "Warm colors — reds, oranges, yellows — feel energetic and advance visually. Cool colors — blues, greens, purples — feel calm and recede.", wrong1: "Warm colors are bright.", wrong2: "Cool colors are dark." },
    { speaker: "How do I make a color look brighter?", correct: "Place it next to its complementary color — the contrast makes both colors pop more vibrantly.", wrong1: "Add white to it.", wrong2: "Paint a bigger area." },
    { speaker: "What is the difference between hue, saturation, and value?", correct: "Hue is the color name, saturation is how vivid or muted it is, and value is how light or dark it is.", wrong1: "They all mean the same thing.", wrong2: "Hue is brightness, saturation is the color." },
    { speaker: "How do I mix a neutral gray without it looking greenish?", correct: "Mix complementary colors like red and green, or blue and orange — they cancel each other out to make a rich neutral.", wrong1: "Mix black and white.", wrong2: "Add more white." },
    { speaker: "What is a monochromatic color scheme?", correct: "It uses only one hue in different values and saturations — like a painting done entirely in shades of blue.", wrong1: "Using many different colors.", wrong2: "Only black and white." },
    { speaker: "Why does my shadow look muddy when I mix colors?", correct: "Muddy shadows happen when you mix too many colors. Use the complement of the light source color instead — like orange light casts blue-purple shadows.", wrong1: "You used too much paint.", wrong2: "Add more black." },
    { speaker: "Can you explain analogous colors?", correct: "They're colors next to each other on the color wheel — like red, red-orange, and orange. They create harmonious, peaceful compositions.", wrong1: "Colors that are very different.", wrong2: "Black, white, and gray." },
    { speaker: "Should I use black or dark colors to make shadows?", correct: "Professional artists rarely use pure black — instead, use a dark mix of complementary colors or ultramarine blue with burnt sienna for rich shadows.", wrong1: "Yes, always use black.", wrong2: "Add water to darken it." },
  ],

  // ═══════════════════════════════════
  //  A5. 작품 감상/비평 (Art Critique)
  // ═══════════════════════════════════
  artcritique: [
    { speaker: "What do you notice first when you look at this painting?", correct: "My eyes go straight to the bright red figure in the center — it really draws your attention!", wrong1: "It's a painting.", wrong2: "There are many colors." },
    { speaker: "How does this artwork make you feel?", correct: "It feels melancholy and lonely — the muted colors and the isolated figure give it a quiet, sad mood.", wrong1: "It's nice.", wrong2: "I don't know." },
    { speaker: "What elements of design can you identify in this piece?", correct: "I can see strong diagonal lines, a limited warm color palette, and interesting asymmetrical balance.", wrong1: "Colors and shapes.", wrong2: "It has lines and dots." },
    { speaker: "Do you think this artwork is successful? Why?", correct: "Yes — the artist uses light and shadow masterfully to guide our eye through the composition.", wrong1: "Yes, it's pretty.", wrong2: "No, it's weird." },
    { speaker: "What do you think the artist was trying to express?", correct: "I think the artist was exploring isolation and longing — the empty space around the figure feels very intentional.", wrong1: "I don't know.", wrong2: "They wanted to paint something." },
    { speaker: "Compare this painting to the one next to it. What's different?", correct: "This one uses heavy impasto with dark, earthy tones, while the other is delicate and transparent with a soft watercolor palette.", wrong1: "They're different colors.", wrong2: "One is bigger." },
    { speaker: "Is there a focal point in this composition?", correct: "Yes — the bright light falling on the woman's face draws your eye there immediately, while everything else is darker.", wrong1: "The whole thing is the focus.", wrong2: "I'm not sure." },
    { speaker: "What period or style does this remind you of?", correct: "The dreamlike imagery and distorted proportions remind me of Surrealism — it could almost be Salvador Dalí.", wrong1: "Old style.", wrong2: "Modern art." },
    { speaker: "How would you improve this artwork if you could?", correct: "I might add more contrast in the shadows to push the depth, and loosen up the brushwork in the background.", wrong1: "Make it bigger.", wrong2: "Add more color." },
    { speaker: "What kind of story does this painting tell?", correct: "It looks like a moment of farewell — the two figures are turning away from each other, as if saying goodbye.", wrong1: "A happy story.", wrong2: "A story about nature." },
    { speaker: "What's the mood created by the color palette?", correct: "The deep blues and purples create a mysterious, nocturnal mood — it feels like a quiet night scene.", wrong1: "It's colorful.", wrong2: "The mood is sad because it's dark." },
  ],

  // ═══════════════════════════════════
  //  A6. 미술사/작가 (Art History)
  // ═══════════════════════════════════
  arthistory: [
    { speaker: "Who is Claude Monet and why is he famous?", correct: "Monet was a French Impressionist painter, famous for capturing fleeting light and atmosphere — especially in his Water Lilies series.", wrong1: "He painted the Mona Lisa.", wrong2: "He was a sculptor." },
    { speaker: "What is Impressionism?", correct: "It's a 19th-century movement where artists painted outdoors to capture natural light and movement, using loose brushstrokes and vibrant color.", wrong1: "Using very detailed and realistic painting.", wrong2: "Abstract art from the 20th century." },
    { speaker: "Tell me about Van Gogh's unique style.", correct: "Van Gogh used bold, swirling brushstrokes and intense complementary colors — his emotional use of paint makes the surfaces feel alive and energetic.", wrong1: "He painted very realistically.", wrong2: "He used very thin washes of paint." },
    { speaker: "What is the difference between Renaissance and Baroque art?", correct: "Renaissance art is balanced, calm, and idealized, while Baroque is dramatic, full of movement, and uses extreme light and shadow — chiaroscuro.", wrong1: "Renaissance is older.", wrong2: "Baroque uses more color." },
    { speaker: "Who painted the Sistine Chapel ceiling?", correct: "Michelangelo — he painted it between 1508 and 1512. The most famous section is 'The Creation of Adam.'", wrong1: "Leonardo da Vinci.", wrong2: "Raphael." },
    { speaker: "What is Cubism and who pioneered it?", correct: "Cubism breaks objects into geometric shapes from multiple viewpoints simultaneously. Pablo Picasso and Georges Braque pioneered it in the early 1900s.", wrong1: "It's painting with cubes.", wrong2: "Cubism was invented by Dalí." },
    { speaker: "Can you explain what Abstract Expressionism is?", correct: "It's a post-WWII movement where artists like Pollock and de Kooning expressed emotions through gesture, color, and form — not recognizable subjects.", wrong1: "Art that looks abstract.", wrong2: "Art from ancient Egypt." },
    { speaker: "Who was Frida Kahlo and what is she known for?", correct: "Frida Kahlo was a Mexican artist known for deeply personal self-portraits that explore identity, pain, and culture — often with surrealist imagery.", wrong1: "She was a French sculptor.", wrong2: "She painted landscapes." },
    { speaker: "What makes Vermeer's paintings so special?", correct: "Vermeer masterfully captured soft, diffused natural light in intimate interior scenes — the light in Girl with a Pearl Earring is breathtaking.", wrong1: "His paintings are very colorful.", wrong2: "He painted outdoors." },
    { speaker: "What is Pop Art and who are its key artists?", correct: "Pop Art emerged in the 1950s-60s, embracing popular culture, advertising, and mass media. Andy Warhol and Roy Lichtenstein are its biggest names.", wrong1: "Art that's popular with children.", wrong2: "It's modern abstract art." },
    { speaker: "How did photography change the art world?", correct: "Photography freed artists from needing to paint realistically, pushing them toward Impressionism, Expressionism, and eventually abstraction.", wrong1: "Photography replaced painting.", wrong2: "Artists started using cameras instead of brushes." },
    { speaker: "What is the difference between a fresco and an oil painting?", correct: "A fresco is painted directly onto wet plaster — the pigment becomes part of the wall. Oil painting uses pigment mixed with oil on canvas or panel.", wrong1: "Frescoes are smaller.", wrong2: "Oil paintings are older." },
  ],

  // ═══════════════════════════════════
  //  1. 병원 (Hospital)
  // ═══════════════════════════════════
  hospital: [
    { speaker: "What seems to be the problem today?", correct: "I've had a sharp pain in my lower back for three days.", wrong1: "I don't like hospitals.", wrong2: "I came here by bus." },
    { speaker: "Do you have any allergies?", correct: "Yes, I'm allergic to penicillin.", wrong1: "I don't like medicine.", wrong2: "Allergies are common." },
    { speaker: "How long have you had these symptoms?", correct: "About a week. It started last Monday.", wrong1: "I feel sick.", wrong2: "Symptoms are bad." },
    { speaker: "I'd like to run some blood tests.", correct: "Sure. Should I fast beforehand?", wrong1: "I don't like needles.", wrong2: "Blood tests are scary." },
    { speaker: "We need to schedule an MRI scan.", correct: "When is the earliest available appointment?", wrong1: "What's an MRI?", wrong2: "I'm busy tomorrow." },
    { speaker: "Take this medication twice a day after meals.", correct: "Are there any side effects I should watch for?", wrong1: "I don't want medicine.", wrong2: "Medicine is bitter." },
    { speaker: "You'll need to stay overnight for observation.", correct: "I understand. Can my family visit during visiting hours?", wrong1: "I want to go home.", wrong2: "Hospitals are boring." },
    { speaker: "Your test results came back normal.", correct: "That's a relief! Should I schedule a follow-up?", wrong1: "I knew I was fine.", wrong2: "Tests are expensive." },
    { speaker: "I'm referring you to a specialist.", correct: "Could you recommend a good one nearby?", wrong1: "I don't need a specialist.", wrong2: "Specialists are expensive." },
    { speaker: "Do you have health insurance?", correct: "Yes, here's my insurance card.", wrong1: "Insurance is complicated.", wrong2: "I don't know." },
    { speaker: "You should avoid heavy lifting for two weeks.", correct: "Got it. Can I still do light exercise like walking?", wrong1: "I never exercise.", wrong2: "Two weeks is too long." },
    { speaker: "We need your emergency contact information.", correct: "My spouse's number is 010-1234-5678.", wrong1: "I don't have any contacts.", wrong2: "Why do you need that?" },
  ],

  // ═══════════════════════════════════
  //  2. 학교 (School)
  // ═══════════════════════════════════
  school: [
    { speaker: "Can you explain this math problem?", correct: "Of course! First, let's factor the equation.", wrong1: "Math is hard.", wrong2: "I don't know math." },
    { speaker: "When is the assignment due?", correct: "It's due next Friday by midnight.", wrong1: "I forgot about it.", wrong2: "Assignments are boring." },
    { speaker: "Would you like to join our study group?", correct: "Sure! What time do you usually meet?", wrong1: "I study alone.", wrong2: "Study groups are noisy." },
    { speaker: "I'm having trouble understanding this chapter.", correct: "Let me help. Which part is confusing you?", wrong1: "Read it again.", wrong2: "That chapter is easy." },
    { speaker: "What elective courses are you taking?", correct: "I'm taking Art History and Environmental Science.", wrong1: "I don't like electives.", wrong2: "Courses are boring." },
    { speaker: "Can I borrow your notes from yesterday?", correct: "Sure, I'll send you a photo after class.", wrong1: "No, they're mine.", wrong2: "I didn't take notes." },
    { speaker: "The school festival is next month.", correct: "Awesome! Is our class doing a booth this year?", wrong1: "Festivals are loud.", wrong2: "I don't care about festivals." },
    { speaker: "You need to improve your attendance.", correct: "I understand. I'll make sure to attend every class from now on.", wrong1: "Attendance doesn't matter.", wrong2: "I was busy." },
    { speaker: "Who wants to present first?", correct: "I'll go first. I've prepared my slides.", wrong1: "Not me.", wrong2: "Presentations are scary." },
    { speaker: "Have you decided on your research topic?", correct: "Yes, I'm writing about the impact of social media on teenagers.", wrong1: "I haven't thought about it.", wrong2: "Research is difficult." },
    { speaker: "Parent-teacher conferences are this Thursday.", correct: "What time slot is available? My parents prefer the afternoon.", wrong1: "My parents are busy.", wrong2: "I don't want my parents to come." },
  ],

  // ═══════════════════════════════════
  //  3. 식당 (Restaurant)
  // ═══════════════════════════════════
  restaurant: [
    { speaker: "Good evening! Do you have a reservation?", correct: "Yes, under Kim for a party of four.", wrong1: "I'm hungry.", wrong2: "This place looks nice." },
    { speaker: "Are you ready to order?", correct: "Could we have a few more minutes, please?", wrong1: "I want food.", wrong2: "The menu is big." },
    { speaker: "How would you like your steak?", correct: "Medium-rare, please.", wrong1: "I like steak.", wrong2: "Steak is expensive." },
    { speaker: "Would you like to see the wine list?", correct: "Yes, please. Do you have any red wine recommendations?", wrong1: "I don't drink.", wrong2: "Wine is expensive." },
    { speaker: "I'm sorry, we're out of the salmon today.", correct: "No problem. What do you recommend as an alternative?", wrong1: "That's annoying.", wrong2: "I wanted salmon." },
    { speaker: "Is everything okay with your meal?", correct: "It's delicious! Could we get some more water, though?", wrong1: "It's okay.", wrong2: "I'm still eating." },
    { speaker: "Would you like any dessert?", correct: "What do you have? I'd love something chocolate.", wrong1: "I'm too full.", wrong2: "Dessert is unhealthy." },
    { speaker: "How would you like to split the bill?", correct: "Can we split it evenly among the four of us?", wrong1: "I don't want to pay.", wrong2: "Bills are complicated." },
    { speaker: "Do you have any dietary restrictions?", correct: "I'm vegetarian, and my friend is gluten-free.", wrong1: "I eat everything.", wrong2: "No restrictions." },
    { speaker: "This dish contains nuts. Is that okay?", correct: "Actually, I have a nut allergy. Could you suggest something else?", wrong1: "I don't like nuts.", wrong2: "Nuts are fine." },
    { speaker: "Would you like a table inside or on the terrace?", correct: "The terrace sounds lovely if the weather's nice.", wrong1: "I don't care.", wrong2: "Inside is fine." },
    { speaker: "Can I get you anything to start?", correct: "We'll start with the bruschetta and a Caesar salad to share.", wrong1: "Just water.", wrong2: "I'll wait." },
  ],

  // ═══════════════════════════════════
  //  4. 공항 (Airport)
  // ═══════════════════════════════════
  airport: [
    { speaker: "May I see your passport and boarding pass?", correct: "Here you go. I'm on flight KE901 to London.", wrong1: "I'm going to London.", wrong2: "I have a passport." },
    { speaker: "Did you pack your bags yourself?", correct: "Yes, I packed everything myself.", wrong1: "Someone helped me.", wrong2: "I have two bags." },
    { speaker: "Would you prefer a window or aisle seat?", correct: "Window seat, please, if available.", wrong1: "Any seat is fine.", wrong2: "I like airplanes." },
    { speaker: "Your flight has been delayed by two hours.", correct: "Is there a lounge I can use while I wait?", wrong1: "That's terrible.", wrong2: "I hate delays." },
    { speaker: "You have excess baggage. There's an additional fee.", correct: "How much is it? Can I move some items to my carry-on instead?", wrong1: "I don't want to pay.", wrong2: "My bag isn't heavy." },
    { speaker: "Please remove your laptop and liquids from your bag.", correct: "Sure, I'll put them in the tray separately.", wrong1: "Why?", wrong2: "Security is annoying." },
    { speaker: "Where is the connecting flight gate?", correct: "Could you tell me how to get to Gate B23?", wrong1: "I don't know.", wrong2: "Gates are confusing." },
    { speaker: "Would you like to upgrade to business class?", correct: "How much would the upgrade cost?", wrong1: "Business class is too expensive.", wrong2: "I'm fine in economy." },
    { speaker: "Your luggage hasn't arrived on the carousel.", correct: "I'd like to file a lost baggage claim, please.", wrong1: "Where's my bag?", wrong2: "I need my luggage." },
    { speaker: "Do you have anything to declare at customs?", correct: "No, I only have personal belongings and some souvenirs.", wrong1: "I bought some things.", wrong2: "What does declare mean?" },
    { speaker: "The boarding gate is now open.", correct: "Thank you. Which zone boards first?", wrong1: "I'm ready.", wrong2: "Let's go." },
  ],

  // ═══════════════════════════════════
  //  5. 호텔 (Hotel)
  // ═══════════════════════════════════
  hotel: [
    { speaker: "Welcome! Do you have a reservation?", correct: "Yes, I booked a double room under the name Kim for three nights.", wrong1: "I need a room.", wrong2: "This hotel looks nice." },
    { speaker: "Would you prefer a room with a city view or ocean view?", correct: "Ocean view, please. Is there an extra charge?", wrong1: "Any room is fine.", wrong2: "I like views." },
    { speaker: "What time is breakfast served?", correct: "Is it included in my rate, and where is the restaurant?", wrong1: "I like breakfast.", wrong2: "I'm hungry." },
    { speaker: "The Wi-Fi password is on your key card.", correct: "Great, thanks. Is there also a business center I can use?", wrong1: "I need Wi-Fi.", wrong2: "Wi-Fi is important." },
    { speaker: "How was your stay with us?", correct: "It was wonderful! The staff was incredibly helpful.", wrong1: "It was okay.", wrong2: "I'm leaving now." },
    { speaker: "Would you like housekeeping service today?", correct: "Yes, please. Could you also replace the towels?", wrong1: "No thanks.", wrong2: "My room is fine." },
    { speaker: "I'm sorry, your room isn't ready yet.", correct: "No problem. Can I store my luggage and come back later?", wrong1: "I want my room now.", wrong2: "That's unacceptable." },
    { speaker: "Is there anything else we can help you with?", correct: "Could you arrange a taxi to the airport for 6 AM tomorrow?", wrong1: "No, that's all.", wrong2: "I'm fine." },
    { speaker: "We have a spa and fitness center on the 3rd floor.", correct: "That sounds great! Do I need to make a reservation for the spa?", wrong1: "I don't exercise.", wrong2: "I don't need a spa." },
    { speaker: "There seems to be an issue with your credit card.", correct: "Let me try a different card. Here's my Visa.", wrong1: "That's impossible.", wrong2: "I don't have another card." },
    { speaker: "Would you like a late checkout?", correct: "That would be great. Is 2 PM possible?", wrong1: "I'm leaving early.", wrong2: "What's late checkout?" },
  ],

  // ═══════════════════════════════════
  //  6. 쇼핑몰 (Shopping)
  // ═══════════════════════════════════
  shopping: [
    { speaker: "Can I help you find anything?", correct: "Yes, I'm looking for a birthday gift for my friend.", wrong1: "I'm just looking.", wrong2: "I like shopping." },
    { speaker: "Would you like to try this on?", correct: "Yes, please. Where are the fitting rooms?", wrong1: "It looks nice.", wrong2: "I'm not sure." },
    { speaker: "This shirt comes in three colors.", correct: "Can I see the navy blue one in a medium?", wrong1: "I like all colors.", wrong2: "Colors are nice." },
    { speaker: "That will be $89.99.", correct: "Do you accept credit cards? And is there a student discount?", wrong1: "That's expensive.", wrong2: "I'll think about it." },
    { speaker: "Would you like a bag for that?", correct: "No thanks, I brought my own reusable bag.", wrong1: "Yes, give me a bag.", wrong2: "I don't need one." },
    { speaker: "This item is on sale — 30% off.", correct: "Great deal! Does the discount apply to other items in this line?", wrong1: "I love sales.", wrong2: "30% is not enough." },
    { speaker: "I'd like to return this item.", correct: "Here's my receipt. I'd like a full refund, please.", wrong1: "I don't like it.", wrong2: "It doesn't fit." },
    { speaker: "We have a loyalty program. Would you like to sign up?", correct: "Sure! What are the benefits?", wrong1: "I don't like programs.", wrong2: "No thanks." },
    { speaker: "This is our latest collection.", correct: "The designs are lovely! Do you have this in a smaller size?", wrong1: "It's okay.", wrong2: "I like old styles." },
    { speaker: "Can I put this on hold for you?", correct: "Yes, please. I'll be back within an hour to pick it up.", wrong1: "What does that mean?", wrong2: "I don't know yet." },
    { speaker: "The store is closing in 15 minutes.", correct: "I'll hurry. Can I quickly check out these two items?", wrong1: "Already?", wrong2: "I need more time." },
  ],

  // ═══════════════════════════════════
  //  7. 은행 (Bank)
  // ═══════════════════════════════════
  bank: [
    { speaker: "How can I help you today?", correct: "I'd like to open a savings account.", wrong1: "I need money.", wrong2: "Banks are big." },
    { speaker: "Could you fill out this application form?", correct: "Of course. Do I need to provide any ID?", wrong1: "Forms are annoying.", wrong2: "I don't like paperwork." },
    { speaker: "What's the current interest rate?", correct: "And is it compounded monthly or annually?", wrong1: "I want high interest.", wrong2: "Interest rates are low." },
    { speaker: "Would you like to set up online banking?", correct: "Yes, that would be convenient. How do I register?", wrong1: "I don't use the internet.", wrong2: "Online banking is scary." },
    { speaker: "I'd like to transfer money internationally.", correct: "What's the transfer fee, and how long does it take?", wrong1: "I want to send money.", wrong2: "International transfers are expensive." },
    { speaker: "Your account balance is $3,500.", correct: "I'd like to withdraw $500, please.", wrong1: "That's not enough.", wrong2: "I need more money." },
    { speaker: "We offer a fixed deposit with 4.5% annual interest.", correct: "What's the minimum deposit amount and lock-in period?", wrong1: "That sounds good.", wrong2: "I'll think about it." },
    { speaker: "Your card has been declined.", correct: "That's strange. Could you check if there's a hold on my account?", wrong1: "That's impossible.", wrong2: "My card works fine." },
    { speaker: "Would you like to apply for a credit card?", correct: "What are the annual fees and reward programs?", wrong1: "I already have one.", wrong2: "Credit cards are dangerous." },
    { speaker: "You need to update your address on file.", correct: "Sure, here's my new address and proof of residence.", wrong1: "I moved recently.", wrong2: "Why do you need that?" },
  ],

  // ═══════════════════════════════════
  //  8. 카페 (Cafe)
  // ═══════════════════════════════════
  cafe: [
    { speaker: "Hi! What can I get for you?", correct: "I'll have a large iced americano with an extra shot, please.", wrong1: "Coffee, please.", wrong2: "I like coffee." },
    { speaker: "Would you like that hot or iced?", correct: "Iced, please. And could you make it with oat milk?", wrong1: "Either is fine.", wrong2: "I like both." },
    { speaker: "For here or to go?", correct: "For here, please. I'll be working for a while.", wrong1: "I'm staying.", wrong2: "Here." },
    { speaker: "Would you like anything to eat with that?", correct: "What pastries do you have today? I'd love something fresh.", wrong1: "No food.", wrong2: "I'm not hungry." },
    { speaker: "The Wi-Fi password is on the receipt.", correct: "Thanks! Is there a time limit on the Wi-Fi?", wrong1: "I need Wi-Fi.", wrong2: "What's the password?" },
    { speaker: "We're out of oat milk today.", correct: "That's okay. I'll have almond milk instead.", wrong1: "That's annoying.", wrong2: "I only drink oat milk." },
    { speaker: "Your order is ready!", correct: "Thank you! Could I also get a sleeve for the cup?", wrong1: "Finally.", wrong2: "Thanks." },
    { speaker: "We close in 30 minutes.", correct: "Got it, I'll finish up. Can I get one more latte to go?", wrong1: "Already?", wrong2: "I need more time." },
    { speaker: "Would you like to try our new seasonal drink?", correct: "What's in it? I'm curious about the flavor.", wrong1: "No thanks.", wrong2: "I only drink americano." },
    { speaker: "Do you have a rewards card?", correct: "Yes! Here it is. How many stamps until a free drink?", wrong1: "I don't have one.", wrong2: "What's a rewards card?" },
  ],

  // ═══════════════════════════════════
  //  9. 택시/교통 (Taxi/Transportation)
  // ═══════════════════════════════════
  taxi: [
    { speaker: "Where to?", correct: "Seoul Station, please. Can you take the fastest route?", wrong1: "I need to go somewhere.", wrong2: "Just drive." },
    { speaker: "There's heavy traffic on the highway.", correct: "Could we take the local roads instead to avoid the jam?", wrong1: "Traffic is terrible.", wrong2: "I hate traffic." },
    { speaker: "That'll be 15,000 won.", correct: "Can I pay by card? And could I get a receipt, please?", wrong1: "That's expensive.", wrong2: "I'll pay." },
    { speaker: "Do you know the exact address?", correct: "It's 123 Gangnam-daero. I can show you on my phone's map.", wrong1: "Somewhere in Gangnam.", wrong2: "I don't remember." },
    { speaker: "Should I wait here for you?", correct: "Yes, please. I'll be about 10 minutes. I'll pay for the waiting time.", wrong1: "No, leave.", wrong2: "I don't know how long." },
    { speaker: "Excuse me, which bus goes to City Hall?", correct: "You'll want bus 402. The stop is right across the street.", wrong1: "I don't know.", wrong2: "Take any bus." },
    { speaker: "Is this seat taken?", correct: "No, go ahead! It's all yours.", wrong1: "Yes, it's mine.", wrong2: "I don't know." },
    { speaker: "How do I get to the subway from here?", correct: "Walk straight for two blocks and you'll see the entrance on your left.", wrong1: "Take the subway.", wrong2: "It's somewhere nearby." },
    { speaker: "The meter isn't running.", correct: "Could you please turn on the meter? I'd prefer to go by meter.", wrong1: "I don't care.", wrong2: "Meters are expensive." },
    { speaker: "Which platform is the train to Busan?", correct: "Let me check the board... It's Platform 5, departing at 2:30.", wrong1: "I don't know.", wrong2: "Check the sign." },
  ],

  // ═══════════════════════════════════
  //  10. 우체국 (Post Office)
  // ═══════════════════════════════════
  postoffice: [
    { speaker: "How can I help you?", correct: "I'd like to send this package to the United States.", wrong1: "I have a package.", wrong2: "I'm at the post office." },
    { speaker: "Would you like express or standard shipping?", correct: "How long does each take, and what's the price difference?", wrong1: "The cheap one.", wrong2: "I want it fast." },
    { speaker: "What's inside the package?", correct: "It contains books and some handmade crafts. Nothing fragile.", wrong1: "Just stuff.", wrong2: "Personal items." },
    { speaker: "Would you like to add insurance?", correct: "Yes, please. What's covered up to?", wrong1: "No thanks.", wrong2: "Insurance is unnecessary." },
    { speaker: "You need to fill out a customs declaration form.", correct: "Sure. Do I declare the value in dollars or won?", wrong1: "I don't know how.", wrong2: "Forms are confusing." },
    { speaker: "The package exceeds the weight limit.", correct: "Can I split it into two packages? What's the maximum weight?", wrong1: "It's not that heavy.", wrong2: "I can't help that." },
    { speaker: "Would you like tracking on this?", correct: "Absolutely. Can I track it online?", wrong1: "What's tracking?", wrong2: "I don't need it." },
    { speaker: "We also sell stamps and envelopes.", correct: "Great, I'll take a book of international stamps as well.", wrong1: "I don't need stamps.", wrong2: "Stamps are old-fashioned." },
    { speaker: "This item can't be sent by air mail.", correct: "What are my other options? Can it go by sea freight?", wrong1: "Why not?", wrong2: "That's inconvenient." },
    { speaker: "Your package should arrive in 5-7 business days.", correct: "Perfect. I'll keep the tracking number. Thank you!", wrong1: "That's too slow.", wrong2: "Okay." },
  ],

  // ═══════════════════════════════════
  //  11. 약국 (Pharmacy)
  // ═══════════════════════════════════
  pharmacy: [
    { speaker: "Do you have a prescription?", correct: "Yes, here it is. My doctor prescribed these yesterday.", wrong1: "I need medicine.", wrong2: "I don't have one." },
    { speaker: "Are you taking any other medications?", correct: "I'm currently on blood pressure medication. Will there be any interactions?", wrong1: "No other medicine.", wrong2: "I don't remember." },
    { speaker: "Would you prefer the brand name or generic?", correct: "Is the generic version equally effective? I'll take the cheaper option.", wrong1: "What's the difference?", wrong2: "The expensive one." },
    { speaker: "Take two tablets every 8 hours with food.", correct: "Should I take them before or after meals? And for how many days?", wrong1: "Okay.", wrong2: "I'll try to remember." },
    { speaker: "Do you need anything for cold symptoms?", correct: "Yes, something for congestion and a sore throat, please.", wrong1: "I have a cold.", wrong2: "Cold medicine, please." },
    { speaker: "This cream should be applied twice daily.", correct: "Should I apply it to damp skin, and do I need to cover it?", wrong1: "Okay, I'll use it.", wrong2: "Creams are messy." },
    { speaker: "Do you have any allergies to medications?", correct: "I'm allergic to aspirin and sulfa drugs.", wrong1: "I don't think so.", wrong2: "Allergies are common." },
    { speaker: "This antibiotic may cause drowsiness.", correct: "Thank you for the warning. Should I avoid driving while on it?", wrong1: "I'll be fine.", wrong2: "I'm always tired anyway." },
    { speaker: "Your prescription will take about 15 minutes.", correct: "No problem. I'll browse around while I wait.", wrong1: "That's too long.", wrong2: "I'll wait outside." },
    { speaker: "Would you like a consultation with the pharmacist?", correct: "Yes, please. I have some questions about potential side effects.", wrong1: "No, I'm fine.", wrong2: "I don't need help." },
  ],

  // ═══════════════════════════════════
  //  12. 사무실 (Office)
  // ═══════════════════════════════════
  office: [
    { speaker: "Can you send me the report by end of day?", correct: "Sure, I'll finalize it and email it to you by 5 PM.", wrong1: "I'm busy today.", wrong2: "The report isn't ready." },
    { speaker: "We have a team meeting at 2 PM.", correct: "I'll be there. Should I prepare anything beforehand?", wrong1: "I'm in another meeting.", wrong2: "Meetings are boring." },
    { speaker: "The client wants to reschedule the presentation.", correct: "No problem. Let me check my calendar and suggest some alternatives.", wrong1: "That's inconvenient.", wrong2: "Clients are difficult." },
    { speaker: "Could you review this proposal before I submit it?", correct: "Of course. I'll have my feedback ready by tomorrow morning.", wrong1: "I'm too busy.", wrong2: "It looks fine." },
    { speaker: "The printer is jammed again.", correct: "Let me take a look. We should probably call maintenance this time.", wrong1: "Not again.", wrong2: "I hate printers." },
    { speaker: "Have you updated the spreadsheet?", correct: "Yes, I've added the Q3 figures. Would you like me to walk you through the changes?", wrong1: "Not yet.", wrong2: "I forgot." },
    { speaker: "We need to cut the budget by 15%.", correct: "I'll analyze each department's spending and propose areas where we can reduce costs.", wrong1: "That's too much.", wrong2: "Cut someone else's budget." },
    { speaker: "Are you available for a quick call?", correct: "I'm free in 10 minutes. Shall I call you or join a video conference?", wrong1: "I'm busy.", wrong2: "I don't like calls." },
    { speaker: "The deadline has been moved up to Friday.", correct: "That's tight but manageable. I'll prioritize this and delegate other tasks.", wrong1: "That's impossible.", wrong2: "Friday is too soon." },
    { speaker: "Great job on the presentation today!", correct: "Thank you! The team really pulled together. I appreciate everyone's effort.", wrong1: "Thanks.", wrong2: "It was easy." },
  ],

  // ═══════════════════════════════════
  //  13. 면접 (Job Interview)
  // ═══════════════════════════════════
  interview: [
    { speaker: "Tell me about yourself.", correct: "I'm a marketing professional with 5 years of experience in digital campaigns and brand strategy.", wrong1: "My name is Kim.", wrong2: "I'm from Korea." },
    { speaker: "Why do you want to work here?", correct: "I admire your company's innovative approach, and I believe my skills align perfectly with your mission.", wrong1: "I need a job.", wrong2: "The salary is good." },
    { speaker: "What's your greatest weakness?", correct: "I tend to be overly detail-oriented, but I've been working on balancing thoroughness with efficiency.", wrong1: "I don't have any.", wrong2: "I'm a perfectionist." },
    { speaker: "Where do you see yourself in five years?", correct: "I see myself in a leadership role, driving strategic initiatives and mentoring junior team members.", wrong1: "I don't know.", wrong2: "Doing your job." },
    { speaker: "Can you describe a challenging situation you've faced?", correct: "In my previous role, I managed a project that was 30% over budget. I renegotiated vendor contracts and delivered on time.", wrong1: "I faced many challenges.", wrong2: "Everything was difficult." },
    { speaker: "Why did you leave your previous job?", correct: "I was seeking new challenges and opportunities for professional growth that align with my long-term career goals.", wrong1: "I didn't like my boss.", wrong2: "I was fired." },
    { speaker: "What salary range are you expecting?", correct: "Based on my research and experience, I'm looking at the range of 50-60 million won, but I'm open to discussion.", wrong1: "As much as possible.", wrong2: "I don't know." },
    { speaker: "Do you have any questions for us?", correct: "Yes — could you describe the team dynamics, and what does success look like in the first 90 days?", wrong1: "No, not really.", wrong2: "When do I start?" },
    { speaker: "How do you handle pressure?", correct: "I break tasks into manageable steps, prioritize effectively, and maintain clear communication with stakeholders.", wrong1: "I work harder.", wrong2: "I don't feel pressure." },
    { speaker: "What makes you the best candidate for this position?", correct: "My combination of technical expertise, leadership experience, and proven track record of exceeding targets sets me apart.", wrong1: "I'm a hard worker.", wrong2: "I really want this job." },
    { speaker: "Can you start immediately?", correct: "I need to give two weeks' notice, but I could potentially start on the 1st of next month.", wrong1: "Yes, tomorrow.", wrong2: "I'm not sure when." },
  ],

  // ═══════════════════════════════════
  //  14. 부동산 (Real Estate)
  // ═══════════════════════════════════
  realestate: [
    { speaker: "What kind of property are you looking for?", correct: "A two-bedroom apartment with a balcony, preferably near public transportation.", wrong1: "A nice house.", wrong2: "Something cheap." },
    { speaker: "What's your budget range?", correct: "I'm looking at a monthly rent between 800 and 1,200 dollars, excluding utilities.", wrong1: "Not too expensive.", wrong2: "I don't have much money." },
    { speaker: "This apartment is 850 square feet.", correct: "That's a good size. Is the lease 12 months, and is the deposit negotiable?", wrong1: "Is that big?", wrong2: "I need more space." },
    { speaker: "Utilities aren't included in the rent.", correct: "What's the average monthly cost for utilities in this building?", wrong1: "That's inconvenient.", wrong2: "I don't want to pay utilities." },
    { speaker: "The previous tenant just moved out.", correct: "When can I move in, and will it be cleaned and repainted beforehand?", wrong1: "Why did they leave?", wrong2: "I hope it's clean." },
    { speaker: "Are pets allowed in this building?", correct: "That's important to me — I have a small dog. Is there a pet deposit required?", wrong1: "I don't have pets.", wrong2: "Pets are messy." },
    { speaker: "The lease requires a two-month security deposit.", correct: "Is it refundable when I move out? What conditions apply?", wrong1: "That's too much.", wrong2: "I don't have that much." },
    { speaker: "There's a community gym and rooftop terrace.", correct: "That's great! Are there any additional fees for using those amenities?", wrong1: "I don't exercise.", wrong2: "That's nice." },
    { speaker: "Would you like to schedule a viewing?", correct: "Yes, I'm available this Saturday morning. Does 10 AM work?", wrong1: "Maybe later.", wrong2: "I'll think about it." },
    { speaker: "This neighborhood has great schools nearby.", correct: "That's perfect for my family. What about grocery stores and parks?", wrong1: "I don't have kids.", wrong2: "Schools are important." },
  ],

  // ═══════════════════════════════════
  //  15. 경찰서 (Police Station)
  // ═══════════════════════════════════
  police: [
    { speaker: "How can we help you?", correct: "I'd like to report a theft. My wallet was stolen at the subway station.", wrong1: "I lost something.", wrong2: "I'm here about a problem." },
    { speaker: "When did this happen?", correct: "About an hour ago, around 3 PM at Gangnam Station.", wrong1: "Recently.", wrong2: "I don't remember exactly." },
    { speaker: "Can you describe what was stolen?", correct: "A brown leather wallet containing my ID, two credit cards, and about 50,000 won in cash.", wrong1: "My wallet.", wrong2: "It had stuff inside." },
    { speaker: "Did you see the suspect?", correct: "Yes, it was a man in a black hoodie, about 175 cm tall. I could identify him.", wrong1: "No, I didn't see anything.", wrong2: "It happened too fast." },
    { speaker: "We'll need you to fill out a report.", correct: "Of course. Will I receive a copy for my insurance claim?", wrong1: "Do I have to?", wrong2: "Reports are complicated." },
    { speaker: "Do you have any surveillance footage?", correct: "The incident happened near the station entrance, which should have CCTV cameras.", wrong1: "I don't know.", wrong2: "There must be cameras." },
    { speaker: "We'll investigate this matter.", correct: "Thank you, officer. How can I follow up on the case?", wrong1: "Please find my wallet.", wrong2: "I hope you catch them." },
    { speaker: "Have you cancelled your credit cards?", correct: "Yes, I called my bank immediately and froze all my accounts.", wrong1: "Not yet.", wrong2: "I forgot about that." },
    { speaker: "Is there someone who witnessed the incident?", correct: "Yes, my friend was with me. She saw the whole thing and can give a statement.", wrong1: "I was alone.", wrong2: "I don't think so." },
    { speaker: "We found a wallet matching your description.", correct: "That's wonderful! Can I come identify it? I can verify it by the contents.", wrong1: "Finally!", wrong2: "Is it mine?" },
  ],

  // ═══════════════════════════════════
  //  16. 미용실 (Hair Salon)
  // ═══════════════════════════════════
  salon: [
    { speaker: "What would you like done today?", correct: "I'd like a trim — about two inches off, and some layers for volume.", wrong1: "Cut my hair.", wrong2: "Make it shorter." },
    { speaker: "Would you like to see some style references?", correct: "Actually, I have some photos on my phone. Something like this, please.", wrong1: "I don't care about style.", wrong2: "Just make it look good." },
    { speaker: "Have you thought about coloring?", correct: "I've been considering highlights. What shades would complement my skin tone?", wrong1: "I don't want color.", wrong2: "Coloring damages hair." },
    { speaker: "How do you usually style your hair?", correct: "I prefer a low-maintenance look since I don't have much time in the mornings.", wrong1: "I just leave it.", wrong2: "I don't style it." },
    { speaker: "Your hair is quite dry. I recommend a treatment.", correct: "What kind of treatment? How long does it take and how much is it?", wrong1: "My hair is fine.", wrong2: "Treatments are expensive." },
    { speaker: "Would you like your eyebrows shaped as well?", correct: "Sure, just a light cleanup to keep the natural shape.", wrong1: "No thanks.", wrong2: "I don't do eyebrows." },
    { speaker: "The total comes to $45.", correct: "Here you go. And I'd like to book my next appointment for four weeks from now.", wrong1: "That's expensive.", wrong2: "I'll pay." },
    { speaker: "How's the length? Is this good?", correct: "Could you take just a little more off the sides? The back looks perfect.", wrong1: "It's fine.", wrong2: "I don't know." },
    { speaker: "Would you like a blow-dry or air-dry?", correct: "Blow-dry, please. Could you add some waves at the ends?", wrong1: "Just dry it.", wrong2: "I'll let it dry naturally." },
    { speaker: "Do you have a preferred stylist?", correct: "I'd like to book with Sarah if she's available. She did a great job last time.", wrong1: "Anyone is fine.", wrong2: "I don't have a preference." },
  ],

  // ═══════════════════════════════════
  //  17. 헬스장 (Gym)
  // ═══════════════════════════════════
  gym: [
    { speaker: "Would you like a tour of the facility?", correct: "Yes, please! I'm especially interested in the free weights area and group classes.", wrong1: "I just want to work out.", wrong2: "No, I'll find my way." },
    { speaker: "What are your fitness goals?", correct: "I want to build strength and improve my cardiovascular health. I work out about 4 times a week.", wrong1: "I want to lose weight.", wrong2: "I just want to get fit." },
    { speaker: "Would you like a personal trainer session?", correct: "How much does it cost per session, and can I try one before committing?", wrong1: "I don't need help.", wrong2: "Trainers are too expensive." },
    { speaker: "Which membership plan are you interested in?", correct: "What's the difference between the monthly and annual plans? Are there any sign-up promotions?", wrong1: "The cheapest one.", wrong2: "I haven't decided." },
    { speaker: "This machine targets your core muscles.", correct: "Can you show me the proper form? I want to avoid injury.", wrong1: "I know how to use it.", wrong2: "Looks complicated." },
    { speaker: "We offer yoga, spinning, and HIIT classes.", correct: "What's the schedule for HIIT classes? Can I join as a beginner?", wrong1: "I don't like classes.", wrong2: "Yoga is boring." },
    { speaker: "You should warm up before lifting weights.", correct: "Good point. I'll do 10 minutes on the treadmill first. Any stretches you recommend?", wrong1: "I never warm up.", wrong2: "Warm-ups are a waste of time." },
    { speaker: "Can I use the pool area?", correct: "Is it included in the basic membership, or is there an extra fee?", wrong1: "I want to swim.", wrong2: "I don't like swimming." },
    { speaker: "How's your progress going?", correct: "I've been consistent for two months and I'm already noticing improvements in my endurance.", wrong1: "It's okay.", wrong2: "I haven't noticed anything." },
    { speaker: "The locker rooms are on the second floor.", correct: "Thanks! Are lockers provided, or should I bring my own lock?", wrong1: "Okay.", wrong2: "Where do I change?" },
  ],

  // ═══════════════════════════════════
  //  18. 도서관 (Library)
  // ═══════════════════════════════════
  library: [
    { speaker: "Can I help you find a book?", correct: "Yes, I'm looking for books on machine learning. Where would I find those?", wrong1: "I'm just browsing.", wrong2: "I like books." },
    { speaker: "Your books are due in two weeks.", correct: "Can I renew them online if I need more time?", wrong1: "Two weeks is enough.", wrong2: "I'll try to finish them." },
    { speaker: "This book is currently checked out.", correct: "Can I place a hold on it and get notified when it's available?", wrong1: "That's unfortunate.", wrong2: "I'll wait." },
    { speaker: "We have a study room available.", correct: "Great! Can I reserve it for three hours? I have a group project.", wrong1: "I don't need a room.", wrong2: "Study rooms are small." },
    { speaker: "Would you like to sign up for a library card?", correct: "Yes, please. What do I need to bring for registration?", wrong1: "I already have one.", wrong2: "I don't need one." },
    { speaker: "The computer lab is on the second floor.", correct: "Is printing available there? And what's the cost per page?", wrong1: "I brought my laptop.", wrong2: "I don't use computers." },
    { speaker: "We're hosting a book club next Thursday.", correct: "That sounds interesting! What book are you reading, and can anyone join?", wrong1: "I'm busy.", wrong2: "Book clubs are boring." },
    { speaker: "Please keep your voice down in the reading area.", correct: "I'm sorry about that. We'll move to the discussion room instead.", wrong1: "We weren't loud.", wrong2: "Sorry." },
    { speaker: "You have an overdue book.", correct: "I apologize. What's the fine? I'll return it today.", wrong1: "I forgot about it.", wrong2: "I lost it." },
    { speaker: "We have audiobooks and e-books available too.", correct: "That's great! Can I access them through the library app?", wrong1: "I prefer real books.", wrong2: "I don't like e-books." },
  ],

  // ═══════════════════════════════════
  //  19. 영화관 (Cinema)
  // ═══════════════════════════════════
  cinema: [
    { speaker: "Which movie would you like to see?", correct: "Two tickets for the 7:30 showing of the new sci-fi film, please.", wrong1: "Anything good playing?", wrong2: "I like movies." },
    { speaker: "Would you prefer standard or IMAX?", correct: "IMAX would be great! How much more is it per ticket?", wrong1: "What's the difference?", wrong2: "The regular one." },
    { speaker: "Would you like to add any snacks?", correct: "A large popcorn and two medium drinks, please. Is there a combo deal?", wrong1: "Popcorn, please.", wrong2: "Snacks are too expensive." },
    { speaker: "Which seats would you like?", correct: "Can we get two seats in the center, about halfway back?", wrong1: "Anywhere is fine.", wrong2: "The back row." },
    { speaker: "The movie starts in 15 minutes.", correct: "Perfect timing. Which theater number is it in?", wrong1: "Let's hurry.", wrong2: "We're early." },
    { speaker: "Would you like to join our membership program?", correct: "What are the perks? Do members get discounts on tickets?", wrong1: "No thanks.", wrong2: "I don't come here often." },
    { speaker: "How was the movie?", correct: "The visual effects were stunning! Though I thought the plot could've been stronger.", wrong1: "It was good.", wrong2: "I liked it." },
    { speaker: "Sorry, that showing is sold out.", correct: "Is the next showing at 9:30 available? Or could we try a different format?", wrong1: "That's too bad.", wrong2: "I really wanted to see it." },
    { speaker: "Please silence your phones during the movie.", correct: "Of course! I'll switch mine to airplane mode now.", wrong1: "Okay.", wrong2: "I already did." },
    { speaker: "We have 3D glasses available at the counter.", correct: "Thanks! Are they included in the ticket price, or is there a deposit?", wrong1: "I don't like 3D.", wrong2: "Give me a pair." },
  ],

  // ═══════════════════════════════════
  //  20. 관광 (Tourism)
  // ═══════════════════════════════════
  tourism: [
    { speaker: "Welcome to the visitor center! How can I help?", correct: "I'm visiting for three days. Could you recommend the top attractions?", wrong1: "I'm a tourist.", wrong2: "I need a map." },
    { speaker: "Would you like a guided tour?", correct: "What tours are available, and how long do they last?", wrong1: "I prefer to explore alone.", wrong2: "Tours are boring." },
    { speaker: "This temple was built in the 14th century.", correct: "That's fascinating! Is photography allowed inside?", wrong1: "It's old.", wrong2: "I like temples." },
    { speaker: "Do you have a city pass?", correct: "Not yet. Does it include public transportation and museum entry?", wrong1: "What's a city pass?", wrong2: "I don't need one." },
    { speaker: "The museum closes at 6 PM.", correct: "We have two hours then. Which exhibits do you recommend we prioritize?", wrong1: "That's early.", wrong2: "We'll try to hurry." },
    { speaker: "Would you like to buy a souvenir?", correct: "Do you have anything locally made? I'd love something authentic.", wrong1: "These are expensive.", wrong2: "I don't buy souvenirs." },
    { speaker: "How are you enjoying your trip so far?", correct: "It's been incredible! The food and culture are beyond my expectations.", wrong1: "It's okay.", wrong2: "I'm having fun." },
    { speaker: "The night market opens at 7 PM.", correct: "Sounds exciting! What's it famous for? And how do we get there?", wrong1: "I'll check it out.", wrong2: "Night markets are crowded." },
    { speaker: "Can I take your photo for you?", correct: "That would be so kind! Could you make sure the tower is in the background?", wrong1: "No thanks.", wrong2: "I don't like photos." },
    { speaker: "You should try the local street food.", correct: "Any specific dishes you'd recommend? I love trying authentic local cuisine!", wrong1: "I'm not hungry.", wrong2: "Street food is unhygienic." },
    { speaker: "The sunset view from the hill is spectacular.", correct: "What time should we head up to catch it? And is the trail well-lit for the way down?", wrong1: "I'll take your word for it.", wrong2: "Hills are tiring." },
  ],

  // ═══════════════════════════════════
  //  21. 치과 (Dentist)
  // ═══════════════════════════════════
  dentist: [
    { speaker: "When was your last dental checkup?", correct: "About six months ago. I try to come in twice a year.", wrong1: "I don't remember.", wrong2: "I don't like dentists." },
    { speaker: "Are you experiencing any pain?", correct: "Yes, I have a sharp pain in my upper left molar when I eat cold food.", wrong1: "My tooth hurts.", wrong2: "A little bit." },
    { speaker: "You have a small cavity that needs filling.", correct: "How long will the procedure take? And will I need anesthesia?", wrong1: "That's bad.", wrong2: "I don't want a filling." },
    { speaker: "Do you floss regularly?", correct: "I try to floss once a day, but I sometimes forget on busy days.", wrong1: "No, I don't floss.", wrong2: "What's flossing?" },
    { speaker: "We'll need to take some X-rays.", correct: "Sure. Is there anything I should know? I'm not pregnant, by the way.", wrong1: "I don't like X-rays.", wrong2: "Are X-rays safe?" },
    { speaker: "I recommend getting your wisdom teeth removed.", correct: "Is it urgent, or can I schedule it for next month? Will I need time off work?", wrong1: "I don't want surgery.", wrong2: "Wisdom teeth are fine." },
    { speaker: "Please rinse and spit.", correct: "Sure. How does everything look so far?", wrong1: "Okay.", wrong2: "I hate that." },
    { speaker: "You should use a softer toothbrush.", correct: "Thank you for the advice. Any specific brand you'd recommend?", wrong1: "My toothbrush is fine.", wrong2: "I like hard brushes." },
    { speaker: "Would you like to whiten your teeth?", correct: "How much does it cost, and how many shades lighter can I expect?", wrong1: "My teeth are white enough.", wrong2: "Whitening damages teeth." },
    { speaker: "The numbness should wear off in about two hours.", correct: "Got it. Should I avoid eating until then?", wrong1: "Two hours is too long.", wrong2: "I'm hungry now." },
  ],

  // ═══════════════════════════════════
  //  22. 비행기 안 (On the Airplane)
  // ═══════════════════════════════════
  airplane: [
    { speaker: "Would you like chicken or beef for your meal?", correct: "Chicken, please. And could I also get a cup of orange juice?", wrong1: "Either is fine.", wrong2: "I'm not hungry." },
    { speaker: "Could you please put your seat in the upright position?", correct: "Of course, sorry about that. Are we preparing for landing?", wrong1: "Why?", wrong2: "I'm comfortable like this." },
    { speaker: "Would you like a blanket or pillow?", correct: "A blanket would be great, thank you. It's quite chilly up here.", wrong1: "No.", wrong2: "I'm fine." },
    { speaker: "Excuse me, I think that's my seat.", correct: "Oh, I'm sorry! Let me check my boarding pass... You're right, I'm one row back.", wrong1: "No, it's mine.", wrong2: "I sat here first." },
    { speaker: "We're experiencing some turbulence. Please fasten your seatbelt.", correct: "Already done. How long is the turbulence expected to last?", wrong1: "I'm scared.", wrong2: "Turbulence is normal." },
    { speaker: "Would you like something from the duty-free catalog?", correct: "Can I see the perfume selection? I'd like to buy a gift.", wrong1: "I don't buy duty-free.", wrong2: "Everything's overpriced." },
    { speaker: "We'll be landing in approximately 30 minutes.", correct: "Great, thank you. Could I get one last coffee before we land?", wrong1: "Finally.", wrong2: "That's too long." },
    { speaker: "Could you help me put my bag in the overhead bin?", correct: "Of course! Let me move this aside to make room.", wrong1: "Do it yourself.", wrong2: "It's too heavy." },
    { speaker: "Do you have anything to declare on your customs form?", correct: "Just a bottle of wine and some chocolate. Both under the duty-free limit.", wrong1: "I bought some things.", wrong2: "I don't know what to write." },
    { speaker: "Is this your first time visiting this country?", correct: "Yes, it is! I'm really excited. Any tips for a first-time visitor?", wrong1: "Yes.", wrong2: "I travel a lot." },
  ],

  // ═══════════════════════════════════
  //  23. 대사관/비자 (Embassy)
  // ═══════════════════════════════════
  embassy: [
    { speaker: "What type of visa are you applying for?", correct: "I'm applying for a student visa. I've been accepted to NYU for a master's program.", wrong1: "A visa.", wrong2: "I want to go to America." },
    { speaker: "How long do you plan to stay?", correct: "Approximately two years for my degree, with possible OPT extension afterward.", wrong1: "A long time.", wrong2: "I'm not sure." },
    { speaker: "Do you have proof of financial support?", correct: "Yes, here's my bank statement and my scholarship letter covering tuition and living expenses.", wrong1: "I have money.", wrong2: "My parents will help." },
    { speaker: "What will you do after your studies?", correct: "I plan to gain work experience in my field before eventually returning to contribute to my home country.", wrong1: "I'll stay there.", wrong2: "I don't know yet." },
    { speaker: "Have you been to the United States before?", correct: "Yes, I visited for two weeks as a tourist in 2023. Here's the stamp in my passport.", wrong1: "No, never.", wrong2: "I went once." },
    { speaker: "Your application is missing the I-20 form.", correct: "I apologize for the oversight. I have it right here in my folder — I must have missed it.", wrong1: "What's that?", wrong2: "I forgot it." },
    { speaker: "Why did you choose this particular university?", correct: "Their computer science program is ranked among the top 10, and they offer excellent research opportunities in AI.", wrong1: "It's a good school.", wrong2: "My friend goes there." },
    { speaker: "Your visa has been approved.", correct: "Thank you so much! When can I pick up my passport with the visa stamp?", wrong1: "Great!", wrong2: "Finally!" },
    { speaker: "We need additional documentation.", correct: "What specifically do you need? I want to provide everything as quickly as possible.", wrong1: "I already gave everything.", wrong2: "What else do you want?" },
    { speaker: "The processing time is 3-5 business days.", correct: "Understood. Is there an expedited option if I need it sooner for my enrollment deadline?", wrong1: "That's too slow.", wrong2: "I need it now." },
  ],

  // ═══════════════════════════════════
  //  24. 렌터카 (Car Rental)
  // ═══════════════════════════════════
  carrental: [
    { speaker: "What type of car would you like to rent?", correct: "I'd prefer a compact SUV for the mountain roads. What models do you have available?", wrong1: "A car.", wrong2: "The cheapest one." },
    { speaker: "How long do you need the rental?", correct: "Five days, from Monday to Friday. Can I return it at a different location?", wrong1: "A few days.", wrong2: "I'm not sure." },
    { speaker: "Would you like to add insurance?", correct: "What does the comprehensive package cover? I want to be fully protected.", wrong1: "No, I'm a good driver.", wrong2: "Insurance is a scam." },
    { speaker: "Do you have an international driving permit?", correct: "Yes, here it is along with my regular license from Korea.", wrong1: "I have a Korean license.", wrong2: "Do I need one?" },
    { speaker: "The car has a full tank. Please return it full.", correct: "Understood. Is there a gas station nearby that you'd recommend?", wrong1: "Okay.", wrong2: "What if I don't?" },
    { speaker: "Would you like a GPS navigation system?", correct: "Yes, please. Does it have English language support?", wrong1: "I have my phone.", wrong2: "I don't need it." },
    { speaker: "There's a scratch on the bumper already.", correct: "Good catch. Let's document it now so I'm not charged for it later.", wrong1: "I don't care.", wrong2: "It's small." },
    { speaker: "Your total comes to $285 for five days.", correct: "Does that include the insurance and GPS? Can I pay with a credit card?", wrong1: "That's expensive.", wrong2: "I'll pay." },
    { speaker: "Please call us if you have any issues on the road.", correct: "Do you have a 24-hour emergency number? And is roadside assistance included?", wrong1: "Okay.", wrong2: "I won't have issues." },
    { speaker: "Where are you planning to drive?", correct: "We're doing a road trip along the coast and up into the mountains.", wrong1: "Around the city.", wrong2: "I don't know yet." },
  ],

  // ═══════════════════════════════════
  //  25. 수리기사 (Home Repair)
  // ═══════════════════════════════════
  homerepair: [
    { speaker: "What seems to be the problem?", correct: "The kitchen faucet has been leaking for two days. It's getting worse.", wrong1: "Something's broken.", wrong2: "I need help." },
    { speaker: "I'll need to turn off the water main.", correct: "Go ahead. The shutoff valve is in the basement. I'll show you where.", wrong1: "Okay.", wrong2: "How long will that take?" },
    { speaker: "This pipe needs to be replaced.", correct: "How much will the replacement cost, including parts and labor?", wrong1: "That's bad.", wrong2: "Can't you just fix it?" },
    { speaker: "The repair will take about two hours.", correct: "That's fine. Should I stay home the whole time, or can I step out briefly?", wrong1: "That's too long.", wrong2: "Can you hurry?" },
    { speaker: "Your water heater is quite old.", correct: "How many more years can we expect from it? Should we start planning a replacement?", wrong1: "It still works.", wrong2: "I don't want to replace it." },
    { speaker: "I found the source of the problem.", correct: "Great! What was causing it, and how can we prevent it from happening again?", wrong1: "Just fix it.", wrong2: "I don't care what caused it." },
    { speaker: "Do you want me to fix the toilet while I'm here?", correct: "Yes, please! It's been running constantly. What would the additional cost be?", wrong1: "No, just the sink.", wrong2: "The toilet is fine." },
    { speaker: "I recommend scheduling regular maintenance.", correct: "That's a good idea. How often should we have the plumbing checked?", wrong1: "I'll think about it.", wrong2: "Maintenance is unnecessary." },
    { speaker: "Here's your invoice for today's work.", correct: "Thank you. Do you accept card payment? And is there a warranty on the repair?", wrong1: "That's expensive.", wrong2: "I'll pay cash." },
    { speaker: "The electrical outlet isn't grounded properly.", correct: "That sounds like a safety issue. Can you fix it today, or should I schedule an electrician?", wrong1: "It works fine.", wrong2: "I don't know what that means." },
  ],

  // ═══════════════════════════════════
  //  26. 전시회/갤러리 (Art Gallery)
  // ═══════════════════════════════════
  gallery: [
    { speaker: "Welcome to the exhibition. Would you like a guided tour?", correct: "Yes, please! How long does the tour last, and is it included in the admission?", wrong1: "I'll look around myself.", wrong2: "No thanks." },
    { speaker: "This painting is from the Impressionist period.", correct: "The brushwork is stunning. Is this a Monet or a Renoir?", wrong1: "It's pretty.", wrong2: "I don't know art." },
    { speaker: "Photography is not allowed in this section.", correct: "I understand. Is there a gift shop where I can buy prints of these works?", wrong1: "Why not?", wrong2: "I already took some." },
    { speaker: "This sculpture was donated by a private collector.", correct: "It's magnificent. What material is it made from, and who's the artist?", wrong1: "It's nice.", wrong2: "How much is it worth?" },
    { speaker: "We have a special exhibition opening next week.", correct: "That sounds exciting! What's the theme, and do I need to book tickets in advance?", wrong1: "I'll think about it.", wrong2: "I'm only here today." },
    { speaker: "What kind of art are you interested in?", correct: "I'm really drawn to contemporary installations and mixed media. Do you have a section for that?", wrong1: "I like everything.", wrong2: "I don't know much about art." },
    { speaker: "The artist will be here for a Q&A session at 3 PM.", correct: "I'd love to attend! Is there limited seating, or is it first come, first served?", wrong1: "I'm busy at 3.", wrong2: "I don't care about Q&As." },
    { speaker: "This piece is part of our permanent collection.", correct: "It's breathtaking. How long has the gallery had it in the collection?", wrong1: "It's old.", wrong2: "I prefer temporary exhibits." },
    { speaker: "Would you like to become a gallery member?", correct: "What benefits does membership include? Are there exclusive previews for members?", wrong1: "I don't come here often.", wrong2: "Membership is expensive." },
    { speaker: "The children's art workshop starts at 2 PM.", correct: "My daughter would love that! What age group is it for, and what materials are provided?", wrong1: "I don't have kids.", wrong2: "Kids don't need art." },
  ],

  // ═══════════════════════════════════
  //  27. 놀이공원 (Theme Park)
  // ═══════════════════════════════════
  themepark: [
    { speaker: "Welcome! Would you like a one-day or two-day pass?", correct: "One-day pass for two adults, please. Are there any combo deals with food included?", wrong1: "One ticket.", wrong2: "How much is it?" },
    { speaker: "This ride has a minimum height requirement.", correct: "My son is about 130 cm. Does he meet the requirement?", wrong1: "He's tall enough.", wrong2: "That's not fair." },
    { speaker: "The wait time for this roller coaster is 45 minutes.", correct: "Is there a Fast Pass option to skip the line? We'd like to maximize our time.", wrong1: "That's too long.", wrong2: "I'll wait." },
    { speaker: "Would you like to see the parade schedule?", correct: "Yes! What time is the main parade, and where's the best spot to watch it?", wrong1: "I don't like parades.", wrong2: "Maybe later." },
    { speaker: "This area is the children's zone.", correct: "Perfect! Are there restrooms and a first aid station nearby?", wrong1: "My kids will love it.", wrong2: "Where are the big rides?" },
    { speaker: "Would you like your photo from the ride?", correct: "Let me see it first! Oh, that's hilarious — I'll take two copies.", wrong1: "No thanks.", wrong2: "Photos are expensive." },
    { speaker: "The fireworks show starts at 9 PM.", correct: "We definitely don't want to miss that! Should we grab spots early?", wrong1: "We'll be gone by then.", wrong2: "Fireworks are loud." },
    { speaker: "Where would you like to eat?", correct: "Is there a food court nearby with a variety of options? We have different preferences.", wrong1: "Anywhere.", wrong2: "I'm not hungry." },
    { speaker: "You can store your belongings in a locker.", correct: "Great idea. Where are the lockers, and how much do they cost?", wrong1: "I'll carry everything.", wrong2: "Lockers are inconvenient." },
    { speaker: "The park closes at 10 PM tonight.", correct: "We have plenty of time! What rides do you recommend we hit before it gets dark?", wrong1: "That's early.", wrong2: "We'll leave when we want." },
  ],

  // ═══════════════════════════════════
  //  28. 동물병원 (Vet)
  // ═══════════════════════════════════
  vet: [
    { speaker: "What brings your pet in today?", correct: "My dog has been limping since yesterday, and he won't put weight on his back left leg.", wrong1: "He's sick.", wrong2: "I'm worried about him." },
    { speaker: "Is your pet up to date on vaccinations?", correct: "Yes, he had his annual shots last month. I brought his vaccination record.", wrong1: "I think so.", wrong2: "I don't remember." },
    { speaker: "We'll need to run some tests.", correct: "What tests do you recommend? And roughly how much will they cost?", wrong1: "Okay.", wrong2: "Is that necessary?" },
    { speaker: "Your cat needs to lose some weight.", correct: "What diet would you recommend? And how much exercise should she be getting daily?", wrong1: "She's not that heavy.", wrong2: "She likes to eat." },
    { speaker: "It's time for your puppy's first round of shots.", correct: "What vaccines will he be getting, and are there any side effects I should watch for?", wrong1: "Will it hurt?", wrong2: "He hates needles." },
    { speaker: "The surgery went well.", correct: "That's such a relief! When can I take her home, and what's the recovery plan?", wrong1: "Thank goodness.", wrong2: "Is she okay?" },
    { speaker: "You should give this medication twice daily.", correct: "Should I mix it with food, or give it directly? And for how many days?", wrong1: "He won't take medicine.", wrong2: "Okay." },
    { speaker: "Have you considered pet insurance?", correct: "I've been thinking about it. Which plan would you recommend for a young active dog?", wrong1: "It's too expensive.", wrong2: "I don't need it." },
    { speaker: "Your rabbit's teeth need to be trimmed.", correct: "Is that something you can do here today? How often should it be done?", wrong1: "His teeth are fine.", wrong2: "I didn't know that." },
    { speaker: "It looks like an allergic reaction.", correct: "What could be causing it? Should I change his food or environment?", wrong1: "Is it serious?", wrong2: "Dogs get allergies?" },
  ],

  // ═══════════════════════════════════
  //  29. 운전면허 (DMV)
  // ═══════════════════════════════════
  dmv: [
    { speaker: "Are you here for a new license or renewal?", correct: "A new license. I recently moved here and need to convert my foreign license.", wrong1: "A license.", wrong2: "I need to drive." },
    { speaker: "You'll need to pass a written test and a road test.", correct: "Can I take the written test today? And how do I schedule the road test?", wrong1: "That's a lot.", wrong2: "I already know how to drive." },
    { speaker: "Please bring two forms of identification.", correct: "I have my passport and a utility bill with my current address. Is that sufficient?", wrong1: "I have my ID.", wrong2: "Why two?" },
    { speaker: "The written test has 40 questions.", correct: "What's the passing score? And is there a study guide available?", wrong1: "I'll do my best.", wrong2: "That's a lot of questions." },
    { speaker: "You failed to check your mirrors before changing lanes.", correct: "I understand. I'll practice that more. Can I reschedule the test for next week?", wrong1: "I did check.", wrong2: "That's unfair." },
    { speaker: "Congratulations! You passed the test.", correct: "Thank you! When will I receive my actual license card? I have my temporary one.", wrong1: "Finally!", wrong2: "That was easy." },
    { speaker: "Your license needs to be renewed.", correct: "What documents do I need? And do I have to retake any tests?", wrong1: "I forgot about that.", wrong2: "My license is still fine." },
    { speaker: "Do you want to be an organ donor?", correct: "Yes, I'd like to register as an organ donor. Is it marked on the license?", wrong1: "I don't know.", wrong2: "What's that?" },
    { speaker: "Please read line 4 on the eye chart.", correct: "D, E, F, P, O, T, E, C. Is my vision okay for driving?", wrong1: "I can't see it.", wrong2: "The letters are small." },
    { speaker: "There's a $35 fee for the license.", correct: "Sure. Do you accept debit cards? And is there a separate fee for the road test?", wrong1: "That's expensive.", wrong2: "I'll pay." },
  ],

  // ═══════════════════════════════════
  //  30. 결혼식 (Wedding)
  // ═══════════════════════════════════
  wedding: [
    { speaker: "Congratulations on your big day!", correct: "Thank you so much! We're thrilled to celebrate with everyone here.", wrong1: "Thanks.", wrong2: "It's been stressful." },
    { speaker: "Where should I sit?", correct: "Bride's side is on the left, groom's on the right. There should be a place card with your name.", wrong1: "Anywhere.", wrong2: "I don't know." },
    { speaker: "Would you like to make a toast?", correct: "I'd be honored! I've prepared a few words about how the couple first met.", wrong1: "I'm not good at speeches.", wrong2: "Maybe later." },
    { speaker: "The ceremony was beautiful!", correct: "It really was! The vows they wrote themselves were so touching.", wrong1: "It was long.", wrong2: "I liked the music." },
    { speaker: "How do you know the bride?", correct: "We've been best friends since college. I was her roommate for three years!", wrong1: "We're friends.", wrong2: "I know her." },
    { speaker: "Would you like to sign the guest book?", correct: "Absolutely! I'd love to leave them a special message to remember this day.", wrong1: "Sure.", wrong2: "Where is it?" },
    { speaker: "What a lovely venue!", correct: "Isn't it gorgeous? They spent months finding this place. The garden is stunning.", wrong1: "It's nice.", wrong2: "It must be expensive." },
    { speaker: "The first dance is about to begin!", correct: "Oh, I can't wait to see it! Do you know what song they chose?", wrong1: "I don't dance.", wrong2: "Dancing is fun." },
    { speaker: "Would you like some wedding cake?", correct: "Yes, please! Is it the vanilla or chocolate tier? Both look amazing.", wrong1: "No thanks.", wrong2: "I love cake." },
    { speaker: "They're about to throw the bouquet!", correct: "Come on, let's get in position! This is going to be fun.", wrong1: "I'll pass.", wrong2: "I don't want to catch it." },
  ],

  // ═══════════════════════════════════
  //  31. 해변/리조트 (Beach Resort)
  // ═══════════════════════════════════
  beach: [
    { speaker: "Would you like to rent beach chairs and an umbrella?", correct: "Yes, for two, please. How much for the whole day, and can we pick our spot?", wrong1: "Just an umbrella.", wrong2: "I brought my own." },
    { speaker: "The water looks rough today.", correct: "Thanks for the warning. Are there any calmer areas safe for swimming?", wrong1: "I'll be fine.", wrong2: "I don't swim." },
    { speaker: "Would you like to try water sports?", correct: "What activities do you offer? I'm interested in snorkeling or kayaking.", wrong1: "No thanks.", wrong2: "I'm afraid of water." },
    { speaker: "Don't forget to apply sunscreen!", correct: "Good reminder! I brought SPF 50. Could you help me with my back?", wrong1: "I don't need it.", wrong2: "I want a tan." },
    { speaker: "The beach bar has happy hour from 4 to 6.", correct: "Perfect timing! What are the signature cocktails? Anything with fresh fruit?", wrong1: "I don't drink.", wrong2: "Cocktails are expensive." },
    { speaker: "Would you like a beachside massage?", correct: "That sounds heavenly! How much for a 60-minute session?", wrong1: "No thanks.", wrong2: "Massages are weird." },
    { speaker: "The sunset cruise departs at 5:30 PM.", correct: "We'd love to go! How long is the cruise, and does it include dinner?", wrong1: "Maybe tomorrow.", wrong2: "Cruises make me sick." },
    { speaker: "Watch out for jellyfish in this area.", correct: "Thank you for the heads up! Is there a first aid station nearby just in case?", wrong1: "I don't see any.", wrong2: "Jellyfish don't scare me." },
    { speaker: "Would you like to book a scuba diving lesson?", correct: "I've always wanted to try! Is it suitable for complete beginners?", wrong1: "I'm too scared.", wrong2: "Scuba diving is dangerous." },
    { speaker: "The resort pool is open until 10 PM.", correct: "Great! Is there a swim-up bar, and are towels provided poolside?", wrong1: "I prefer the beach.", wrong2: "Pools are boring." },
  ],

  // ═══════════════════════════════════
  //  32. 베이커리 (Bakery)
  // ═══════════════════════════════════
  bakery: [
    { speaker: "Good morning! Everything is fresh out of the oven.", correct: "It smells amazing! What do you recommend that's still warm?", wrong1: "I want bread.", wrong2: "Everything looks good." },
    { speaker: "Would you like to try a sample?", correct: "Yes, please! Is that the new sourdough? I've heard great things.", wrong1: "No thanks.", wrong2: "I'll just buy something." },
    { speaker: "We can make a custom cake for your event.", correct: "Wonderful! I need a two-tier cake for 30 people. What flavors do you offer?", wrong1: "I need a cake.", wrong2: "Custom cakes are expensive." },
    { speaker: "This is our gluten-free selection.", correct: "Great! My sister has celiac disease. Are these made in a separate area to avoid cross-contamination?", wrong1: "I don't need gluten-free.", wrong2: "Gluten-free tastes bad." },
    { speaker: "The croissants sell out by 10 AM.", correct: "Good to know! Can I place a standing order to pick up four every morning?", wrong1: "That's early.", wrong2: "I'll come earlier next time." },
    { speaker: "Would you like your bread sliced?", correct: "Yes, medium-thick slices, please. And could you double-bag it?", wrong1: "I'll slice it myself.", wrong2: "Just give it to me." },
    { speaker: "We also do wedding cakes.", correct: "Actually, my friend is getting married soon! Can I see your portfolio and price list?", wrong1: "I'm not getting married.", wrong2: "That's nice." },
    { speaker: "How many baguettes would you like?", correct: "Three, please. And throw in a dozen dinner rolls for the party tonight.", wrong1: "One is enough.", wrong2: "Just one." },
    { speaker: "Our pastry chef trained in Paris.", correct: "You can definitely taste the quality! The puff pastry is incredibly flaky.", wrong1: "That's impressive.", wrong2: "I prefer Korean bakeries." },
    { speaker: "We're closing in 10 minutes.", correct: "I'll be quick! Do you have any end-of-day discounts on what's left?", wrong1: "Already?", wrong2: "I need more time." },
  ],

  // ═══════════════════════════════════
  //  33. 캠핑장 (Campsite)
  // ═══════════════════════════════════
  camping: [
    { speaker: "Welcome to the campground! Do you have a reservation?", correct: "Yes, under Park for two nights. We requested a spot near the lake.", wrong1: "I want to camp.", wrong2: "I'm here to camp." },
    { speaker: "Campfires are allowed in designated areas only.", correct: "Understood. Where's the nearest fire pit, and is firewood available for purchase?", wrong1: "I'll be careful.", wrong2: "I brought my own fire." },
    { speaker: "Do you need help setting up your tent?", correct: "Actually, yes! This is our first time camping. Any tips for this terrain?", wrong1: "I can do it myself.", wrong2: "Tents are easy." },
    { speaker: "Bears have been spotted in the area.", correct: "Good to know! Should we store our food in bear canisters? Where can we get one?", wrong1: "I'm not worried.", wrong2: "Bears won't bother us." },
    { speaker: "The restrooms and showers are a 5-minute walk.", correct: "Is there hot water for the showers? And are they open 24 hours?", wrong1: "That's far.", wrong2: "I don't need showers." },
    { speaker: "Would you like to join the ranger-led night hike?", correct: "That sounds amazing! What time does it start, and should we bring flashlights?", wrong1: "Night hikes are scary.", wrong2: "I'll pass." },
    { speaker: "The fishing lake is stocked with trout.", correct: "Awesome! Do I need a fishing permit, and where can I buy bait?", wrong1: "I don't fish.", wrong2: "I'll just watch." },
    { speaker: "Quiet hours are from 10 PM to 7 AM.", correct: "No problem. We'll make sure to keep it down and put out our campfire by then.", wrong1: "That's early.", wrong2: "We'll be quiet." },
    { speaker: "There's a convenience store at the entrance.", correct: "Perfect! Do they sell ice and basic cooking supplies?", wrong1: "I brought everything.", wrong2: "I don't need anything." },
    { speaker: "The sunrise hike to the peak starts at 5 AM.", correct: "Count us in! How difficult is the trail, and should we bring water?", wrong1: "5 AM is too early.", wrong2: "I'll skip that." },
  ],

  // ═══════════════════════════════════
  //  34. 파티 (Party)
  // ═══════════════════════════════════
  party: [
    { speaker: "Hey! Glad you could make it!", correct: "Thanks for inviting me! Your place looks amazing. Can I put this wine somewhere?", wrong1: "Thanks.", wrong2: "I almost didn't come." },
    { speaker: "Let me introduce you to everyone.", correct: "That would be great! I don't know many people here yet.", wrong1: "I'm fine on my own.", wrong2: "I'm shy." },
    { speaker: "Would you like something to drink?", correct: "What do you have? I'd love something light — maybe a spritzer or a craft beer.", wrong1: "Water is fine.", wrong2: "Just give me anything." },
    { speaker: "The food is in the kitchen. Help yourself!", correct: "Everything looks delicious! Did you make all of this yourself?", wrong1: "I'm not hungry.", wrong2: "Okay, thanks." },
    { speaker: "Do you want to join our game of charades?", correct: "Absolutely! I love charades. Put me on whichever team needs help!", wrong1: "I don't like games.", wrong2: "I'll just watch." },
    { speaker: "So, what do you do for a living?", correct: "I'm a UX designer at a tech startup. We build educational apps. How about you?", wrong1: "I work.", wrong2: "That's personal." },
    { speaker: "The DJ is about to start!", correct: "Awesome! I hope they play some 90s hits. Want to grab a spot near the dance floor?", wrong1: "I don't dance.", wrong2: "Music is loud." },
    { speaker: "Happy birthday! Make a wish!", correct: "Here goes nothing! Okay, don't tell anyone, but I wished for a vacation!", wrong1: "Thanks.", wrong2: "I don't believe in wishes." },
    { speaker: "It's getting late. Do you need a ride home?", correct: "That's really kind of you! If it's not too far out of your way, I'd appreciate it.", wrong1: "I'll take a taxi.", wrong2: "I'm fine." },
    { speaker: "We should do this again soon!", correct: "Definitely! Next time, let's try that new rooftop bar downtown. I'll organize it!", wrong1: "Maybe.", wrong2: "We'll see." },
  ],

  // ═══════════════════════════════════
  //  35. 세탁소 (Dry Cleaner)
  // ═══════════════════════════════════
  dryclean: [
    { speaker: "What would you like cleaned?", correct: "I have three dress shirts and a wool suit that need dry cleaning.", wrong1: "These clothes.", wrong2: "Everything." },
    { speaker: "There's a stain on this shirt. Do you know what it is?", correct: "I think it's red wine from last night's dinner. Can you get it out?", wrong1: "I don't know.", wrong2: "I didn't notice it." },
    { speaker: "When do you need these back?", correct: "Is there a same-day service? I have an important meeting tomorrow morning.", wrong1: "Whenever.", wrong2: "As soon as possible." },
    { speaker: "This fabric is very delicate.", correct: "I understand. Please use the gentlest process available. It's a silk blend.", wrong1: "Just wash it.", wrong2: "It'll be fine." },
    { speaker: "Would you like starch in your shirts?", correct: "Light starch, please, on the collars and cuffs only.", wrong1: "No starch.", wrong2: "What's starch?" },
    { speaker: "We also offer alterations.", correct: "Actually, I need these pants hemmed about an inch. How much would that be?", wrong1: "I don't need that.", wrong2: "Alterations are expensive." },
    { speaker: "Your total is $42.", correct: "Here's my card. Do you have a punch card for frequent customers?", wrong1: "That's expensive.", wrong2: "I'll pay." },
    { speaker: "We found a pen in your jacket pocket.", correct: "Oh, thank you for checking! I always forget to empty my pockets.", wrong1: "Keep it.", wrong2: "That's my pen." },
    { speaker: "The suit will be ready by Thursday.", correct: "Can I get it by Wednesday instead? I'll pay extra for rush service.", wrong1: "Thursday is fine.", wrong2: "I need it today." },
    { speaker: "Would you like hangers or folded?", correct: "Hangers for the suit and shirts, please. And could you put the shirts in garment bags?", wrong1: "Either way.", wrong2: "I don't care." },
  ]
};

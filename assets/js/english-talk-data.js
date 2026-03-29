/* ═══════════════════════════════════════════════
   English Conversation / Talk Data
   리듬 영어 회화 — 상황별 대화 데이터
   레벨: 초등 / 중등 / 고등 / 대학
   ═══════════════════════════════════════════════ */

const talkDataset = [
  // ═══════════════════════════════════
  //  초등 (Elementary)
  // ═══════════════════════════════════

  // ── 인사/소개 ──
  { situation: "🙋 길에서 인사", speaker: "Hi! How are you?", correct: "I'm fine, thank you!", wrong1: "I'm twelve years old.", wrong2: "It's Monday.", level: "초등", category: "인사" },
  { situation: "🙋 첫 만남", speaker: "Nice to meet you!", correct: "Nice to meet you too!", wrong1: "See you later!", wrong2: "You're welcome.", level: "초등", category: "인사" },
  { situation: "🙋 이름 묻기", speaker: "What's your name?", correct: "My name is Luna.", wrong1: "I'm from Korea.", wrong2: "I like pizza.", level: "초등", category: "인사" },
  { situation: "🙋 어디 출신?", speaker: "Where are you from?", correct: "I'm from Korea.", wrong1: "I'm fine.", wrong2: "It's 3 o'clock.", level: "초등", category: "인사" },
  { situation: "🙋 나이 묻기", speaker: "How old are you?", correct: "I'm twelve years old.", wrong1: "I'm from Seoul.", wrong2: "My name is Luna.", level: "초등", category: "인사" },
  { situation: "👋 헤어질 때", speaker: "Goodbye! See you tomorrow!", correct: "Bye! See you!", wrong1: "Nice to meet you.", wrong2: "How are you?", level: "초등", category: "인사" },
  { situation: "🌅 아침 인사", speaker: "Good morning!", correct: "Good morning!", wrong1: "Good night!", wrong2: "Goodbye!", level: "초등", category: "인사" },

  // ── 감사/사과 ──
  { situation: "🎁 선물 받기", speaker: "Here's a gift for you!", correct: "Thank you so much!", wrong1: "I'm sorry.", wrong2: "See you later.", level: "초등", category: "감사" },
  { situation: "🙏 감사 인사 받기", speaker: "Thank you for your help!", correct: "You're welcome!", wrong1: "I'm fine.", wrong2: "Nice to meet you.", level: "초등", category: "감사" },
  { situation: "😰 사과하기", speaker: "I'm sorry I'm late.", correct: "That's okay. Don't worry!", wrong1: "Thank you!", wrong2: "How are you?", level: "초등", category: "사과" },
  { situation: "💥 부딪혔을 때", speaker: "Oh! I'm so sorry!", correct: "No problem!", wrong1: "Thank you!", wrong2: "See you!", level: "초등", category: "사과" },

  // ── 날씨/시간 ──
  { situation: "☀️ 날씨 이야기", speaker: "How's the weather today?", correct: "It's sunny and warm!", wrong1: "It's 10 o'clock.", wrong2: "I like apples.", level: "초등", category: "날씨" },
  { situation: "🌧️ 비 오는 날", speaker: "It's raining outside!", correct: "Let's bring an umbrella.", wrong1: "I'm hungry.", wrong2: "It's Monday.", level: "초등", category: "날씨" },
  { situation: "⏰ 시간 묻기", speaker: "What time is it?", correct: "It's three o'clock.", wrong1: "It's sunny.", wrong2: "It's Tuesday.", level: "초등", category: "시간" },
  { situation: "📅 요일 묻기", speaker: "What day is it today?", correct: "It's Wednesday.", wrong1: "It's 5 o'clock.", wrong2: "It's sunny.", level: "초등", category: "시간" },

  // ── 음식/쇼핑 ──
  { situation: "🍕 음식 주문", speaker: "What would you like to eat?", correct: "I'd like a pizza, please.", wrong1: "I'm fine, thank you.", wrong2: "It's raining.", level: "초등", category: "음식" },
  { situation: "🥤 음료 주문", speaker: "What do you want to drink?", correct: "Orange juice, please.", wrong1: "I like dogs.", wrong2: "It's Monday.", level: "초등", category: "음식" },
  { situation: "😋 맛있냐고 물을 때", speaker: "Is it delicious?", correct: "Yes, it's very yummy!", wrong1: "No, I'm not hungry.", wrong2: "It's three o'clock.", level: "초등", category: "음식" },
  { situation: "💰 가격 묻기", speaker: "How much is this?", correct: "It's five dollars.", wrong1: "It's five o'clock.", wrong2: "I'm five years old.", level: "초등", category: "쇼핑" },

  // ── 취미/좋아하는 것 ──
  { situation: "🎮 취미 묻기", speaker: "What's your hobby?", correct: "I like playing soccer.", wrong1: "I'm from Korea.", wrong2: "It's sunny.", level: "초등", category: "취미" },
  { situation: "🐶 좋아하는 동물", speaker: "Do you like animals?", correct: "Yes! I love dogs.", wrong1: "I'm twelve.", wrong2: "It's Monday.", level: "초등", category: "취미" },
  { situation: "🎨 좋아하는 색", speaker: "What's your favorite color?", correct: "I like blue the best!", wrong1: "I like pizza.", wrong2: "It's 3 o'clock.", level: "초등", category: "취미" },
  { situation: "📚 좋아하는 과목", speaker: "What subject do you like?", correct: "I like math and art.", wrong1: "I go to school.", wrong2: "I'm from Korea.", level: "초등", category: "취미" },

  // ── 장소/길 ──
  { situation: "🗺️ 길 묻기", speaker: "Excuse me, where is the library?", correct: "Go straight and turn left.", wrong1: "It's 2 o'clock.", wrong2: "I like books.", level: "초등", category: "길찾기" },
  { situation: "🚌 버스 묻기", speaker: "Which bus goes to the park?", correct: "Take bus number 5.", wrong1: "The park is pretty.", wrong2: "I like the park.", level: "초등", category: "길찾기" },
  { situation: "🏫 학교 이야기", speaker: "Do you like school?", correct: "Yes, I love my school!", wrong1: "School is big.", wrong2: "I go to school by bus.", level: "초등", category: "학교" },

  // ── 가족/일상 ──
  { situation: "👨‍👩‍👧 가족 소개", speaker: "Tell me about your family.", correct: "I have a mom, dad, and a sister.", wrong1: "I like my family.", wrong2: "My family is big.", level: "초등", category: "가족" },
  { situation: "🏠 집에서", speaker: "What are you doing at home?", correct: "I'm reading a book.", wrong1: "I live in Korea.", wrong2: "My house is nice.", level: "초등", category: "일상" },
  { situation: "📱 전화 받기", speaker: "Hello? May I speak to Luna?", correct: "Speaking! Who's calling?", wrong1: "Hello, how are you?", wrong2: "I don't have a phone.", level: "초등", category: "전화" },

  // ═══════════════════════════════════
  //  중등 (Middle School)
  // ═══════════════════════════════════

  // ── 의견/동의 ──
  { situation: "💭 의견 묻기", speaker: "What do you think about this movie?", correct: "I think it was really exciting!", wrong1: "I went to the movies.", wrong2: "Movies are expensive.", level: "중등", category: "의견" },
  { situation: "🤝 동의 구하기", speaker: "Don't you think we should study harder?", correct: "I totally agree with you.", wrong1: "I study every day.", wrong2: "Studying is difficult.", level: "중등", category: "의견" },
  { situation: "🤔 반대 의견", speaker: "I think social media is a waste of time.", correct: "I see your point, but I disagree.", wrong1: "I use social media.", wrong2: "Social media is fun.", level: "중등", category: "의견" },
  { situation: "💡 제안하기", speaker: "What should we do this weekend?", correct: "How about going hiking?", wrong1: "I'm busy on weekdays.", wrong2: "The weekend is Saturday.", level: "중등", category: "제안" },

  // ── 레스토랑/카페 ──
  { situation: "☕ 카페 주문", speaker: "What can I get for you today?", correct: "I'll have a latte, please.", wrong1: "I come here often.", wrong2: "The coffee is hot.", level: "중등", category: "주문" },
  { situation: "🍽️ 레스토랑 예약", speaker: "Do you have a reservation?", correct: "Yes, under the name Kim.", wrong1: "I like this restaurant.", wrong2: "The food is delicious here.", level: "중등", category: "주문" },
  { situation: "🍽️ 추천 요청", speaker: "What do you recommend?", correct: "The pasta here is amazing!", wrong1: "I had lunch already.", wrong2: "I usually eat rice.", level: "중등", category: "주문" },
  { situation: "💳 계산할 때", speaker: "Would you like to pay by cash or card?", correct: "By card, please.", wrong1: "It's too expensive.", wrong2: "I don't have money.", level: "중등", category: "주문" },

  // ── 여행/교통 ──
  { situation: "✈️ 공항에서", speaker: "May I see your passport, please?", correct: "Here you go.", wrong1: "I'm going to Japan.", wrong2: "I like traveling.", level: "중등", category: "여행" },
  { situation: "🏨 호텔 체크인", speaker: "Do you have a reservation?", correct: "Yes, I booked a room online.", wrong1: "Hotels are expensive.", wrong2: "I need a hotel.", level: "중등", category: "여행" },
  { situation: "🚕 택시에서", speaker: "Where would you like to go?", correct: "To Seoul Station, please.", wrong1: "I like riding taxis.", wrong2: "Taxis are yellow.", level: "중등", category: "교통" },
  { situation: "🗺️ 관광 안내소", speaker: "Can I help you find something?", correct: "I'm looking for a good restaurant nearby.", wrong1: "I'm a tourist.", wrong2: "This city is nice.", level: "중등", category: "여행" },

  // ── 건강/병원 ──
  { situation: "🤒 아플 때", speaker: "What seems to be the problem?", correct: "I have a terrible headache.", wrong1: "I don't like hospitals.", wrong2: "I came by bus.", level: "중등", category: "건강" },
  { situation: "💊 약국에서", speaker: "Do you need anything else?", correct: "Do you have any cold medicine?", wrong1: "I feel fine now.", wrong2: "Medicine is bitter.", level: "중등", category: "건강" },
  { situation: "🏥 증상 설명", speaker: "How long have you had this cough?", correct: "For about three days.", wrong1: "I don't like coughing.", wrong2: "Coughing is annoying.", level: "중등", category: "건강" },

  // ── 학교/공부 ──
  { situation: "📝 시험 이야기", speaker: "How was your exam?", correct: "It was harder than I expected.", wrong1: "I studied a lot.", wrong2: "Exams are important.", level: "중등", category: "학교" },
  { situation: "📖 숙제 도움", speaker: "Could you help me with my homework?", correct: "Sure, what do you need help with?", wrong1: "I already finished mine.", wrong2: "Homework is boring.", level: "중등", category: "학교" },
  { situation: "🎓 진로 상담", speaker: "What do you want to be when you grow up?", correct: "I want to be a software engineer.", wrong1: "I like computers.", wrong2: "Growing up is scary.", level: "중등", category: "학교" },

  // ── 감정 표현 ──
  { situation: "😊 기쁜 소식", speaker: "I passed the entrance exam!", correct: "Congratulations! I'm so happy for you!", wrong1: "Exams are difficult.", wrong2: "I also took an exam.", level: "중등", category: "감정" },
  { situation: "😢 위로하기", speaker: "I failed my driving test...", correct: "I'm sorry to hear that. You'll pass next time!", wrong1: "Driving is hard.", wrong2: "I can't drive either.", level: "중등", category: "감정" },
  { situation: "😤 불만 표현", speaker: "This food tastes terrible!", correct: "Should we ask for a different dish?", wrong1: "I'm not hungry.", wrong2: "Food is expensive.", level: "중등", category: "감정" },

  // ── 전화/약속 ──
  { situation: "📞 전화 걸기", speaker: "Hello, is this the customer service center?", correct: "Yes, how may I help you?", wrong1: "I don't work here.", wrong2: "Please call back later.", level: "중등", category: "전화" },
  { situation: "📅 약속 잡기", speaker: "Are you free this Saturday?", correct: "Let me check my schedule... Yes, I'm free!", wrong1: "Saturday is a weekend.", wrong2: "I like Saturdays.", level: "중등", category: "약속" },
  { situation: "⏰ 약속 변경", speaker: "Can we reschedule our meeting?", correct: "Sure, when works better for you?", wrong1: "I don't like meetings.", wrong2: "Meetings are long.", level: "중등", category: "약속" },

  // ── 쇼핑 ──
  { situation: "👕 옷가게", speaker: "Can I try this on?", correct: "Of course! The fitting room is over there.", wrong1: "I like this shirt.", wrong2: "Clothes are important.", level: "중등", category: "쇼핑" },
  { situation: "🔄 교환/환불", speaker: "I'd like to return this item.", correct: "Do you have the receipt?", wrong1: "I bought it yesterday.", wrong2: "It's too small.", level: "중등", category: "쇼핑" },
  { situation: "🏷️ 할인 묻기", speaker: "Is there any discount on this?", correct: "It's 20% off this week.", wrong1: "I want a discount.", wrong2: "It's too expensive.", level: "중등", category: "쇼핑" },

  // ── 일상 대화 ──
  { situation: "🌤️ 스몰토크", speaker: "Beautiful weather today, isn't it?", correct: "Yes! Perfect for a walk outside.", wrong1: "I checked the forecast.", wrong2: "Weather changes a lot.", level: "중등", category: "일상" },
  { situation: "🏃 운동 이야기", speaker: "Do you exercise regularly?", correct: "I try to jog three times a week.", wrong1: "Exercise is healthy.", wrong2: "I don't like running.", level: "중등", category: "일상" },
  { situation: "📺 드라마 이야기", speaker: "Have you seen the new Netflix series?", correct: "Not yet, but I've heard it's really good!", wrong1: "I watch Netflix.", wrong2: "Netflix is expensive.", level: "중등", category: "일상" },

  // ═══════════════════════════════════
  //  고등 (High School)
  // ═══════════════════════════════════

  // ── 토론/논쟁 ──
  { situation: "🎤 토론 시작", speaker: "Do you think AI will replace human jobs?", correct: "To some extent, but it'll also create new opportunities.", wrong1: "AI is a type of technology.", wrong2: "I use AI every day.", level: "고등", category: "토론" },
  { situation: "📊 근거 제시", speaker: "What evidence supports your claim?", correct: "According to recent studies, over 70% of experts agree.", wrong1: "I read it somewhere.", wrong2: "Many people say so.", level: "고등", category: "토론" },
  { situation: "⚖️ 양면 보기", speaker: "What are the pros and cons of social media?", correct: "It connects people globally, but can harm mental health.", wrong1: "I use Instagram.", wrong2: "Social media is popular.", level: "고등", category: "토론" },
  { situation: "🔄 반론하기", speaker: "Climate change isn't that serious.", correct: "I'd have to respectfully disagree — the data shows otherwise.", wrong1: "Climate change is real.", wrong2: "It's getting hotter.", level: "고등", category: "토론" },

  // ── 면접/발표 ──
  { situation: "💼 면접 자기소개", speaker: "Tell me about yourself.", correct: "I'm a dedicated student with a passion for technology.", wrong1: "My name is Kim.", wrong2: "I'm from Korea.", level: "고등", category: "면접" },
  { situation: "💪 강점 묻기", speaker: "What's your greatest strength?", correct: "I'm a quick learner who adapts well to new situations.", wrong1: "I'm good at many things.", wrong2: "I work hard.", level: "고등", category: "면접" },
  { situation: "❓ 질문 있냐고", speaker: "Do you have any questions for us?", correct: "Yes, could you tell me about the team culture here?", wrong1: "No, I don't.", wrong2: "When do I start?", level: "고등", category: "면접" },
  { situation: "📈 발표 마무리", speaker: "That concludes my presentation. Any questions?", correct: "Thank you. I'd be happy to elaborate on any point.", wrong1: "I'm done talking.", wrong2: "That was my presentation.", level: "고등", category: "발표" },

  // ── 학술/연구 ──
  { situation: "🔬 연구 논의", speaker: "What methodology did you use for your research?", correct: "We conducted a mixed-methods approach with surveys and interviews.", wrong1: "We did some research.", wrong2: "I used the internet.", level: "고등", category: "학술" },
  { situation: "📄 논문 설명", speaker: "Can you summarize your thesis?", correct: "My thesis examines the correlation between sleep patterns and academic performance.", wrong1: "It's about sleep.", wrong2: "I wrote a long paper.", level: "고등", category: "학술" },

  // ── 비즈니스 ──
  { situation: "🤝 비즈니스 미팅", speaker: "Shall we get down to business?", correct: "Absolutely. Let me start with the quarterly report.", wrong1: "I'm ready.", wrong2: "Business is important.", level: "고등", category: "비즈니스" },
  { situation: "📧 이메일 논의", speaker: "Did you get my email about the proposal?", correct: "Yes, I reviewed it. I have a few suggestions.", wrong1: "I check email every day.", wrong2: "Emails are important.", level: "고등", category: "비즈니스" },
  { situation: "💰 협상하기", speaker: "Your price is a bit higher than we expected.", correct: "I understand. Let me see what we can do to find a middle ground.", wrong1: "It's not expensive.", wrong2: "That's our price.", level: "고등", category: "비즈니스" },

  // ── 문화/사회 ──
  { situation: "🌍 문화 차이", speaker: "What cultural differences have you noticed?", correct: "I've found that communication styles vary significantly across cultures.", wrong1: "Korea is different.", wrong2: "I noticed many things.", level: "고등", category: "문화" },
  { situation: "🗳️ 사회 문제", speaker: "What do you think about the education system?", correct: "I believe it needs reform to focus more on critical thinking.", wrong1: "Education is important.", wrong2: "I go to school.", level: "고등", category: "사회" },
  { situation: "🌱 환경 이야기", speaker: "How can we reduce our carbon footprint?", correct: "We could start by using public transportation and reducing waste.", wrong1: "The environment is important.", wrong2: "I recycle sometimes.", level: "고등", category: "환경" },

  // ── 복잡한 상황 ──
  { situation: "😓 실수 사과", speaker: "I accidentally sent the email to the wrong person!", correct: "Don't panic. Send a follow-up explaining the mistake right away.", wrong1: "That's your problem.", wrong2: "Emails are tricky.", level: "고등", category: "상황" },
  { situation: "🎭 오해 해소", speaker: "I think there's been a misunderstanding.", correct: "Let's clarify — what I meant to say was...", wrong1: "I didn't say anything.", wrong2: "You misunderstood me.", level: "고등", category: "상황" },
  { situation: "🤷 모를 때", speaker: "What's the capital of Burkina Faso?", correct: "I'm not sure off the top of my head. Let me look it up.", wrong1: "I don't know.", wrong2: "Is it in Africa?", level: "고등", category: "상황" },

  // ═══════════════════════════════════
  //  대학 (University)
  // ═══════════════════════════════════

  // ── 학술 토론 ──
  { situation: "🎓 세미나 질문", speaker: "How does your hypothesis account for the outlier data?", correct: "That's a valid point. We attribute the outliers to sampling bias, which we address in section 4.", wrong1: "We ignored those data points.", wrong2: "There were some outliers.", level: "대학", category: "학술" },
  { situation: "📚 이론 비교", speaker: "How does your framework differ from Smith's theory?", correct: "While Smith focuses on structural factors, our model incorporates behavioral economics.", wrong1: "Our theory is better.", wrong2: "Smith is wrong.", level: "대학", category: "학술" },
  { situation: "🔍 방법론 질의", speaker: "Isn't your sample size too small to draw meaningful conclusions?", correct: "The sample size meets the statistical threshold for significance at the 95% confidence level.", wrong1: "We used enough people.", wrong2: "The sample was fine.", level: "대학", category: "학술" },

  // ── 고급 비즈니스 ──
  { situation: "📊 투자 미팅", speaker: "What's your projected ROI for this venture?", correct: "Based on our conservative estimates, we project a 15% ROI within 18 months.", wrong1: "We'll make money.", wrong2: "The ROI will be good.", level: "대학", category: "비즈니스" },
  { situation: "🌐 글로벌 전략", speaker: "How do you plan to scale internationally?", correct: "We're adopting a phased approach, starting with Southeast Asian markets where we have existing partnerships.", wrong1: "We'll go to other countries.", wrong2: "International business is good.", level: "대학", category: "비즈니스" },

  // ── 철학적 대화 ──
  { situation: "🧠 철학 토론", speaker: "Do you think free will truly exists?", correct: "It depends on how we define it — compatibilism offers a compelling middle ground.", wrong1: "Yes, I think so.", wrong2: "That's a hard question.", level: "대학", category: "철학" },
  { situation: "🤖 윤리 논쟁", speaker: "Should autonomous vehicles prioritize passengers or pedestrians?", correct: "This is essentially a modern trolley problem — we need transparent ethical frameworks rather than ad hoc decisions.", wrong1: "Passengers are more important.", wrong2: "That's a difficult question.", level: "대학", category: "윤리" },

  // ── 외교/격식 ──
  { situation: "🏛️ 격식 연설", speaker: "Would you like to address the assembly?", correct: "Thank you, Chairperson. Distinguished delegates, I'd like to raise a point regarding...", wrong1: "Sure, I'll talk now.", wrong2: "Okay, listen everyone.", level: "대학", category: "격식" },
  { situation: "🎖️ 감사 연설", speaker: "We'd like you to say a few words.", correct: "I'm deeply honored. I'd like to express my sincere gratitude to everyone who made this possible.", wrong1: "Thanks everyone.", wrong2: "I'm happy to be here.", level: "대학", category: "격식" },
  { situation: "📜 공식 항의", speaker: "We find these terms unacceptable.", correct: "We appreciate your concerns and propose we revisit the terms with both parties' interests in mind.", wrong1: "That's not our problem.", wrong2: "We don't agree either.", level: "대학", category: "격식" },
];

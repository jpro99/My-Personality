import { COLOR_ORDER } from '../lib/constants.js';

/**
 * Extended coaching content for every color — teamwork scenarios,
 * marriage/relationship depth, weak-spot growth, and cross-color friction.
 */
export const colorDepth = {
  blue: {
    meaning:
      'Blue is the heart color. Blues lead with people, feelings, harmony, and meaning. They notice who is included, hurt, or disconnected before they notice the agenda.',
    teamwork: {
      intro:
        'On a team, Blue brings emotional intelligence. They keep the group human, catch morale problems early, and help people feel safe enough to contribute honestly.',
      strengths: [
        'Builds trust quickly and helps quieter voices speak up.',
        'Notices tension before it becomes open conflict.',
        'Reminds the team why the work matters to people.',
      ],
      limits: [
        'May avoid hard conversations to protect feelings.',
        'Can take feedback personally when tone feels cold.',
        'May slow decisions while checking how everyone feels.',
      ],
      bestRole: 'Connector, encourager, morale-builder, mentor, peacemaker.',
      scenarios: [
        'Project meeting: Blue asks whether the plan feels fair to everyone — that question can prevent resentment later.',
        'Group conflict: Blue often mediates first, but needs permission to name problems directly, not only soothe.',
        'Deadline crunch: Blue may carry stress about team relationships; pair them with Gold for structure without shame.',
      ],
      frustrations: {
        gold: 'Gold can feel “cold” or rule-heavy to Blue when feelings are skipped. Blue may think Gold does not care; Gold may think Blue is avoiding the task.',
        green: 'Green’s logical distance can feel like rejection. Blue wants warmth; Green wants accuracy — both need translation time.',
        orange: 'Orange moves fast and blunt. Blue may feel run over or unheard when Orange pushes action before emotional check-in.',
      },
      whenYouAreThis:
        'This is you on a team: you likely notice morale first. Your frustration may show up when teammates seem dismissive of people, rush past feelings, or treat relationships as “extra.” You add value when the team remembers the humans in the room.',
    },
    relationships: {
      marriageIntro:
        'In marriage or close partnership, Blue needs emotional safety, sincerity, and time to process feelings together.',
      needs: [
        'Honest words with kind tone — not silence or guessing games.',
        'Regular emotional check-ins, not only task talk.',
        'Reassurance that the relationship matters as much as goals.',
      ],
      gives: [
        'Deep loyalty, empathy, encouragement, and attentiveness.',
        'Remembers what matters to the partner emotionally.',
        'Works hard to keep harmony and repair after conflict.',
      ],
      conflictPatterns: [
        'Withdraws or agrees outwardly while hurting inwardly.',
        'May expect mind-reading instead of stating needs clearly.',
        'Can absorb partner stress until emotionally exhausted.',
      ],
      withSpouse: {
        gold: 'Blue + Gold marriage works when Gold softens delivery and Blue states needs directly. Schedule both feeling-talk and planning-talk.',
        green: 'Blue + Green needs Green to show care in words, not only logic. Blue needs space to feel without being “fixed” too fast.',
        orange: 'Blue + Orange needs Orange to slow tone and Blue to say what is needed without long hints. Adventure plus reassurance balances well.',
      },
    },
    growth: {
      whenStrong:
        'When Blue is a strength, keep empathy — but add directness, boundaries, and facts so your care lands as help, not only comfort.',
      whenWeak:
        'If Blue is your lowest score, relationships may still matter to you — but you may not naturally pause for feelings, inclusion, or encouragement. Learning Blue skills helps marriage, parenting, and teams: ask how people are doing, name appreciation, and check impact on others before deciding.',
      comfortZone: 'Staying kind and keeping peace even when a hard truth is needed.',
      stretchPractice: [
        'Before a decision, ask: “Who could this affect emotionally?”',
        'Practice one direct sentence: “What I need is…”',
        'Pair with a Blue-strong friend and debrief a conflict aloud.',
      ],
    },
    deepDive: {
      coreMotivation: 'To be real, connected, and meaningful with people.',
      underStress: 'May cry, withdraw, or over-personalize; needs reassurance without being patronized.',
      misread: '“Too sensitive” — often actually accurate emotional reading.',
      workplace: 'Best in roles needing trust, coaching, care, or culture-building.',
      parenting: 'Warm and attentive; watch for over-carrying children’s emotions.',
    },
  },

  gold: {
    meaning:
      'Gold is the order color. Golds lead with responsibility, structure, follow-through, and “the right way.” They create stability others can depend on.',
    teamwork: {
      intro:
        'On a team, Gold is the backbone of execution. They clarify roles, protect standards, and make sure promises become results.',
      strengths: [
        'Creates plans, timelines, and accountability.',
        'Remembers details others forget.',
        'Keeps the team from drifting or quitting early.',
      ],
      limits: [
        'May resist last-minute changes.',
        'Can sound critical when protecting quality.',
        'May undervalue brainstorming that looks messy at first.',
      ],
      bestRole: 'Organizer, scheduler, process owner, finisher, standards keeper.',
      scenarios: [
        'Group project: Gold writes the checklist — without them, ideas may never ship.',
        'Chaotic teammate: Gold frustration rises when others miss deadlines or ignore agreements.',
        'Brainstorm session: Gold may push for closure too early; team benefits when Gold joins after ideas are heard.',
      ],
      frustrations: {
        blue: 'Blue may focus on feelings when Gold wants action. Gold thinks Blue stalls; Blue thinks Gold is harsh.',
        green: 'Green questions the plan; Gold may hear that as disrespect for rules. Both want quality — different paths.',
        orange: 'Orange improvises and breaks process. Gold sees risk; Orange sees opportunity. Needs clear limits.',
      },
      whenYouAreThis:
        'This is you on a team: you likely care about clarity and follow-through. You may get frustrated when teammates are late, vague, or careless with commitments. Teams need your structure — but flexibility is a skill worth adding.',
    },
    relationships: {
      marriageIntro:
        'In marriage, Gold needs reliability, clear roles, and trust that words match actions.',
      needs: [
        'Follow-through on agreements about time, money, and responsibilities.',
        'Respect for plans and shared standards.',
        'Direct communication instead of chaos or surprises.',
      ],
      gives: [
        'Stability, loyalty, practical care, and dependable support.',
        'Protects the family or partnership through planning.',
        'Shows love through service and responsibility.',
      ],
      conflictPatterns: [
        'May sound controlling when trying to create safety.',
        'Can confuse preference with moral principle.',
        'May carry mental lists of what still is not done.',
      ],
      withSpouse: {
        blue: 'Gold + Blue: agree on how to talk about problems — feelings first or plan first — then alternate.',
        green: 'Gold + Green: align on what “good enough” means so perfection debates do not erode warmth.',
        orange: 'Gold + Orange: set freedom within boundaries — spontaneity with agreed limits on money, time, and risk.',
      },
    },
    growth: {
      whenStrong:
        'When Gold is strong, keep standards — but practice flexibility, curiosity, and emotional check-ins before enforcing rules.',
      whenWeak:
        'If Gold is your lowest score, you may resist routines, deadlines, or detailed planning. Learning Gold skills helps every relationship and job: show up on time, keep small promises, and clarify who does what. Partners and teams trust Gold energy even when it is not your nature.',
      comfortZone: 'Doing things the proven way and correcting what feels sloppy.',
      stretchPractice: [
        'When plans change, ask: “What still matters most?” instead of “This is wrong.”',
        'Before correcting someone, ask how they feel about the situation.',
        'Try one imperfect draft before polishing — especially with Orange or Green teammates.',
      ],
    },
    deepDive: {
      coreMotivation: 'To be responsible, prepared, and trustworthy.',
      underStress: 'May become rigid, critical, or anxious about undone tasks.',
      misread: '“Controlling” — often actually trying to protect people through order.',
      workplace: 'Excel in operations, admin, teaching structure, healthcare routines, finance, logistics.',
      parenting: 'Consistent and protective; watch for inflexibility as kids grow.',
    },
  },

  green: {
    meaning:
      'Green is the mind color. Greens lead with logic, competence, questions, and deep understanding. They want things to make sense before they feel right or move fast.',
    teamwork: {
      intro:
        'On a team, Green raises quality. They test ideas, spot weak reasoning, and help the group avoid expensive mistakes.',
      strengths: [
        'Improves plans with better questions and analysis.',
        'Brings originality and systems thinking.',
        'Stays calm when others panic — thinks first.',
      ],
      limits: [
        'May seem detached or overly critical.',
        'Can over-research and under-act.',
        'May frustrate teammates who want quick consensus.',
      ],
      bestRole: 'Analyst, strategist, researcher, inventor, quality reviewer.',
      scenarios: [
        'Team debate: Green asks the question nobody wanted — it is often the most important one.',
        'Fast-moving group: Green may disengage if logic is ignored; invite their input early.',
        'Presentation: Green helps simplify complex ideas — if given time to translate, not only critique.',
      ],
      frustrations: {
        blue: 'Blue wants emotional validation; Green offers solutions. Blue feels unheard; Green feels misunderstood.',
        gold: 'Gold wants procedure; Green wants proof. Both can get rigid — one on rules, one on accuracy.',
        orange: 'Orange acts before Green is ready. Green sees risk; Orange sees progress. Needs agreed “good enough to try.”',
      },
      whenYouAreThis:
        'This is you on a team: you likely care whether ideas are smart and true. Frustration shows when meetings feel shallow, emotional, or rushed past facts. You help teams think — practice warmth so people invite your brain back in.',
    },
    relationships: {
      marriageIntro:
        'In marriage, Green needs respect for their mind, space to think, and conversations that make sense.',
      needs: [
        'Room to process before answering big questions.',
        'Intellectual honesty without drama or manipulation.',
        'Partners who do not punish silence as “not caring.”',
      ],
      gives: [
        'Insight, problem-solving, steady perspective, and loyalty through competence.',
        'Helps the couple make wise long-term choices.',
        'Shows love by understanding and improving shared life.',
      ],
      conflictPatterns: [
        'Withdraws into analysis or sarcasm under stress.',
        'May win arguments and lose connection.',
        'Can forget that feelings are data too.',
      ],
      withSpouse: {
        blue: 'Green + Blue: Green must say caring words; Blue must not treat questions as rejection.',
        gold: 'Green + Gold: schedule both planning and play — avoid endless optimization of the relationship.',
        orange: 'Green + Orange: agree on when to decide vs. when to research — timers help.',
      },
    },
    growth: {
      whenStrong:
        'When Green is strong, keep your mind — add warmth, simpler words, and timely action so others benefit from your insight.',
      whenWeak:
        'If Green is your lowest score, you may decide quickly on gut, habit, or emotion without deep analysis. Learning Green skills helps careers and marriage: ask why, check assumptions, and explain your reasoning. Partners feel respected when you think with them, not only react.',
      comfortZone: 'Staying in your head where things feel clear and controllable.',
      stretchPractice: [
        'Before disagreeing, say one validating sentence.',
        'Explain an idea in half the words you normally use.',
        'Set a timer: decide when it rings, even if data is incomplete.',
      ],
    },
    deepDive: {
      coreMotivation: 'To understand, improve, and be competent.',
      underStress: 'Pulls back, overthinks, or uses sharp logic as armor.',
      misread: '“Argumentative” — often serious engagement and curiosity.',
      workplace: 'Strong in STEM, strategy, law, engineering, research, quality roles.',
      parenting: 'Teaches thinking well; watch for emotional distance.',
    },
  },

  orange: {
    meaning:
      'Orange is the action color. Oranges lead with energy, courage, movement, and results. They learn by doing and often unlock momentum when others are stuck.',
    teamwork: {
      intro:
        'On a team, Orange is the spark plug. They push forward, volunteer first, and help groups stop circling and start moving.',
      strengths: [
        'Creates energy and confidence in the room.',
        'Handles crisis and change with adaptability.',
        'Cuts through overthinking with practical next steps.',
      ],
      limits: [
        'May skip details or interrupt process.',
        'Can bore quickly in long meetings.',
        'May react fast and regret tone later.',
      ],
      bestRole: 'Motivator, launcher, crisis responder, salesperson, performer, momentum-builder.',
      scenarios: [
        'Stuck team: Orange says “let’s try it” — sometimes that is exactly needed; sometimes details were skipped.',
        'With Gold: Orange needs freedom inside deadlines; Gold needs Orange to honor commitments.',
        'With Blue: Orange must watch tone; Blue must speak up clearly — speed is not the same as strength.',
      ],
      frustrations: {
        blue: 'Blue slows down for feelings; Orange may feel restricted or accused of being reckless.',
        gold: 'Gold’s rules feel like cages; Gold sees Orange as careless. Clear boundaries help both.',
        green: 'Green’s analysis feels like paralysis; Green sees Orange as reckless. Agree on minimum research before action.',
      },
      whenYouAreThis:
        'This is you on a team: you likely push for movement and results. Frustration hits when meetings drag, people hesitate, or process blocks visible progress. Teams need your courage — add listening and follow-through so trust keeps up with speed.',
    },
    relationships: {
      marriageIntro:
        'In marriage, Orange needs honesty, freedom, adventure, and a partner who is direct — not passive-aggressive.',
      needs: [
        'Room to move, try, and recover from mistakes.',
        'Straight talk instead of long indirect hints.',
        'Shared fun and challenge, not only maintenance talk.',
      ],
      gives: [
        'Energy, optimism, protection, generosity, and spontaneity.',
        'Often steps up in crisis.',
        'Keeps life from feeling stale.',
      ],
      conflictPatterns: [
        'May escalate quickly or say blunt things under stress.',
        'Can chase excitement while trust needs consistency.',
        'May confuse intensity with intimacy.',
      ],
      withSpouse: {
        blue: 'Orange + Blue: pause 30 seconds before reacting; Blue names needs without long buildup.',
        gold: 'Orange + Gold: adventure within budget and calendar — freedom with agreements.',
        green: 'Orange + Green: decide who owns “speed” vs. “accuracy” per topic — money, kids, travel, etc.',
      },
    },
    growth: {
      whenStrong:
        'When Orange is strong, keep boldness — add planning, empathy, and finish lines so leadership lasts.',
      whenWeak:
        'If Orange is your lowest score, you may hesitate to act, risk, or speak boldly. Learning Orange skills helps every area: take initiative, try small experiments, and say what you mean sooner. Relationships grow when you bring energy and honest movement, not only careful analysis.',
      comfortZone: 'Waiting until everything feels safe or fully understood.',
      stretchPractice: [
        'Take one small action before the meeting ends.',
        'Practice the 30-second pause before responding when angry.',
        'Celebrate progress, not only perfect outcomes.',
      ],
    },
    deepDive: {
      coreMotivation: 'To be free, effective, and alive — making things happen.',
      underStress: 'May become defiant, blunt, or impulsive.',
      misread: '“Reckless” — often confidence and willingness to try.',
      workplace: 'Strong in sales, entrepreneurship, emergency roles, coaching, entertainment, field work.',
      parenting: 'Fun and encouraging; watch for consistency and listening.',
    },
  },
};

/** Cross-color teamwork matrix: how color A experiences color B on a team */
export const teamDynamics = {
  blue: { blue: 'Two Blues: deep care but may avoid conflict — assign someone to name hard truths.', gold: 'Blue + Gold: heart plus structure — agree when to talk feelings vs. tasks.', green: 'Blue + Green: feelings vs. facts — translate before debating.', orange: 'Blue + Orange: pace clash — Blue needs check-in; Orange needs room to move.' },
  gold: { blue: 'Gold + Blue: dependable but may judge tone — schedule both care and calendar.', gold: 'Two Golds: excellent execution — watch rigidity and fun deficit.', green: 'Gold + Green: quality team — align on “done” vs. “perfect.”', orange: 'Gold + Orange: results possible — contracts and deadlines must be explicit.' },
  green: { blue: 'Green + Blue: smart and caring — Green adds “I hear you” before fixing.', gold: 'Green + Gold: systems thinkers — add play so life is not all optimization.', green: 'Two Greens: brilliant analysis — set decision dates.', orange: 'Green + Orange: innovation engine — time-box research then act.' },
  orange: { blue: 'Orange + Blue: energy plus heart — Orange slows tone; Blue speaks plainly.', gold: 'Orange + Gold: ship things — Gold sets rails; Orange drives.', green: 'Orange + Green: build and test — minimum viable proof before scaling.', orange: 'Two Oranges: high energy — someone must track details and follow-through.' },
};

export const colorLabels = Object.fromEntries(
  COLOR_ORDER.map((k) => [k, k.charAt(0).toUpperCase() + k.slice(1)]),
);

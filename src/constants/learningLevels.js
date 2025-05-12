export const LEARNING_LEVELS = {
  LEVEL_1: {
    id: 'LEVEL_1',
    name: 'Listening & Environmental Sounds',
    ageRange: '2-3 years',
    description: 'Begin your journey with fun sound exploration!',
    skills: [
      'Listening to sounds in nature',
      'Animal sounds recognition',
      'Musical instrument sounds',
      'Sound matching games'
    ],
    activities: [
      {
        id: 'find_the_sound',
        name: 'Find the Sound',
        type: 'game',
        icon: 'volume-up',
        description: 'Listen and find the matching sound!'
      },
      {
        id: 'sound_quiz',
        name: 'What Made This Sound?',
        type: 'quiz',
        icon: 'question-circle',
        description: 'Guess what made each sound!'
      },
      {
        id: 'animal_sounds',
        name: 'Animal Sounds',
        type: 'game',
        icon: 'paw',
        description: 'Learn fun animal sounds!'
      }
    ]
  },
  LEVEL_2: {
    id: 'LEVEL_2',
    name: 'Word & Syllable Awareness',
    ageRange: '3-4 years',
    description: 'Discover the rhythm of words!',
    skills: [
      'Word recognition',
      'Syllable counting',
      'Word sorting',
      'Rhythm awareness'
    ],
    activities: [
      {
        id: 'clap_syllables',
        name: 'Clap the Syllables',
        type: 'game',
        icon: 'hands',
        description: 'Clap along with word syllables!'
      },
      {
        id: 'syllable_count',
        name: 'Count the Beats',
        type: 'quiz',
        icon: 'calculator',
        description: 'How many syllables in each word?'
      },
      {
        id: 'word_sort',
        name: 'Word Sorting',
        type: 'game',
        icon: 'sort',
        description: 'Sort words by syllable count!'
      }
    ]
  },
  LEVEL_3: {
    id: 'LEVEL_3',
    name: 'Rhyming & Alliteration',
    ageRange: '4-5 years',
    description: 'Play with word patterns!',
    skills: [
      'Rhyme recognition',
      'Rhyme production',
      'Alliteration awareness',
      'Sound patterns'
    ],
    activities: [
      {
        id: 'rhyme_match',
        name: 'Rhyming Pairs',
        type: 'game',
        icon: 'link',
        description: 'Match words that rhyme!'
      },
      {
        id: 'silly_songs',
        name: 'Silly Sound Songs',
        type: 'music',
        icon: 'music',
        description: 'Sing along with rhyming songs!'
      },
      {
        id: 'tongue_twisters',
        name: 'Tongue Twisters',
        type: 'game',
        icon: 'comment-dots',
        description: 'Practice fun tongue twisters!'
      }
    ]
  },
  LEVEL_4: {
    id: 'LEVEL_4',
    name: 'Onset and Rime Blending',
    ageRange: '5-6 years',
    description: 'Master word building!',
    skills: [
      'Onset recognition',
      'Rime blending',
      'Word building',
      'Sound combination'
    ],
    activities: [
      {
        id: 'word_building',
        name: 'Build the Word',
        type: 'game',
        icon: 'puzzle-piece',
        description: 'Combine sounds to make words!'
      },
      {
        id: 'onset_rime',
        name: 'Onset-Rime Puzzles',
        type: 'puzzle',
        icon: 'puzzle-piece',
        description: 'Match word parts together!'
      },
      {
        id: 'word_finish',
        name: 'Finish the Word',
        type: 'game',
        icon: 'check-circle',
        description: 'Complete the word with the right sound!'
      }
    ]
  },
  LEVEL_5: {
    id: 'LEVEL_5',
    name: 'Phoneme Awareness',
    ageRange: '6-8 years',
    description: 'Advanced sound exploration!',
    skills: [
      'Phoneme isolation',
      'Sound blending',
      'Sound segmentation',
      'Sound manipulation'
    ],
    activities: [
      {
        id: 'sound_blend',
        name: 'Blend the Sounds',
        type: 'game',
        icon: 'volume-up',
        description: 'Combine sounds to make words!'
      },
      {
        id: 'sound_switch',
        name: 'Sound Switch',
        type: 'game',
        icon: 'exchange-alt',
        description: 'Change sounds to make new words!'
      },
      {
        id: 'sound_spot',
        name: 'Spot the Sound',
        type: 'quiz',
        icon: 'bullseye',
        description: 'Find the sound in different positions!'
      }
    ]
  }
};

export const getLevelByAge = (age) => {
  if (age >= 2 && age < 3) return LEARNING_LEVELS.LEVEL_1;
  if (age >= 3 && age < 4) return LEARNING_LEVELS.LEVEL_2;
  if (age >= 4 && age < 5) return LEARNING_LEVELS.LEVEL_3;
  if (age >= 5 && age < 6) return LEARNING_LEVELS.LEVEL_4;
  if (age >= 6 && age <= 8) return LEARNING_LEVELS.LEVEL_5;
  return LEARNING_LEVELS.LEVEL_1; // Default to Level 1 if age is out of range
};

export const getLevelById = (levelId) => {
  return LEARNING_LEVELS[levelId] || LEARNING_LEVELS.LEVEL_1;
}; 
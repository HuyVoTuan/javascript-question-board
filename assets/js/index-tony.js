const dataQuestions = [
  {
    id: 'sign-up-form',
    name: 'Sign-Up Form',
    category: 'HTML',
  },
  {
    id: 'item-cart',
    name: 'Item Cart',
    category: 'HTML',
  },
  {
    id: 'spaghetti-recipe',
    name: 'Spaghetti Recipe',
    category: 'HTML',
  },
  {
    id: 'blog-post',
    name: 'Blog Post',
    category: 'HTML',
  },
  {
    id: 'rainbow-circles',
    name: 'Rainbow Circles',
    category: 'CSS',
  },
  {
    id: 'navbar',
    name: 'Navbar',
    category: 'CSS',
  },
  {
    id: 'pig-emoji',
    name: 'Pig Emoji',
    category: 'CSS',
  },
  {
    id: 'purchase-form',
    name: 'Purchase Form',
    category: 'CSS',
  },
  {
    id: 'algoexpert-products',
    name: 'AlgoExpert Products',
    category: 'CSS',
  },
  {
    id: 'testing-framework',
    name: 'Testing Framework',
    category: 'JavaScript',
  },
  {
    id: 'array-methods',
    name: 'Array Methods',
    category: 'JavaScript',
  },
  {
    id: 'event-target',
    name: 'Event Target',
    category: 'JavaScript',
  },
  {
    id: 'debounce',
    name: 'Debounce',
    category: 'JavaScript',
  },
  {
    id: 'this-binding',
    name: 'This Binding',
    category: 'JavaScript',
  },
  {
    id: 'promisify',
    name: 'Promisify',
    category: 'JavaScript',
  },
  {
    id: 'throttle',
    name: 'Throttle',
    category: 'JavaScript',
  },
  {
    id: 'curry',
    name: 'Curry',
    category: 'JavaScript',
  },
  {
    id: 'infinite-scroll',
    name: 'Infinite Scroll',
    category: 'DOM Manipulation',
  },
  {
    id: 'stopwatch',
    name: 'Stopwatch',
    category: 'DOM Manipulation',
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    category: 'DOM Manipulation',
  },
  {
    id: 'todo-list',
    name: 'Todo List',
    category: 'DOM Manipulation',
  },
  {
    id: 'typeahead',
    name: 'Typeahead',
    category: 'DOM Manipulation',
  },
  {
    id: 'tier-list',
    name: 'Tier List',
    category: 'DOM Manipulation',
  },
  {
    id: 'toasts',
    name: 'Toasts',
    category: 'DOM Manipulation',
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    category: 'DOM Manipulation',
  },
  {
    id: 'questions-list',
    name: 'Questions List',
    category: 'DOM Manipulation',
  },
];

const dataSubmissions = [
  {
    questionId: 'blog-post',
    status: 'CORRECT',
  },
  {
    questionId: 'throttle',
    status: 'INCORRECT',
  },
  {
    questionId: 'stopwatch',
    status: 'PARTIALLY-CORRECT',
  },
  {
    questionId: 'pig-emoji',
    status: 'CORRECT',
  },
  {
    questionId: 'todo-list',
    status: 'CORRECT',
  },
  {
    questionId: 'testing-framework',
    status: 'CORRECT',
  },
  {
    questionId: 'array-methods',
    status: 'INCORRECT',
  },
  {
    questionId: 'spaghetti-recipe',
    status: 'PARTIALLY-CORRECT',
  },
  {
    questionId: 'algoexpert-products',
    status: 'PARTIALLY-CORRECT',
  },
  {
    questionId: 'curry',
    status: 'CORRECT',
  },
  {
    questionId: 'toasts',
    status: 'INCORRECT',
  },
  {
    questionId: 'tic-tac-toe',
    status: 'CORRECT',
  },
  {
    questionId: 'event-target',
    status: 'CORRECT',
  },
  {
    questionId: 'debounce',
    status: 'PARTIALLY-CORRECT',
  },
  {
    questionId: 'item-cart',
    status: 'CORRECT',
  },
  {
    questionId: 'typeahead',
    status: 'CORRECT',
  },
  {
    questionId: 'tier-list',
    status: 'PARTIALLY-CORRECT',
  },
  {
    questionId: 'sudoku',
    status: 'CORRECT',
  },
  {
    questionId: 'rainbow-circles',
    status: 'INCORRECT',
  },
  {
    questionId: 'infinite-scroll',
    status: 'CORRECT',
  },
  {
    questionId: 'navbar',
    status: 'PARTIALLY-CORRECT',
  },
];

// fake api
function fakeApi(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}

// element
const questionBoard = document.getElementById('question-board');

// utils
function groupByProperty(dataSource, key) {
  return dataSource.reduce((acc, curr) => {
    const name = curr[key]; // curr['category'] -> name = 'HTML'

    if(!acc[name]) acc[name] = [];
    acc[name].push(curr)
    return acc;
  }, {})
} 

// render category board
function renderBoard(key, cards, submissions) {
  const divQuestionBoard = document.createElement('div');
  divQuestionBoard.setAttribute('class', 'question-board__group');
  divQuestionBoard.setAttribute('id', key);

  const divLabel = document.createElement('div');
  divLabel.setAttribute('class', 'label');
  divLabel.innerHTML = key;

  divQuestionBoard.appendChild(divLabel);
  cards.forEach(card => {
    const missionItem = submissions.find(mission => mission.questionId === card.id);
    const divCard = renderCard(card,  missionItem?.status);
    divQuestionBoard.appendChild(divCard)
  })

  return divQuestionBoard;
}

function renderCard(card, status) {
  const divCard = document.createElement('div');
  divCard.setAttribute('class', 'card');

  const divStatus = document.createElement('span');
  const statusStyle = status || 'none';
  divStatus.setAttribute('class', `card__status card__status--${statusStyle.toLowerCase()}`);

  const divTypography= document.createElement('p');
  divTypography.setAttribute('class', 'card__content');
  divTypography.innerHTML = card.name;

  divCard.appendChild(divStatus);
  divCard.appendChild(divTypography);

  return divCard;
}


/* INIT APP */
const initializeApp = async () => {
  const questions = await fakeApi(dataQuestions);
  const submissions = await fakeApi(dataSubmissions);
  const questionCategories = groupByProperty(questions, 'category')

  for(const key in questionCategories) {
    const cards = questionCategories[key];
    const divQuestionBoard = renderBoard(key, cards, submissions);
    questionBoard.appendChild(divQuestionBoard)
  }
};

initializeApp();

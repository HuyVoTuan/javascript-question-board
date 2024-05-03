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
  {
    id: 'redux',
    name: 'React Hook',
    category: 'React',
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
  {
    questionId: 'redux',
    status: 'CORRECT',
  },
];

const questionBoardEl = document.getElementById('question-board');

/* UTILITIES FUNCTION */
const toProperKey = (key) => {
  const keyLength = key.split(' ').length;

  if (keyLength >= 2) {
    key = key.split(' ').join('-');
  }

  return (key = key.toLowerCase());
};

/* BUSINESS LOGIC */
const groupByCategory = ({ data_1, data_2, dataSourceHandler }) => {
  return data_1.reduce((acc, item) => {
    const { id, ...otherProps } = item;
    const dynamicPropName = dataSourceHandler(item);

    if (!acc[dynamicPropName]) {
      acc[dynamicPropName] = [];
    }

    acc[dynamicPropName].push({
      ...otherProps,
      status:
        data_2.find((submission) => submission.questionId === id)?.status ??
        'NONE',
      /* Quick note: 
          I'm using the nullish coalescing operator here 
          to handle the case where the submission status is not found. 

          If the submission status is not found, 
          instead of throw error message it will return undefined.

          And finally if its value is undefined, change to 'NONE'.
      */
    });

    return acc;
  }, {});
};

const renderCard = (question) => {
  const questionName = question.name;
  const questionStatus = question.status.toLowerCase();

  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  const cardStatusEl = document.createElement('span');
  cardStatusEl.classList.add('card__status', `card__status--${questionStatus}`);

  const cardContentEl = document.createElement('p');
  cardContentEl.classList.add('card__content');

  cardContentEl.textContent = `${questionName}`;

  cardEl.appendChild(cardStatusEl);
  cardEl.appendChild(cardContentEl);

  return cardEl;
};

const renderQuestionBoardGroup = (key, value) => {
  const loweredCaseKey = toProperKey(key);

  const questionBoardGroupEl = document.createElement('div');
  questionBoardGroupEl.classList.add('question-board__group');
  questionBoardGroupEl.setAttribute('id', loweredCaseKey);

  const questionBoardGroupLabelEl = document.createElement('div');
  questionBoardGroupLabelEl.classList.add('label');
  questionBoardGroupLabelEl.textContent = key;

  questionBoardGroupEl.appendChild(questionBoardGroupLabelEl);

  const cardWrapperEl = document.createElement('div');
  cardWrapperEl.classList.add('card-wrapper');

  value.forEach((question) => {
    const cardEl = renderCard(question);
    cardWrapperEl.appendChild(cardEl);
    questionBoardGroupEl.appendChild(cardWrapperEl);
  });

  return questionBoardGroupEl;
};

/* INIT APP */
const initializeApp = () => {
  const groupByCategoryData = groupByCategory({
    data_1: dataQuestions,
    data_2: dataSubmissions,
    dataSourceHandler: (item) => item.category,
    /* 
      Quick note:
        Passing a anonymous arrow function to dataSourceHandler property
        in order to handle and return the data source dynamically base on 
        item property.   
    */
  });

  for (const [key, value] of Object.entries(groupByCategoryData)) {
    const questionBoardGroupEl = renderQuestionBoardGroup(key, value);
    questionBoardEl.appendChild(questionBoardGroupEl);
  }
};

initializeApp();

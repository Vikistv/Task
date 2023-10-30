const userRouter = require('express').Router();

const demoNotes = [
  {
    id: 1,
    title: 'The Eiffel Tower Can Grow Taller in the Summer',
    text: 'The Eiffel Tower, made of iron, can expand and contract with temperature changes. During a hot summer day, it can grow up to 15 cm (6 inches) taller due to the iron expanding in the heat.',
    userId: 1,
  },
  {
    id: 2,
    title: 'Bananas Are Berries',
    text: 'Botanically speaking, bananas are classified as berries, while strawberries are not. Berries have seeds on the inside, and bananas fit this definition, while strawberries have seeds on the outside.',
    userId: 1,
  },
  {
    id: 3,
    title: 'Honey Never Spoils',
    text: 'Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible',
    userId: 1,
  },
  {
    id: 4,
    title: 'Octopuses Have Three Hearts',
    text: 'Octopuses have three hearts: two branchial hearts that pump blood to the gills and one systemic heart that pumps oxygenated blood to the rest of the body. This adaptation helps them survive in the ocean.',
    userId: 1,
  },
  {
    id: 5,
    title: 'The Shortest War in History Lasted 38 Minutes',
    text: 'The Anglo-Zanzibar War, fought between the United Kingdom and the Sultanate of Zanzibar on August 27, 1896, is considered the shortest war in history. It lasted only 38 minutes before the British emerged victorious.',
    userId: 1,
  },
];

const demoUser = [
  {
    id: 1,
    name: 'Sonya',
    email: '1@1',
    password: '1',
    notes: demoNotes,
  },
];

userRouter.get('/', (req, res) => {
  res.json({ user: req.session.name || false });
});

userRouter.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = demoUser.find(
      (user) => user.email === email && user.password === password
    );
    if (currentUser) {
      req.session.userId = currentUser.id;
      req.session.name = currentUser.name;
      req.session.email = currentUser.email;
      req.session.password = currentUser.password;
      res.json(currentUser);
    } else {
      res.status(401).json('Try again');
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('WebApp');
    res.json({ user: '' });
  });
});

userRouter.get('/notes', (req, res) => {
  try {
    const userCheck = demoUser.find((user) => user.email === req.session.email);
    if (userCheck) {
      res.json(userCheck.notes);
    } else {
      res.status(401).json('No Data');
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.post('/notes', (req, res) => {
  const { title, text } = req.body;
  try {
    const userCheck = demoUser.find((user) => user.email === req.session.email);
    if (userCheck) {
      const noteId = Math.floor(Math.random() * 1000);
      const newNote = {
        id: noteId,
        title,
        text,
        userId: req.session.userId,
      };
      userCheck.notes.push(newNote);
      res.json(newNote);
    } else {
      res.status(401).json('No Data');
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { userId } = req.session;
  try {
    const userCheck = demoUser.find((user) => user.id === userId);
    if (userCheck) {
      const filteredArray = userCheck.notes.filter(
        (note) => note.id !== Number(id)
      );
      userCheck.notes = filteredArray;
      res.json(filteredArray);
    } else {
      res.json('You do not have access');
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.patch('/notes/:id', (req, res) => {
  const { title, text } = req.body;
  const { id } = req.params;
  const { userId } = req.session;
  try {
    const userCheck = demoUser.find((user) => user.id === userId);
    if (userCheck) {
      const editNoteIndex = userCheck.notes.findIndex(
        (note) => note.id === Number(id)
      );
      if (editNoteIndex !== -1) {
        const editedNote = { ...userCheck.notes[editNoteIndex], title, text };
        userCheck.notes[editNoteIndex] = editedNote;
        res.json(editedNote);
      } else {
        res.json('No note');
      }
    } else {
      res.json('You do not have access');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;

const fs = require('fs');
fetch('https://logro-chi.vercel.app/assets/index-BMMiqsg1.js')
  .then(r => r.text())
  .then(t => {
    const match = t.match(/https:\/\/backlogro[a-zA-Z0-9\-\.\/]+/g);
    console.log(match);
  });

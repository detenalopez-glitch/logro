fetch('https://logro-chi.vercel.app/assets/index-BMMiqsg1.js')
  .then(r => r.text())
  .then(t => {
    const idx = t.indexOf('backlogro');
    if (idx !== -1) {
      console.log(t.substring(idx - 20, idx + 50));
    } else {
      console.log("NOT FOUND");
    }
  });
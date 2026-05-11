fetch('https://logro-chi.vercel.app/assets/index-BMMiqsg1.js')
  .then(r => r.text())
  .then(t => {
    const parts = t.split('http');
    console.log(parts.slice(1, 10).map(p => 'http' + p.substring(0, 50)));
  });
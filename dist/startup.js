import('./app.js?v=study-records-v1').catch(error => {
  const status = document.querySelector('#startup-status');
  if (status) status.textContent = '网页未能加载。请重新载入，或用手机浏览器重新打开这个网址。';
  console.error('Klaire could not start', error);
});

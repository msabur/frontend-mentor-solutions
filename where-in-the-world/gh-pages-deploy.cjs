const ghpages = require('gh-pages');

ghpages.publish('dist', {
  branch: 'master',
  dest: 'where-in-the-world',
}, (err) => {
  if (err) {
    console.error('Error deploying to GitHub Pages', err);
  } else {
    console.log('Successfully deployed to GitHub Pages');
  }
});


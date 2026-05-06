const photos = [
  { id: 1, filename: './images/beauty.png' },
  { id: 2, filename: './images/chin.png' },
    { id: 5, filename: './images/feet.png' },

  { id: 3, filename: './images/morethanatoe.PNG' },
    { id: 4, filename: './images/toe.PNG' },

];

function runQuery() {
  const userInput = document.getElementById('sqlInput').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!userInput.trim().toUpperCase().startsWith('SELECT')) {
    resultsDiv.innerHTML = '<p>Only SELECT queries allowed</p>';
    return;
  }

  const query = userInput.replace(/FROM photos/i, 'FROM ?');

  try {
    const results = alasql(query, [photos]);

    if (results.length === 0) {
      resultsDiv.innerHTML = '<p>No results</p>';
      return;
    }

    results.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.filename;
      resultsDiv.appendChild(img);
    });

  } catch (e) {
    resultsDiv.innerHTML = `<p>Error: ${e.message}</p>`;
  }
}

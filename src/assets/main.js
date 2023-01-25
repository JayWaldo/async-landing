const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCBVxrmGNNZ2PzbRGhOfktmw&part=snippet%2Cid&order=date&maxResults=5';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '415543a8d1mshebb3f813f60a8d9p13af07jsne44b16d5ded3',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);
    let vidUrl = 'https://www.youtube.com/watch?v=' + videos.items.map(video => video.id.videoId);
    let view = `
      ${videos.items.map(video => `
        <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <a href="${vidUrl}" target="_blank">
              <h3 class="text-sm text-aliceblue titles">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
              </h3>
              </a>
          </div>
        </div>
        `).slice(0,4).join('')}
      `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();

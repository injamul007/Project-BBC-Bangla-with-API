//? promise -> promise, resolve(success), reject(error)

const categoryContainer = document.getElementById("category_container");
const newsContainer = document.getElementById('news_container');
const bookmarkContainer = document.getElementById('bookmark_container');

let bookmarks = [];

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategory(data.categories);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
  const displayCategory = (categories) => {
    categories.forEach((category) => {
      const { id, title } = category;
      categoryContainer.innerHTML += `<li id="${id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${title}</li>`;
    });
    categorySelection();
  };


  const categorySelection = () => {
    categoryContainer.addEventListener("click", (e) => {
      const liAll = document.querySelectorAll("li");
      liAll.forEach((li) => {
        li.classList.remove("border-b-4");
      });
      if (e.target.localName === "li") {
        const liPath = e.target;
        liPath.classList.add("border-b-4");
        loadNewsByCategory(e.target.id);
      }
    });
  };
  
  const loadNewsByCategory = (categoryId) => {
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      displayNewsByCategory(data.articles);
    })
    .catch((err) => console.log(err));
  };
  
  const displayNewsByCategory = (articles) => {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
      newsContainer.innerHTML += `
      <div class="border-2 border-gray-200 flex flex-col justify-between items-center text-center rounded-lg">
      <div class ="w-full h-34">
      <img class ="w-full h-34 rounded-lg" src="${article.image.srcset[4].url}" />
      </div>
       <div id="${article.id}" class="p-2">
        <h1 class="font-bold">${article.title}</h1>
        <p class="text-sm">${article.time}</p>
       </div>
       <button class="btn">Bookmark</button>
      </div>
      
      `;
    })

  }


  newsContainer.addEventListener('click', (e) => {
    if(e.target.innerText === 'Bookmark') {
      handleBookmarks(e);
    }
  });
  
  const handleBookmarks = (e) => {
    const title = e.target.parentNode.children[1].innerText;
      const id = e.target.parentNode.children[1].id;
      bookmarks.push({
        title: title,
        id: id,
      })
      showBookMarks(bookmarks)
  }
  
  const showBookMarks = (bookmarks) => {
    bookmarkContainer.innerHTML = '';
    bookmarks.forEach(bookmark => {
      bookmarkContainer.innerHTML += `
       <div class="border my-2 p-1">
        <h1>${bookmark.title}</h1>
        <button onclick="handleDeleteBookmark('${bookmark.id}')" class="cursor-pointer w-full my-2 btn">Delete</button>
       </div>`;
    })
  }


  const handleDeleteBookmark = (bookmarkId) => {
   const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
   const removeSameItem = filteredBookmarks.find(remove => console.log(remove))
    bookmarks = filteredBookmarks;
    showBookMarks(bookmarks)
  }

  loadCategory();
  
  loadNewsByCategory('main')
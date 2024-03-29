const loadPosts = async (categoryName = "") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
  );
  const data = await res.json();
  const posts = data.posts;
  displayPosts(posts);
};

const displayPosts = (posts) => {
  const postContainer = document.getElementById("posts-container");
  // clear post container posts before adding new posts
  postContainer.innerHTML = "";

  posts.forEach((post, index) => {
    // generate a unique id for indicator element
    const uniqueIndicatorId = `indicator-${index}`;

    const postDiv = document.createElement("div");
    postDiv.classList = `flex p-5 lg:p-10 gap-6 rounded-2xl bg-[#F3F3F5]`;
    postDiv.innerHTML = `
    <!-- avatar -->
    <div>
    <div class="avatar indicator">
      <span id="${uniqueIndicatorId}" class="indicator-item badge"></span>
      <div class="w-10 h-10 lg:w-20 lg:h-20 rounded-lg">
        <img
          alt="Tailwind CSS examples"
          src="${post.image}"
        />
      </div>
    </div>
  </div>

  <!-- details -->
  
  <div class="flex-1">
    <div
      class="text-heading-color text-sm space-x-5 font-medium mb-3"
    >
      <span># ${post.category}</span>
      <span>Author : <span>${post.author.name}</span></span>
    </div>
    <h4 class="mb-4 text-heading-color text-xl font-bold">
      ${post.title}
    </h4>
    <p class="text-para-color">
      ${post.description}
    </p>
    <hr class="border-dashed border-t-2 my-5 border-[#12132D40]" />
    <div class="flex items-center justify-between gap-5">
      <div
        class="flex flex-col lg:flex-row items-center justify-between gap-2"
      >
        <div>
          <img src="./images/message.svg" alt="" />
        </div>
        <p class="text-para-color">${post.comment_count}</p>
      </div>
      <div
        class="flex flex-col lg:flex-row items-center justify-between gap-2"
      >
        <div>
          <img src="./images/watch.svg" alt="" />
        </div>
        <p class="text-para-color">${post.view_count}</p>
      </div>
      <div
        class="flex flex-col lg:flex-row items-center justify-between gap-2"
      >
        <div>
          <img src="./images/time.svg" alt="" />
        </div>
        <p class="text-para-color">${post.posted_time} min</p>
      </div>
      <div onclick="handleMarkAsARead('${post.title.replace("'", "")}', '${
      post.view_count
    }')" class="ml-auto cursor-pointer">
        <img src="./images/mail.svg" alt="" />
      </div>
    </div>
  </div>
</div>
    `;

    postContainer.appendChild(postDiv);

    // Retrieve the indicator span element using the unique id
    const indicator = document.getElementById(uniqueIndicatorId);

    if (post.isActive) {
      indicator.classList.add("badge-success");
    } else {
      indicator.classList.add("badge-error");
    }
  });

  toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = () => {
  // Show loading spinner
  toggleLoadingSpinner(true);

  const searchField = document.getElementById("search-field");
  const searchInputValue = searchField.value;

  // Wait for 2 seconds before loading posts
  setTimeout(() => {
    loadPosts(searchInputValue);
  }, 2000);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// =====================================[mark as a read button handler]==========================================

const markedTitles = [];

const handleMarkAsARead = (title, watchTime) => {
  // check the title if includes
  if (markedTitles.includes(title)) {
    // return nothing
    return;
  }
  markedTitles.push(title);

  // mark as a read action
  const markCardContainer = document.getElementById("mark-card-container");
  const markCardDiv = document.createElement("div");
  markCardDiv.classList = `grid grid-cols-3 bg-white rounded-2xl p-5`;
  markCardDiv.innerHTML = `
    <h5 class="col-span-2 text-heading-color font-semibold">
        ${title}
    </h5>
    <div class="flex items-center justify-end gap-2">
        <div>
            <img src="./images/watch.svg" alt="" />
        </div>
        <p class="text-para-color">${watchTime}</p>
    </div>
    `;
  markCardContainer.appendChild(markCardDiv);

  // increase number if clicked mark as a read button
  const markCountElement = document.getElementById("mark-count");
  const markCountValue = parseInt(markCountElement.innerText);
  const increaseValue = markCountValue + 1;
  markCountElement.innerText = increaseValue;
};

// =====================================[latest posts data]==========================================

const loadLatestPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  displayLatestPosts(data);
};

const displayLatestPosts = (posts) => {
  const latestPostContainer = document.getElementById("latest-post-container");
  posts.forEach((post) => {
    // console.log(post.title);
    const postDiv = document.createElement("div");
    postDiv.classList = "card card-compact bg-base-100 border-2 shadow-xl";
    postDiv.innerHTML = `
    <figure class="px-6 pt-6">
      <img
        class="rounded-2xl"
        src="${post.cover_image}"
        alt="Cover Image"
      />
    </figure>
    <div class="p-6 space-y-3">
      <div class="flex gap-3">
        <div><img src="./images/calender.svg" alt="" /></div>
        <p class="text-para-color font-medium">${
          post.author?.posted_date || "No publish date"
        }</p>
      </div>
      <h2 class="card-title text-heading-color font-extrabold">
        ${post.title}
      </h2>
      <p class="text-para-color font-medium">
        ${post.description}
      </p>
      <div class="flex gap-4 items-center">
        <div class="w-10 h-10 lg:w-10 lg:h-10">
          <img
            class="rounded-full"
            alt=""
            src="${post.profile_image}"
          />
        </div>
        <div>
          <h6 class="text-heading-color font-bold">
            ${post.author.name}
          </h6>
          <p class="text-para-color font-medium">${
            post.author?.designation || "Unknown"
          }</p>
        </div>
      </div>
    </div>
    `;

    latestPostContainer.appendChild(postDiv);
  });
};

loadPosts();
loadLatestPosts();

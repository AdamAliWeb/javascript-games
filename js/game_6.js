const d = document,
  $form = d.querySelector(".game-6-form"),
  $songs_container = d.querySelector(".game-6-container"),
  $categories_select = d.querySelector(".game-6-form select"),
  $template = d.querySelector(".game-6-template").content,
  $fragment = d.createDocumentFragment(),
  $categories_fragment = d.createDocumentFragment();

let host_url = "http://localhost:3000",
  url = `${host_url}/songs`,
  current_id = null;

let genres = [
  "Pop",
  "Anime",
  "Beatbox",
  "Workout",
  "Electronica",
  "Nerd Rap",
  "Vibes",
  "Kpop",
  "Rap Español",
  "Musica Ucraniana",
  "Reggaeton",
  "Rock",
  "Mainstream",
  "Musica Eslava Popular",
  "FNF",
];

const load_songs = async () => {
  try {
    let res = await axios.get(url),
      json = await res.data;

    json.forEach((song) => {
      $template.querySelector(".song-name").textContent = song.name;
      $template.querySelector(".song-artist").textContent = song.artist;
      $template.querySelector(".song-category").textContent = song.category;
      $template.querySelector(".song-edit").dataset.name = song.name;
      $template.querySelector(".song-edit").dataset.artist = song.artist;
      $template.querySelector(".song-edit").dataset.category = song.category;
      $template.querySelector(".song-edit").dataset.id = song.id;
      $template.querySelector(".song-delete").dataset.id = song.id;
      $template.querySelector(".game-6-song").dataset.id = song.id;

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });

    $songs_container.appendChild($fragment);
    drag_and_drop();
  } catch (err) {
    let message = err.statusText || "An Error has occurred";
    $songs_container.insertAdjacentHTML(
      "afterbegin",
      `<p style="font-weight: bold;">Error ${err.status}: ${message}</p>`,
    );
  }
};

const drag_and_drop = () => {
  Sortable.create($songs_container, {
    animation: 200,
    ghostClass: "ghost",
    dragClass: "drag",
    forceFallback: true,
    group: "song-list",
    store: {
      set: async (sortable) => {
        const order = await sortable.toArray();
        localStorage.setItem(sortable.options.group.name, order.join("|"));
      },

      get: (sortable) => {
        const order = localStorage.getItem(sortable.options.group.name);
        return order ? order.split("|") : [];
      },
    },
  });
};

export const game6_function = () => {
  genres.forEach((genre) => {
    const $option = d.createElement("option");
    $option.value = genre;
    $option.textContent = genre;
    $categories_fragment.appendChild($option);
  });

  $categories_select.appendChild($categories_fragment);

  load_songs();

  d.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (e.target === $form) {
      if (!current_id) {
        // method POST
        try {
          let data = {
            name: e.target.name.value,
            artist: e.target.artist.value,
            category: e.target.category.value,
          };

          let res = await axios.post(url, data);
        } catch (err) {
          let message = err.statusText || "An Error has occurred";
          alert(`Error ${err.status}: ${message}`);
        }
      } else {
        // method PUT
        try {
          let data = {
            name: e.target.name.value,
            artist: e.target.artist.value,
            category: e.target.category.value,
          };

          let res = await axios.put(`${url}/${current_id}`, data);
        } catch (err) {
          let message = err.statusText || "An Error has occurred";
          alert(`Error ${err.status}: ${message}`);
        }
      }
    }
  });

  d.addEventListener("click", async (e) => {
    if (e.target.matches(".song-edit")) {
      $form.name.value = e.target.dataset.name;
      $form.artist.value = e.target.dataset.artist;
      $form.category.value = e.target.dataset.category;
      current_id = e.target.dataset.id;
    }

    if (e.target.matches(".song-delete")) {
      let isDelete = confirm("Do you wish to delete the song?");

      if (isDelete) {
        current_id = e.target.dataset.id;
        try {
          let res = await axios.delete(`${url}/${current_id}`);
        } catch (err) {
          let message = err.statusText || "An Error has occurred";
          alert(`Error ${err.status}: ${message}}`);
        }
      }
    }
  });
};

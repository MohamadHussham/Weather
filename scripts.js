/*********************
 * WEATHER
 *********************/
const weatherBtn = document.getElementById("weatherBtn");
const weatherResult = document.getElementById("weatherResult");

weatherBtn.addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  const API_KEY = "YOUR_OPENWEATHER_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  weatherResult.textContent = "Loading...";

  try {
    const res = await fetch(url);
    const data = await res.json();

    weatherResult.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <p>${data.main.temp} °C</p>
      <p>${data.weather[0].description}</p>
    `;
  } catch (err) {
    weatherResult.textContent = "Error fetching weather.";
  }
});

/*********************
 * MOVIES
 *********************/
const movieBtn = document.getElementById("movieBtn");
const movieResults = document.getElementById("movieResults");

movieBtn.addEventListener("click", async () => {
  const query = document.getElementById("movieInput").value;
  if (!query) return;

  const API_KEY = "YOUR_OMDB_KEY";
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

  movieResults.textContent = "Searching...";

  try {
    const res = await fetch(url);
    const data = await res.json();

    movieResults.innerHTML = "";

    data.Search.forEach(movie => {
      const div = document.createElement("div");
      div.className = "movie";
      div.innerHTML = `
        <strong>${movie.Title}</strong> (${movie.Year})
      `;
      movieResults.appendChild(div);
    });
  } catch {
    movieResults.textContent = "No movies found.";
  }
});

/*********************
 * TODO APP
 *********************/
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.done) li.classList.add("done");

    li.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      saveTodos();
    });

    li.addEventListener("contextmenu", e => {
      e.preventDefault();
      todos.splice(index, 1);
      saveTodos();
    });

    todoList.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

document.getElementById("todoBtn").addEventListener("click", () => {
  if (!todoInput.value) return;
  todos.push({ text: todoInput.value, done: false });
  todoInput.value = "";
  saveTodos();
});

renderTodos();

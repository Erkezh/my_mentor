const mentors = {
  Руслан: {
    role: "Backend",
    goals: {
      "Понять, что такое сервер": [
        "Узнать, как работает клиент-сервер",
        "Разобраться, как работает клиент-серверная архитектура",
        "Установить Node.js",
        "Запустить простейший сервер (Hello World)",
        "Объяснить себе, что такое порт",
      ],
      "Написать первое API": [
        "Установить Express.js",
        "Сделать GET-роут, который возвращает список задач",
        "Добавить POST-запрос с телом",
        "Написать DELETE-запрос",
        "Протестировать всё в Postman",
      ],
      "Освоить работу с базой данных": [
        "Установить MongoDB или PostgreSQL",
        "Сделать коллекцию/таблицу “users”",
        "Написать соединение с базой",
        "Сделать CRUD для задач",
        "Подключить и проверить базу через терминал",
      ],
    },
  },
  Айдана: {
    role: "Frontend",
    goals: {
      "Освоить HTML и CSS": [
        "Пройти курс по HTML (например, freecodecamp или htmlacademy)",
        "Написать свою первую страницу с заголовками, параграфами, списками",
        "Научиться работать с классами и ID",
        "Освоить Flexbox и сверстать карточку",
        "Сделать адаптивную страницу с медиазапросами",
      ],
      "Сделать свой первый лендинг": [
        "Нарисовать структуру сайта (в блокноте или Figma)",
        "Найти шрифты и цветовую палитру",
        "Сделать hero-секцию с заголовком и кнопкой",
        "Добавить секции “О нас”, “Преимущества”, “Контакты”",
        "Проверить адаптивность на мобилке",
      ],
      "Начать изучать JavaScript": [
        "Изучить переменные, типы данных и операторы",
        "Написать функцию, которая выводит приветствие",
        "Научиться работать с событиями (onclick)",
        "Сделать простой калькулятор",
        "Написать свой первый to-do list",
      ],
    },
  },
  Амина: {
    role: "Дизайн",
    goals: {
      "Освоить Figma": [
        "Пройти базовое интро (кадр, слои, текст, фигуры)",
        "Нарисовать кнопку и карточку",
        "Освоить автолэйауты",
        "Сделать компонент и вариации",
        "Собрать мини-интерфейс",
      ],
      "UI-дизайн лендинга": [
        'Придумать тему (например, "кофейня" или "курс по дизайну")',
        "Нарисовать hero-секцию с заголовком, текстом, кнопкой",
        "Сделать несколько секций с контентом",
        "Подобрать иконки и шрифты",
        "Отправить макет другу и получить фидбек",
      ],
      "Понять основы UX мышления": [
        "Изучить, как думает пользователь",
        "Прочитать 1 статью по UX (например, на UX Planet)",
        "Сделать карту пользовательского пути (user flow)",
        "Провести микро-тест на знакомом",
        "Проанализировать один плохой сайт: что бесит и почему?",
      ],
    },
  },
  Марат: {
    role: "Мобилка",
    goals: {
      "Изучить основы Flutter": [
        "Установить Flutter и Android Studio",
        "Сделать приложение “Привет, мир”",
        "Освоить Stateless и Stateful виджеты",
        "Написать интерфейс с Column и Row",
        "Добавить отступы, цвета, шрифты",
      ],
      "Написать простое приложение": [
        "Придумать идею (например, список дел или заметки)",
        "Нарисовать 2 экрана в Figma",
        "Реализовать добавление задач",
        "Сделать удаление задачи",
        "Подключить хранение в памяти",
      ],
      "Научиться использовать состояние": [
        "Понять setState и когда его использовать",
        "Переделать простое приложение с состоянием",
        "Использовать TextEditingController",
        "Научиться сбрасывать ввод",
        "Освоить пакет Provider или Riverpod",
      ],
    },
  },
};

const cards = document.querySelectorAll(".card");
const goalSection = document.createElement("div");
goalSection.classList.add("goal-section");
const mentorsContainer = document.querySelector(".wrapper");
let isGoals = false;

const form = document.querySelector("form");
const inputBox = document.getElementById("input-box");
const taskList = document.querySelector(".task-list");
let currentGoalKey = ""; // для хранения выбранной цели

cards.forEach((card) => {
  const button = card.querySelector("button");
  const name = card.querySelector("p").textContent.split("—")[0].trim();

  button.addEventListener("click", () => {
    cards.forEach((c) => c !== card && c.classList.add("hidden"));

    if (!isGoals) {
      const backButton = document.createElement("img");
      backButton.src = "./images/back.svg";
      backButton.classList.add("back-button");
      backButton.addEventListener("click", () => {
        cards.forEach((c) => c.classList.remove("hidden"));
        goalSection.remove();
        isGoals = false;
      });

      const ul = document.createElement("ul");
      const mentorGoals = mentors[name].goals;
      goalSection.setAttribute('data-aos', 'fade-down')
      goalSection.innerHTML = "<h2>Выбери цель:</h2>";

      for (const goal in mentorGoals) {
        const li = document.createElement("li");
        li.textContent = goal;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
          ul.querySelectorAll("li").forEach((el) =>
            el.classList.remove("active")
          );
          li.classList.add("active");
        });

        ul.appendChild(li);
      }

      const startButton = document.createElement("button");
      startButton.textContent = "Начать!";
      startButton.classList.add("start-button");
      startButton.addEventListener("click", () => {
        document.querySelector(".todo").scrollIntoView({ behavior: "smooth" });

        const activeGoal = ul.querySelector(".active");
        if (!activeGoal) return;

        currentGoalKey = name + "—" + activeGoal.textContent;
        const tasks = mentors[name].goals[activeGoal.textContent];
        taskList.innerHTML = "";

        tasks.forEach((task) => addTask(task));
        saveTasks();
        updateProgress();
      });

      goalSection.appendChild(ul);
      goalSection.appendChild(startButton);
      goalSection.appendChild(backButton);
      mentorsContainer.append(goalSection);
      isGoals = true;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = inputBox.value.trim();
  if (taskText === "") return;
  addTask(taskText);
  inputBox.value = "";
  saveTasks();
  updateProgress();
});

taskList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
  saveTasks();
  updateProgress();
});

function addTask(text) {
  const taskItem = document.createElement("li");
  taskItem.textContent = text;

  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "✕";
  deleteBtn.classList.add("delete-btn");
  taskItem.appendChild(deleteBtn);

  taskList.appendChild(taskItem);
}

function updateProgress() {
  const tasks = document.querySelectorAll(".task-list li");
  const completed = document.querySelectorAll(".task-list li.checked");
  const percent = tasks.length === 0
    ? 0
    : Math.round((completed.length / tasks.length) * 100);

  document.getElementById("progress").style.width = percent + "%";
  document.getElementById("numbers").textContent = percent + "%";

  if (percent === 100) {
    fireworks();
  }
}

function saveTasks() {
  if (!currentGoalKey) return;
  const tasks = [];
  document.querySelectorAll(".task-list li").forEach((li) => {
    tasks.push({
      text: li.childNodes[0].nodeValue.trim(),
      done: li.classList.contains("checked"),
    });
  });
  localStorage.setItem("tasks-" + currentGoalKey, JSON.stringify(tasks));
}

function loadTasks() {
  const savedKeys = Object.keys(localStorage).filter((k) =>
    k.startsWith("tasks-")
  );
  if (savedKeys.length > 0) {
    const first = savedKeys[0];
    currentGoalKey = first.replace("tasks-", "");
    const saved = JSON.parse(localStorage.getItem(first));
    taskList.innerHTML = "";
    saved.forEach((task) => {
      const item = document.createElement("li");
      item.textContent = task.text;
      if (task.done) item.classList.add("checked");

      const deleteBtn = document.createElement("span");
      deleteBtn.textContent = "✕";
      deleteBtn.classList.add("delete-btn");
      item.appendChild(deleteBtn);

      taskList.appendChild(item);
    });
    updateProgress();
  }
}

function fireworks() {
  const count = 200, defaults = { origin: { y: 0.7 } };
  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}



const linkForm = document.querySelector(".links-form");
const linkNameInput = document.getElementById("linkName");
const linkUrlInput = document.getElementById("uLink");
const linkContainer = document.querySelector(".links-container");

linkForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = linkNameInput.value.trim();
  const url = linkUrlInput.value.trim();

  if (name === "" || url === "") {
    alert("Пожалуйста, заполни оба поля 🙏");
    return;
  }

  const link = { name, url };
  const links = JSON.parse(localStorage.getItem("links") || "[]");
  links.push(link);
  localStorage.setItem("links", JSON.stringify(links));

  renderLink(link);
  linkNameInput.value = "";
  linkUrlInput.value = "";
});

function renderLink({ name, url }) {
  const sticker = document.createElement("div");
  sticker.classList.add("sticker");
  sticker.setAttribute('data-aos', 'zoom-out')

  const tape = document.createElement("div");
  tape.classList.add("tape");

  const p = document.createElement("p");
  p.textContent = name;

  const a = document.createElement("a");
  a.href = url;
  a.textContent = url;
  a.target = "_blank";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Удалить";
  deleteBtn.addEventListener("click", () => {
    sticker.remove();
    const links = JSON.parse(localStorage.getItem("links") || "[]");
    const filtered = links.filter((l) => l.url !== url);
    localStorage.setItem("links", JSON.stringify(filtered));
  });

  sticker.append(tape, p, a, deleteBtn);
  linkContainer.appendChild(sticker);
}

function loadLinks() {
  const links = JSON.parse(localStorage.getItem("links") || "[]");
  links.forEach(renderLink);
}


loadTasks();
loadLinks();
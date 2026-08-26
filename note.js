document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-btn");
  const closeBtn = document.getElementById("close-btn");
  const noteBox = document.getElementById("note-box");
  const saveBtn = document.getElementById("save-btn");
  const textInput = document.getElementById("text-input");
  const textList = document.getElementById("text-list");

  // Bật/tắt UI
  toggleBtn.addEventListener("click", () => noteBox.classList.toggle("hidden"));
  closeBtn.addEventListener("click", () => noteBox.classList.add("hidden"));

  // Tải danh sách đã lưu từ LocalStorage
  let savedTexts = JSON.parse(localStorage.getItem("quick_notes")) || [];

  function renderList() {
    textList.innerHTML = "";
    savedTexts.forEach((text, index) => {
      const li = document.createElement("li");
      
      const span = document.createElement("span");
      span.className = "text-content";
      span.textContent = text;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.onclick = () => {
        navigator.clipboard.writeText(text);
        btn.textContent = "Đã chép!";
        setTimeout(() => (btn.textContent = "Copy"), 1500);
      };

      li.appendChild(span);
      li.appendChild(btn);
      textList.appendChild(li);
    });
  }

  // Lưu văn bản mới
  saveBtn.addEventListener("click", () => {
    const content = textInput.value.trim();
    if (content) {
      savedTexts.unshift(content);
      localStorage.setItem("quick_notes", JSON.stringify(savedTexts));
      textInput.value = "";
      renderList();
    }
  });

  renderList();
});

(function() {
  // 1. Tự động chèn CSS
  if (!document.getElementById("quick-note-style")) {
    const style = document.createElement("style");
    style.id = "quick-note-style";
    style.innerHTML = `
      #qn-toggle-btn { position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; border-radius: 50%; background: #007bff; color: white; border: none; font-size: 22px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3); z-index: 999999; }
      #qn-note-box { position: fixed; bottom: 80px; right: 20px; width: 300px; max-height: 400px; background: #fff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); display: flex; flex-direction: column; z-index: 999999; font-family: sans-serif; overflow: hidden; }
      .qn-hidden { display: none !important; }
      .qn-header { background: #007bff; color: white; padding: 10px; display: flex; justify-content: space-between; font-weight: bold; }
      .qn-header button { background: none; border: none; color: white; font-size: 16px; cursor: pointer; }
      .qn-body { padding: 10px; display: flex; flex-direction: column; gap: 8px; }
      .qn-body textarea { width: 100%; height: 60px; resize: none; box-sizing: border-box; padding: 5px; border: 1px solid #ccc; border-radius: 5px; }
      .qn-body #qn-save-btn { background: #28a745; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer; }
      #qn-text-list { list-style: none; padding: 0; margin: 0; max-height: 200px; overflow-y: auto; }
      #qn-text-list li { background: #f8f9fa; border: 1px solid #ddd; padding: 6px; margin-top: 5px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #333; }
      .qn-copy-btn { background: #17a2b8; color: white; border: none; padding: 3px 8px; border-radius: 3px; font-size: 11px; cursor: pointer; }
    `;
    document.head.appendChild(style);
  }

  // 2. Tự động chèn HTML giao diện
  if (!document.getElementById("qn-note-box")) {
    const div = document.createElement("div");
    div.innerHTML = `
      <button id="qn-toggle-btn" title="Ghi chú">📋</button>
      <div id="qn-note-box" class="qn-hidden">
        <div class="qn-header">
          <span>Ghi Chú Nhanh</span>
          <button id="qn-close-btn">✕</button>
        </div>
        <div class="qn-body">
          <textarea id="qn-text-input" placeholder="Nhập văn bản..."></textarea>
          <button id="qn-save-btn">Lưu văn bản</button>
          <ul id="qn-text-list"></ul>
        </div>
      </div>
    `;
    document.body.appendChild(div);

    // 3. Xử lý Logic
    const toggleBtn = document.getElementById("qn-toggle-btn");
    const closeBtn = document.getElementById("qn-close-btn");
    const noteBox = document.getElementById("qn-note-box");
    const saveBtn = document.getElementById("qn-save-btn");
    const textInput = document.getElementById("qn-text-input");
    const textList = document.getElementById("qn-text-list");

    toggleBtn.onclick = () => noteBox.classList.toggle("qn-hidden");
    closeBtn.onclick = () => noteBox.classList.add("qn-hidden");

    let savedTexts = JSON.parse(localStorage.getItem("quick_notes")) || [];

    function renderList() {
      textList.innerHTML = "";
      savedTexts.forEach((text) => {
        const li = document.createElement("li");
        li.innerHTML = `<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px;">${text}</span>`;
        
        const btn = document.createElement("button");
        btn.className = "qn-copy-btn";
        btn.textContent = "Copy";
        btn.onclick = () => {
          navigator.clipboard.writeText(text);
          btn.textContent = "Đã chép!";
          setTimeout(() => (btn.textContent = "Copy"), 1500);
        };

        li.appendChild(btn);
        textList.appendChild(li);
      });
    }

    saveBtn.onclick = () => {
      const content = textInput.value.trim();
      if (content) {
        savedTexts.unshift(content);
        localStorage.setItem("quick_notes", JSON.stringify(savedTexts));
        textInput.value = "";
        renderList();
      }
    };

    renderList();
  } else {
    // Nếu đã có sẵn thì chỉ cần bật/tắt
    document.getElementById("qn-note-box").classList.toggle("qn-hidden");
  }
})();

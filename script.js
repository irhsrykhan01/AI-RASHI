// 🔥 Ambil data dari API (data.json)
let cacheData = null;

async function loadData() {
  if (cacheData) return cacheData;

  try {
    let res = await fetch("api/data.json");
    cacheData = await res.json();
    return cacheData;
  } catch (error) {
    console.error("Gagal load data.json:", error);
    return {};
  }
}

// 🧠 Fungsi utama AI chat
async function kirimPesan(pesan) {
  let data = await loadData();

  let key = pesan.toLowerCase().trim();

  // 🔍 cari jawaban yang cocok
  for (let k in data) {
    if (key.includes(k)) {
      return data[k];
    }
  }

  return "TIDAK ADA JAWABAN 😭";
}

// 💬 fungsi tombol kirim
async function send() {
  let inputEl = document.getElementById("input");
  let chatBox = document.getElementById("chat");

  let input = inputEl.value;

  if (!input) return;

  let reply = await kirimPesan(input);

  // tampilkan chat
  chatBox.innerHTML += `
    <div style="margin:10px 0">
      <p><b>Kamu:</b> ${input}</p>
      <p><b>AI:</b> ${reply}</p>
    </div>
  `;

  // kosongkan input
  inputEl.value = "";

  // auto scroll bawah
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ⌨️ tekan Enter buat kirim
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      send();
    }
  });
});

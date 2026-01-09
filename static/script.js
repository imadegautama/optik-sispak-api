const categories = [
  {
    title: "👁️ Penampilan & Kondisi Fisik",
    gejala: [
      { id: "G01", n: "Mata Merah" },
      { id: "G12", n: "Kelopak Bengkak" },
      { id: "G17", n: "Kotoran Mata Kental" },
      { id: "G03", n: "Mata Berair" },
    ],
  },
  {
    title: "🔍 Gangguan Penglihatan",
    gejala: [
      { id: "G04", n: "Kabur Mendadak" },
      { id: "G05", n: "Kabur Perlahan" },
      { id: "G08", n: "Melihat Lingkaran Cahaya" },
      { id: "G10", n: "Bintik Hitam di Pusat" },
      { id: "G18", n: "Seperti Tertutup Tirai" },
    ],
  },
  {
    title: "⚡ Sensasi & Nyeri",
    gejala: [
      { id: "G02", n: "Mata Gatal" },
      { id: "G06", n: "Nyeri Bola Mata" },
      { id: "G07", n: "Sensitif Cahaya" },
      { id: "G11", n: "Terasa Mengganjal" },
      { id: "G16", n: "Mata Kering" },
      { id: "G19", n: "Kemasukan Benda Asing" },
    ],
  },
  {
    title: "🧠 Gejala Sistemik",
    gejala: [
      { id: "G14", n: "Sakit Kepala Hebat" },
      { id: "G15", n: "Mual / Muntah" },
      { id: "G13", n: "Sering Mengucek" },
    ],
  },
];

// Inisialisasi Tampilan
const mainContent = document.getElementById("mainContent");
categories.forEach((cat) => {
  const section = document.createElement("div");
  section.className = "category-section";
  let itemsHtml = cat.gejala
    .map(
      (g) => `
        <div class="item" onclick="toggleItem(this)">
            <input type="checkbox" value="${g.id}" onclick="event.stopPropagation(); handleCB(this)">
            <span>${g.n}</span>
        </div>`
    )
    .join("");
  section.innerHTML = `<div class="category-title">${cat.title}</div><div class="grid">${itemsHtml}</div>`;
  mainContent.appendChild(section);
});

function toggleItem(el) {
  const cb = el.querySelector("input");
  cb.checked = !cb.checked;
  el.classList.toggle("selected", cb.checked);
}

function handleCB(cb) {
  cb.parentElement.classList.toggle("selected", cb.checked);
}

// Fungsi Modal & Alert
function showAlert(pesan) {
  document.getElementById("alertMessage").innerText = pesan;
  const overlay = document.getElementById("alertOverlay");
  overlay.style.display = "flex";
  setTimeout(() => overlay.classList.add("active"), 10);
}

function closeAlert() {
  const overlay = document.getElementById("alertOverlay");
  overlay.classList.remove("active");
  setTimeout(() => (overlay.style.display = "none"), 300);
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("active");
  setTimeout(() => (overlay.style.display = "none"), 300);
}

async function kirimData() {
  const selected = Array.from(document.querySelectorAll("input:checked")).map(
    (i) => i.value
  );
  if (selected.length < 2)
    return showAlert("Pilih minimal 2 gejala untuk diagnosis yang akurat.");

  document.getElementById("loading-overlay").style.display = "flex";
  // Menggunakan relative URL karena frontend dan backend dalam satu container
  const API_URL = "/diagnosa";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gejala: selected }),
    });

    const data = await res.json();
    document.getElementById("loading-overlay").style.display = "none";

    document.getElementById("diag").innerText = data.diagnosis;
    document.getElementById("sar").innerText = data.saran;

    const confElement = document.getElementById("confText");
    confElement.innerText =
      data.confidence > 0
        ? `Tingkat Keyakinan: ${(data.confidence * 100).toFixed(0)}%`
        : "";

    const overlay = document.getElementById("modalOverlay");
    overlay.style.display = "flex";
    setTimeout(() => overlay.classList.add("active"), 10);
  } catch (e) {
    document.getElementById("loading-overlay").style.display = "none";
    showAlert(
      "Gagal terhubung ke Server. Pastikan aplikasi sudah berjalan dengan baik."
    );
  }
}

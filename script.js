const startNumberInput = document.getElementById("startNumber");
const endNumberInput = document.getElementById("endNumber");
const inputWord = document.getElementById("inputWord");
const addButton = document.getElementById("addButton");
const spinButton = document.getElementById("spinButton");
const restartButton = document.getElementById("restartButton");
const itemsContainer = document.getElementById("itemsContainer");
const wheel = document.getElementById("wheel");
const modal = document.getElementById("customAlert");
const alertMessage = document.getElementById("alertMessage");
const closeAlert = document.getElementById("closeAlert");
const resultDisplay = document.getElementById("resultDisplay");
const resultText = document.getElementById("resultText");
const remainingItemsList = document.getElementById("remainingItemsList");
let items = [];

// Fungsi untuk menambahkan item ke dalam roda
addButton.addEventListener("click", () => {
    const startNumber = parseInt(startNumberInput.value.trim());
    const endNumber = parseInt(endNumberInput.value.trim());
    const word = inputWord.value.trim();

    // Validasi input nomor
    if ((isNaN(startNumber) || isNaN(endNumber) || startNumber > endNumber) && !word) {
        showAlert("Masukkan rentang nomor atau kata.");
        return;
    }

    // Menambahkan nomor ke dalam item
    for (let i = startNumber; i <= endNumber; i++) {
        const div = document.createElement("div");
        div.textContent = i;
        itemsContainer.appendChild(div);
        items.push(div);
    }

    // Menambahkan kata jika ada
    if (word) {
        const div = document.createElement("div");
        div.textContent = word;
        itemsContainer.appendChild(div);
        items.push(div);
    }

    // Kosongkan input
    startNumberInput.value = "";
    endNumberInput.value = "";
    inputWord.value = "";

    // Atur posisi setiap item dalam lingkaran
    updateItemsPosition();
    updateRemainingItemsList();
});

// Fungsi untuk memperbarui posisi item di sekitar roda
function updateItemsPosition() {
    const angle = 360 / items.length;
    items.forEach((item, index) => {
        const rotateAngle = angle * index;
        item.style.transform = `rotate(${rotateAngle}deg) translate(120px) rotate(-${rotateAngle}deg)`;
    });
}

// Fungsi untuk memperbarui daftar item yang tersisa
function updateRemainingItemsList() {
    remainingItemsList.innerHTML = '';
    items.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item.textContent;
        remainingItemsList.appendChild(listItem);
    });
}

// Fungsi untuk memulai spin
spinButton.addEventListener("click", () => {
    if (items.length === 0) {
        showAlert("Tidak ada item untuk dipilih.");
        return;
    }

    // Nonaktifkan tombol selama animasi
    spinButton.disabled = true;

    // Buat animasi putaran
    const spins = Math.floor(Math.random() * 5) + 5; // Spin antara 5 hingga 10 putaran penuh
    const degrees = spins * 360 + Math.floor(Math.random() * 360); // Konversi ke derajat dengan offset acak

    wheel.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)"; // Pastikan transisi diatur
    wheel.style.transform = `rotate(${degrees}deg)`;

    // Waktu untuk animasi selesai
    setTimeout(() => {
        // Hitung sudut akhir setelah semua putaran
        const finalRotation = degrees % 360;

        // Hitung sudut per item
        const anglePerItem = 360 / items.length;

        // Hitung item yang dipilih berdasarkan sudut akhir
        const selectedIndex = Math.floor((360 - finalRotation) / anglePerItem) % items.length;
        const selectedItem = items[selectedIndex];

        // Tampilkan item yang terpilih
        showAlert("Item yang terpilih: " + selectedItem.textContent);
        resultText.textContent = selectedItem.textContent;

        // Hapus item yang terpilih dari display
        itemsContainer.removeChild(selectedItem);
        items.splice(selectedIndex, 1);

        // Perbarui posisi item lainnya
        updateItemsPosition();

        // Perbarui daftar item yang tersisa
        updateRemainingItemsList();

        // Aktifkan kembali tombol setelah animasi selesai
        spinButton.disabled = false;

        // Atur ulang transisi untuk putaran berikutnya
        wheel.style.transition = "none";
    }, 4000); // 4 detik, sesuai dengan durasi animasi CSS
});

// Fungsi untuk menampilkan alert custom
function showAlert(message) {
    alertMessage.textContent = message;
    modal.style.display = "flex";
}

// Fungsi untuk menutup alert custom
closeAlert.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fungsi untuk mereset tampilan
restartButton.addEventListener("click", () => {
    // Hapus semua item dari tampilan
    itemsContainer.innerHTML = '';
    items = [];

    // Setel ulang gaya transformasi roda
    wheel.style.transition = "none";
    wheel.style.transform = "rotate(0deg)";

    // Setel ulang hasil spin
    resultText.textContent = "-";

    // Setel ulang daftar item yang tersisa
    remainingItemsList.innerHTML = '';

});


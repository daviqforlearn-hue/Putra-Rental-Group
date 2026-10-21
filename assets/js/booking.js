document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // ==========================================
    // 1. INISIALISASI & PENCARIAN ELEMEN FORM
    // ==========================================
    const formUtama = document.getElementById("booking-calculator") || document.getElementById("formReservasi");
    const tombolKirim = document.getElementById("btn-submit-booking") || formUtama?.querySelector('button[type="submit"]');

    if (!formUtama || !tombolKirim) return;

    let totalUnitAktif = 1;
    const BATAS_MAKSIMAL_UNIT = 10;

    // ==========================================
    // 2. PEMBUATAN STRUKTUR MULTI-UNIT OTOMATIS
    // ==========================================
    
    // Membuat wadah utama untuk menampung barisan unit mobil
    const wadahMultiUnit = document.createElement("div");
    wadahMultiUnit.id = "wadahMultiUnit";
    wadahMultiUnit.className = "space-y-6 mb-6";

    // Membuat kotak pembungkus awal untuk Unit 1
    const kotakUnitAwal = document.createElement("div");
    kotakUnitAwal.className = "unit-box border border-slate-800 bg-slate-950/40 p-5 rounded-xl relative";
    kotakUnitAwal.id = "kotak-unit-1";

    // Label penanda Unit 1
    const labelUnitAwal = document.createElement("div");
    labelUnitAwal.className = "text-amber-400 font-semibold text-sm mb-4 uppercase tracking-wider";
    labelUnitAwal.innerText = "Reservasi Unit 1";
    kotakUnitAwal.appendChild(labelUnitAwal);

    // List ID input bawaan dari HTML Anda yang akan dimasukkan ke kotak Unit 1
    const daftarIdInput = ["calc-mobil", "calc-tanggal", "calc-jam", "calc-durasi", "calc-tipe-durasi", "mobil", "tanggal", "jam", "durasi", "satuanDurasi"];
    const elemenPindahan = [];
    
    daftarIdInput.forEach(function (id) {
        const elemen = formUtama.querySelector(`#${id}`);
        if (elemen) {
            const kelompokForm = elemen.closest('.grid') || elemen.parentElement;
            if (kelompokForm && !elemenPindahan.includes(kelompokForm) && kelompokForm !== formUtama) {
                elemenPindahan.push(kelompokForm);
            }
        }
    });

    // Pindahkan elemen input ke dalam kotak unit pertama
    elemenPindahan.forEach(function (el) {
        kotakUnitAwal.appendChild(el);
    });
    wadahMultiUnit.appendChild(kotakUnitAwal);
    formUtama.insertBefore(wadahMultiUnit, tombolKirim);

    // Membuat tombol "Tambah Unit" secara otomatis tepat di atas tombol kirim
    const tombolTambah = document.createElement("button");
    tombolTambah.type = "button";
    tombolTambah.id = "tombol-tambah-unit";
    tombolTambah.className = "w-full py-3 mb-5 border border-dashed border-amber-400/50 text-amber-400 rounded-xl hover:bg-amber-400/10 transition font-medium text-sm";
    tombolTambah.innerText = "➕ Tambah Unit Reservasi";
    formUtama.insertBefore(tombolTambah, tombolKirim);

    // ==========================================
    // 3. PENGATURAN FIELD DAN OUTPUT TAMPILAN
    // ==========================================
    const inputBawaan = {
        tanggalAwal: formUtama.querySelector("#calc-tanggal") || formUtama.querySelector("#tanggal")
    };

    const targetOutput = {
        mobil: document.getElementById("hasil-mobil") || document.getElementById("view-total-unit"),
        layanan: document.getElementById("hasil-layanan") || document.getElementById("view-paket"),
        tarif: document.getElementById("hasil-tarif") || document.getElementById("view-harga"),
        durasi: document.getElementById("hasil-durasi"),
        total: document.getElementById("hasil-total") || document.getElementById("view-harga"),
        catatan: document.getElementById("hasil-catatan")
    };

    const NOMOR_WHATSAPP = "6285210601055";

    // Daftar Harga Sewa Mobil per Hari (Lepas Kunci / Dasar)
    const DAFTAR_TARIF = Object.freeze({
        "Toyota Zenix Q HEV": 1500000,
        "Toyota Alphard": null,
        "Toyota Fortuner": 1000000,
        "Toyota Innova Reborn": 500000,
        "Toyota Hiace Premio": 1400000,
        "Toyota Hilux 4x4": null,
        "Toyota Avanza": 300000,
        "Honda Brio": 250000,
        "Toyota Agya": 250000,
        "Mitsubishi Pajero Sport": null
    });

    const PENGALI_DURASI = Object.freeze({
        "Hari": 1, "1": 1,
        "Minggu": 7, "7": 7,
        "Bulan": 30, "30": 30
    });

    function formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(angka);
    }

    function ambilLayananTerpilih() {
        const radioTerpilih = formUtama.querySelector('input[name="layanan"]:checked');
        if (radioTerpilih) return radioTerpilih.value;
        
        const dropdownPaket = document.getElementById("jenisPaket");
        if (dropdownPaket) {
            const pemetaanLabel = {
                "vip-dalam": "All-In Dalam Kota",
                "vip-luar": "All-In Luar Kota",
                "lepas": "Lepas Kunci",
                "sabang": "Tour Sabang",
                "bandara": "Antar Jemput Bandara SIM"
            };
            return pemetaanLabel[dropdownPaket.value] || dropdownPaket.value;
        }
        return "";
    }

    function hitungDurasiUnit(kotakUnit) {
        const inputDurasi = kotakUnit.querySelector('input[id^="calc-durasi"]') || kotakUnit.querySelector('input[id^="durasi"]');
        const selectTipe = kotakUnit.querySelector('select[id^="calc-tipe-durasi"]') || kotakUnit.querySelector('select[id^="satuanDurasi"]');
        
        if (!inputDurasi || !selectTipe) return null;

        const nilaiDurasi = Number(inputDurasi.value);
        const tipeDurasi = selectTipe.value;
        const angkaPengali = PENGALI_DURASI[tipeDurasi] || 1;

        if (!Number.isInteger(nilaiDurasi) || nilaiDurasi < 1 || nilaiDurasi > 365) return null;

        return {
            nilai: nilaiDurasi,
            tipe: isNaN(tipeDurasi) ? tipeDurasi : "Hari",
            totalHari: nilaiDurasi * angkaPengali
        };
    }

    function perbaruiTeksOutput(kunci, teks) {
        if (targetOutput[kunci]) targetOutput[kunci].textContent = teks;
    }

    // ==========================================
    // 4. LOGIKA UTAMA PERHITUNGAN & ESTIMASI HARGA
    // ==========================================
    function prosesKalkulasiTarif() {
        const layanan = ambilLayananTerpilih();
        const seluruhUnit = document.querySelectorAll(".unit-box");
        
        perbaruiTeksOutput("layanan", layanan || "Belum dipilih");
        perbaruiTeksOutput("mobil", `${seluruhUnit.length} Unit Armada`);

        let grandTotal = 0;
        let butuhKonfirmasiAdmin = false;
        let ringkasanDurasi = [];

        seluruhUnit.forEach(function (unit, indeks) {
            const pilihMobil = unit.querySelector('select[id^="calc-mobil"]') || unit.querySelector('select[id^="mobil"]');
            const mobil = pilihMobil ? pilihMobil.value : "";
            const dataDurasi = hitungDurasiUnit(unit);
            const hargaDasar = DAFTAR_TARIF[mobil];

            if (dataDurasi) {
                ringkasanDurasi.push(`U${indeks + 1}: ${dataDurasi.nilai} hari`);
            }

            if (!mobil || !dataDurasi || !layanan) {
                butuhKonfirmasiAdmin = true;
                return;
            }

            // KONDISI KHUSUS: Paket Luar Kota atau mobil yang belum ditentukan tarif catalog-nya
            if (layanan === "All-In Luar Kota" || layanan === "Dengan Supir" || hargaDasar == null) {
                butuhKonfirmasiAdmin = true;
            } else {
                grandTotal += (hargaDasar * dataDurasi.totalHari);
            }
        });

        perbaruiTeksOutput("durasi", ringkasanDurasi.length > 0 ? ringkasanDurasi.join(", ") : "-");

        if (butuhKonfirmasiAdmin) {
            perbaruiTeksOutput("total", "Konfirmasi Admin");
            perbaruiTeksOutput("tarif", "Konfirmasi admin");
            if (layanan === "All-In Luar Kota") {
                perbaruiTeksOutput("catatan", "Tarif All-In Luar Kota disesuaikan dengan rute tujuan. Hubungi admin untuk harga pas.");
            } else {
                perbaruiTeksOutput("catatan", "Detail penyewaan memerlukan konfirmasi manual biaya dari pihak admin.");
            }
            return null;
        }

        perbaruiTeksOutput("total", formatRupiah(grandTotal));
        perbaruiTeksOutput("tarif", "Dihitung otomatis");
        perbaruiTeksOutput("catatan", "Estimasi total untuk seluruh unit terkalkulasi berdasarkan tarif katalog aktif.");
        
        return { total: grandTotal };
    }

    // ==========================================
    // 5. EVENT HANDLER TOMBOL TAMBAH & HAPUS UNIT
    // ==========================================
    tombolTambah.addEventListener("click", function () {
        const jumlahUnitSaatIni = document.querySelectorAll(".unit-box").length;
        if (jumlahUnitSaatIni >= BATAS_MAKSIMAL_UNIT) {
            alert(`Maksimal pemesanan sekaligus adalah ${BATAS_MAKSIMAL_UNIT} unit.`);
            return;
        }

        totalUnitAktif++;
        const unitBaru = kotakUnitAwal.cloneNode(true);
        unitBaru.id = `kotak-unit-${totalUnitAktif}`;
        
        // Ubah teks judul box unit baru
        unitBaru.querySelector(".text-amber-400").innerText = `Reservasi Unit ${totalUnitAktif}`;

        // Pasang tombol hapus unit di pojok kanan atas
        const tombolHapus = document.createElement("button");
        tombolHapus.type = "button";
        tombolHapus.className = "absolute top-4 right-4 text-xs text-red-400 hover:text-red-300 font-medium";
        tombolHapus.innerText = "❌ Hapus";
        tombolHapus.onclick = function () {
            unitBaru.remove();
            prosesKalkulasiTarif();
        };
        unitBaru.appendChild(tombolHapus);

        // Reset data input pada unit hasil kloningan
        unitBaru.querySelectorAll("input").forEach(function (inp) {
if (inp.type === "number") inp.value = 1;
else inp.value = "";
});
unitBaru.querySelectorAll("select").forEach(function (sel) {
sel.selectedIndex = 0;
});
// Ubah ID elemen internal unit baru agar tetap unik
unitBaru.querySelectorAll("[id]").forEach(function (el) {
el.id = ${el.id}-${totalUnitAktif};
});
wadahMultiUnit.appendChild(unitBaru);
prosesKalkulasiTarif();
});
// Mengunci tanggal minimal hari ini untuk keamanan pemesanan
function dapatkanTanggalHariIni() {
const tgl = new Date();
const yyyy = tgl.getFullYear();
const mm = String(tgl.getMonth() + 1).padStart(2, "0");
const dd = String(tgl.getDate()).padStart(2, "0");
return ${yyyy}-${mm}-${dd};
}
if (inputBawaan.tanggalAwal) {
inputBawaan.tanggalAwal.min = dapatkanTanggalHariIni();
}
// Listener otomatis ketika ada perubahan input data form
formUtama.addEventListener("submit", function (event) {
event.preventDefault();
if (!formUtama.reportValidity()) return;
prosesKalkulasiTarif();
});
formUtama.addEventListener("change", prosesKalkulasiTarif);
formUtama.addEventListener("input", prosesKalkulasiTarif);
// ==========================================
// 6. LOGIKA PENGIRIMAN DATA KE WHATSAPP ADMIN
// ==========================================
tombolKirim.addEventListener("click", function (e) {
if (tombolKirim.type === "submit") e.preventDefault();
if (!formUtama.reportValidity()) return;
const dataEstimasi = prosesKalkulasiTarif();
const jenisLayanan = ambilLayananTerpilih();
const daftarUnitForm = document.querySelectorAll(".unit-box");
let teksPesan = *Halo Admin Putra Utama Group, saya ingin melakukan reservasi.*\n\n;
teksPesan += *Layanan:* ${jenisLayanan}\n;
teksPesan += *Total Pemesanan:* ${daftarUnitForm.length} Unit\n;
teksPesan += ===============================\n\n;
daftarUnitForm.forEach(function (unit, index) {
const selMobil = unit.querySelector('select[id^="calc-mobil"]') || unit.querySelector('select[id^="mobil"]');
const inpTgl = unit.querySelector('input[id^="calc-tanggal"]') || unit.querySelector('input[id^="tanggal"]');
const inpJam = unit.querySelector('input[id^="calc-jam"]') || unit.querySelector('input[id^="jam"]');
const inpDurasi = unit.querySelector('input[id^="calc-durasi"]') || unit.querySelector('input[id^="durasi"]');
const selTipe = unit.querySelector('select[id^="calc-tipe-durasi"]') || unit.querySelector('select[id^="satuanDurasi"]');
const namaMobil = selMobil ? selMobil.value : "";
const tglMulai = inpTgl ? inpTgl.value : "";
const jamMulai = inpJam ? inpJam.value : "";
const angkaDurasi = inpDurasi ? inpDurasi.value : "";
const tipeDurasi = selTipe ? selTipe.value : "";
const tarifMobil = DAFTAR_TARIF[namaMobil];
teksPesan += *UNIT #${index + 1}*\n;
teksPesan += • Armada: ${namaMobil}\n;
teksPesan += • Tanggal Mulai: ${tglMulai}\n;
teksPesan += • Jam Mula: ${jamMulai} WIB\n;
teksPesan += • Durasi: ${angkaDurasi} ${isNaN(tipeDurasi) ? tipeDurasi : "Hari"}\n;
teksPesan += • Tarif/Hari: ${tarifMobil != null ? formatRupiah(tarifMobil) : "Konfirmasi admin"}\n\n;
});
teksPesan += ===============================\n;
teksPesan += *Estimasi Total:* ${dataEstimasi && jenisLayanan !== "All-In Luar Kota" ? formatRupiah(dataEstimasi.total) : "Konfirmasi admin"}\n\n;
teksPesan += Mohon informasi ketersediaan unit dan rincian biaya resmi. Terima kasih!;
const tautanWhatsApp = https://wa.me{ 85210601055}?text=${encodeURIComponent(teksPesan)};
window.open(tautanWhatsApp, "_blank", "noopener,noreferrer");
});
// ==========================================
// 7. LOGIKA KATALOG ARMADA (KLIK PILIH MOBIL)
// ==========================================
const pemetaanKatalog = {
"Toyota Zenix Q HEV": "Toyota Zenix Q HEV", "Toyota Alphard VIP": "Toyota Alphard",
"Toyota Fortuner 2.8 GR Sport": "Toyota Fortuner", "Toyota Innova Reborn": "Toyota Innova Reborn",
"Toyota HiAce Premio": "Toyota Hiace Premio", "Toyota Hilux 4x4": "Toyota Hilux 4x4",
"Toyota All New Avanza": "Toyota Avanza", "Toyota Avanza Old": "Toyota Avanza Old",
"Honda Brio Satya": "Honda Brio", "Honda Brio": "Honda Brio",
"Toyota Agya": "Toyota Agya", "Mitsubishi Pajero Sport Dakar": "Mitsubishi Pajero Sport"
};
document.addEventListener("click", function (event) {
const targetKatalog = event.target.closest("[data-car], [data-book-car]");
if (!targetKatalog) return;
const namaMentah = targetKatalog.getAttribute("data-car") || targetKatalog.getAttribute("data-book-car");
if (!namaMentah) return;
const namaTerpilih = pemetaanKatalog[namaMentah] || namaMentah;
const dropdownMobilUtama = document.getElementById("calc-mobil") || document.getElementById("mobil");
if (dropdownMobilUtama) {
let opsiCocok = Array.from(dropdownMobilUtama.options).find(function (item) {
return item.value === namaTerpilih || item.textContent.trim() === namaTerpilih;
});
if (!opsiCocok) {
opsiCocok = new Option(namaMentah, namaTerpilih);
dropdownMobilUtama.add(opsiCocok);
}
dropdownMobilUtama.value = opsiCocok.value;
prosesKalkulasiTarif();
}
const elemenTargetScroll = document.getElementById("reservasi") || formUtama;
if (elemenTargetScroll) {
event.preventDefault();
elemenTargetScroll.scrollIntoView({ behavior: "smooth", block: "start" });
}
});
// Jalankan kalkulasi pertama kali untuk menetapkan default state
prosesKalkulasiTarif();
});

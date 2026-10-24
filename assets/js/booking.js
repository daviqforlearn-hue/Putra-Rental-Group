document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const $ = id => document.getElementById(id);
    const form = $("formReservasi");

    if (!form) return;

    const admin = "6285210601055";
    const tombolWA = $("kirimWhatsApp");
    const tombolHitung = form.querySelector('button[type="submit"]');

    const daftarMobil = {
        vip: [
            { id: "alphard", nama: "Toyota Alphard VIP", harga: null },
            { id: "fortuner", nama: "Toyota Fortuner 2.8 GR Sport", harga: 1600000 },
            { id: "pajero", nama: "Mitsubishi Pajero Sport Dakar", harga: 1600000 },
            { id: "zenix", nama: "Toyota Innova Zenix Q HEV", harga: 1500000 },
            { id: "hiace", nama: "Toyota HiAce Premio", harga: 1400000 },
            { id: "reborn", nama: "Toyota Innova Reborn", harga: 850000 },
            { id: "avanza", nama: "Toyota New Avanza / Veloz", harga: 750000 },
            { id: "avanza-lama", nama: "Toyota Avanza Old", harga: null },
            { id: "hilux", nama: "Toyota Hilux 4x4", harga: 1600000 },
            { id: "brio", nama: "Honda Brio", harga: 600000 },
            { id: "agya", nama: "Toyota Agya", harga: 550000 }
        ],
        lepas: [
            { id: "reborn-matic", nama: "Toyota Innova Reborn Matic", harga: 550000 },
            { id: "reborn-manual", nama: "Toyota Innova Reborn Manual", harga: 500000 },
            { id: "avanza-veloz", nama: "Toyota New Avanza / Veloz", harga: 400000 },
            { id: "avanza-lama", nama: "Toyota Avanza Old", harga: 350000 },
            { id: "brio", nama: "Honda Brio", harga: 350000 },
            { id: "agya", nama: "Toyota Agya", harga: 300000 }
        ]
    };

    const formatRp = angka => new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);

    const namaPaket = {
        vip: "Paket All-In",
        lepas: "Paket Lepas Kunci",
        sabang: "Paket Tour Sabang",
        bandara: "Paket Antar Jemput Bandara SIM"
    };

    const khusus = paket => ["sabang", "bandara"].includes(paket);

    const sumber = {
        paket: $("jenisPaket").closest("div"),
        mobil: $("mobil").closest("div"),
        supir: $("pilihanSupirLepas"),
        infoSupir: $("infoSupir"),
        tanggalJam: $("tanggal").closest(".grid"),
        durasi: $("bagianDurasi"),
        infoKhusus: $("infoPaketKhusus"),
        tujuan: $("bagianTujuan")
    };

    if (Object.values(sumber).some(el => !el)) {
        console.error("Struktur HTML reservasi tidak lengkap.");
        return;
    }

    // Simpan template sebelum memindahkan elemen dari form asli.
    const template = {};
    Object.keys(sumber).forEach(k => {
        template[k] = sumber[k].cloneNode(true);
    });

    const grupPemesanan = $("nama").closest(".grid");
    const grupCatatan = $("catatan").closest("div");

    // Wadah unit ditempatkan sebelum data pemesan.
    const wadah = document.createElement("div");
    wadah.id = "wadahMultiUnit";
    wadah.className = "space-y-6";

    form.insertBefore(wadah, grupPemesanan);

    // Buat tombol tambah unit tepat sebelum tombol hitung.
    const tombolTambah = document.createElement("button");
    tombolTambah.type = "button";
    tombolTambah.id = "tambahUnit";
    tombolTambah.className =
        "w-full rounded-xl border-2 border-amber-400 text-amber-400 " +
        "hover:bg-amber-400/10 font-bold py-3 transition";
    tombolTambah.textContent = "+ Tambah Unit";

    form.insertBefore(tombolTambah, tombolHitung);

    let nomorUnit = 0;
    const batasUnit = 10;

    function buatPilihanWilayah() {
        const grup = document.createElement("div");
        grup.dataset.role = "wilayah";
        grup.innerHTML = `
            <label class="block text-sm text-slate-300 mb-2">
                Wilayah Paket All-In
            </label>
            <select data-field="wilayah"
                class="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white focus:border-amber-400 outline-none">
                <option value="dalam">Dalam Kota — Banda Aceh dan Sekitarnya</option>
                <option value="luar">Luar Kota — Konfirmasi Admin</option>
            </select>
        `;
        return grup;
    }

    function tandaiDanUnikkanID(kotak, nomor) {
        const pemetaan = {
            jenisPaket: "paket",
            mobil: "mobil",
            opsiSupirLepas: "opsiSupir",
            tanggal: "tanggal",
            jam: "jam",
            durasi: "durasi",
            satuanDurasi: "satuanDurasi",
            tujuan: "tujuan",
            infoSupir: "infoSupir",
            teksBiayaSupir: "teksBiayaSupir",
            infoPaketKhusus: "infoKhusus",
            teksPaketKhusus: "teksKhusus"
        };

        kotak.querySelectorAll("[id]").forEach(el => {
            const idLama = el.id;
            if (pemetaan[idLama]) {
                el.dataset.field = pemetaan[idLama];
            }

            el.id = `${idLama}-unit-${nomor}`;
        });

        kotak.querySelectorAll("label[for]").forEach(label => {
            const forLama = label.htmlFor;
            label.htmlFor = `${forLama}-unit-${nomor}`;
        });

        kotak.querySelectorAll("select, input, textarea").forEach(el => {
            // Lepaskan required dari field yang disembunyikan.
            el.required = false;
        });
    }

    function buatUnit(pertama = false) {
        nomorUnit++;

        const kotak = document.createElement("div");
        kotak.className =
            "unit-box border border-slate-700 bg-slate-950/40 p-5 rounded-xl relative space-y-5";
        kotak.dataset.unit = String(nomorUnit);

        const judul = document.createElement("h3");
        judul.className = "text-amber-400 font-semibold text-sm uppercase tracking-wider";
        judul.textContent = `Reservasi Unit ${nomorUnit}`;
        kotak.appendChild(judul);

        const grup = {};

        Object.keys(template).forEach(k => {
            grup[k] = pertama
                ? sumber[k]
                : template[k].cloneNode(true);

            kotak.appendChild(grup[k]);
        });

        const wilayah = buatPilihanWilayah();
        kotak.insertBefore(wilayah, grup.supir);

        tandaiDanUnikkanID(kotak, nomorUnit);

        // Setiap unit memiliki ID unik, data mobil, dan pilihan sendiri.
        wadah.appendChild(kotak);

        if (!pertama) {
            const hapus = document.createElement("button");
            hapus.type = "button";
            hapus.className =
            hapus.className =
                "inline-flex items-center justify-center gap-2 rounded-lg " +
                "border border-red-500/40 bg-red-500/10 px-4 py-2.5 " +
                "text-sm font-semibold text-red-400 transition " +
                "hover:bg-red-500 hover:text-white";

            hapus.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="18" height="18"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round"
         aria-hidden="true">
        <path d="M3 6h18"/>
        <path d="M8 6V4h8v2"/>
        <path d="m19 6-1 14H6L5 6"/>
        <path d="M10 11v5"/>
        <path d="M14 11v5"/>
    </svg>
    <span>Hapus Unit</span>
`;

            hapus.addEventListener("click", () => {
                kotak.remove();
                perbaruiSemua();
            });

            kotak.appendChild(hapus);
        }

        const paket = kotak.querySelector('[data-field="paket"]');
        const mobil = kotak.querySelector('[data-field="mobil"]');
        const supir = kotak.querySelector('[data-field="opsiSupir"]');
        const wilayahSelect = kotak.querySelector('[data-field="wilayah"]');

        function isiMobil() {
            const paketValue = paket.value;
            const layananKhusus = khusus(paketValue);

            mobil.innerHTML = "";

            if (layananKhusus) {
                mobil.add(new Option(
                    "Unit Mobil — Konfirmasi Admin",
                    "konfirmasi-admin"
                ));
                mobil.disabled = true;
            } else {
                mobil.disabled = false;
                mobil.add(new Option("-- Pilih Unit Mobil --", ""));

                daftarMobil[paketValue].forEach(item => {
                    mobil.add(new Option(
                        `${item.nama} — ${
                            item.harga === null
                                ? "Konfirmasi Admin"
                                : formatRp(item.harga) + "/hari"
                        }`,
                        item.id
                    ));
                });
            }

            const bagianSupir = grup.supir;
            const bagianInfoSupir = grup.infoSupir;
            const bagianDurasi = grup.durasi;
            const infoLayanan = grup.infoKhusus;
            const tujuan = grup.tujuan;

            bagianSupir.classList.toggle("hidden", paketValue !== "lepas");
            bagianInfoSupir.classList.add("hidden");

            wilayah.classList.toggle("hidden", paketValue !== "vip");
            bagianDurasi.classList.toggle("hidden", layananKhusus);
            infoLayanan.classList.toggle("hidden", !layananKhusus);
            tujuan.classList.toggle("hidden", layananKhusus);
            
const tujuanInput = kotak.querySelector('[data-field="tujuan"]');

if (paketValue === "vip") {
    if (wilayahSelect.value === "dalam") {
        tujuanInput.value = "Banda Aceh dan sekitarnya";
        tujuan.classList.add("hidden");
    } else {
        tujuanInput.value = "";
        tujuan.classList.remove("hidden");
    }
} else if (paketValue === "lepas") {
    tujuan.classList.remove("hidden");
} else {
    tujuan.classList.add("hidden");
}


            const inputDurasi = kotak.querySelector('[data-field="durasi"]');
            const satuan = kotak.querySelector('[data-field="satuanDurasi"]');

            inputDurasi.required = !layananKhusus;
            satuan.required = !layananKhusus;

            if (layananKhusus) {
                const teks = kotak.querySelector('[data-field="teksKhusus"]');
                teks.textContent = paketValue === "sabang"
                    ? "Tour Sabang: harga dan durasi dikonfirmasi admin."
                    : "Antar Jemput Bandara SIM: harga dan durasi dikonfirmasi admin.";
            }

            perbaruiSupir();
            perbaruiSemua();
        }

        function perbaruiSupir() {
            const aktif = paket.value === "lepas" && supir.value !== "tanpa";
            grup.infoSupir.classList.toggle("hidden", !aktif);

            const teks = kotak.querySelector('[data-field="teksBiayaSupir"]');

            if (aktif) {
                teks.textContent = supir.value === "dalam"
                    ? "Biaya supir dalam kota: Rp200.000 per hari."
                    : "Biaya supir luar kota: Rp250.000 per hari.";
            }

            perbaruiSemua();
        }

        paket.addEventListener("change", isiMobil);
        mobil.addEventListener("change", perbaruiSemua);
        supir.addEventListener("change", perbaruiSupir);
        wilayahSelect.addEventListener("change", isiMobil);

        kotak.querySelectorAll("input, select, textarea").forEach(el => {
            el.addEventListener("input", perbaruiSemua);
            el.addEventListener("change", perbaruiSemua);
        });

        if (!pertama) {
    kotak.querySelectorAll("input, select, textarea").forEach(el => {
        if (el.tagName === "SELECT") {
            el.selectedIndex = 0;
        } else {
            el.value = "";
        }

        if (el.type === "checkbox" || el.type === "radio") {
            el.checked = false;
        }
    });
}

        isiMobil();
        return kotak;
    }

    function dataUnit(kotak) {
        const ambil = field => kotak.querySelector(`[data-field="${field}"]`);

        const paket = ambil("paket").value;
        const mobilID = ambil("mobil").value;
        const wilayah = ambil("wilayah").value;
        const dataMobil = (daftarMobil[paket] || []).find(m => m.id === mobilID);

        const durasiEl = ambil("durasi");
        const satuanEl = ambil("satuanDurasi");
        const nilaiDurasi = Math.max(1, Number(durasiEl.value) || 1);
        const pengali = Number(satuanEl.value) || 1;
        const hari = nilaiDurasi * pengali;

        const opsiSupir = ambil("opsiSupir").value;
        const memakaiSupir = paket === "lepas" && opsiSupir !== "tanpa";
        const hargaSupir = !memakaiSupir
            ? 0
            : opsiSupir === "dalam" ? 200000 : 250000;

        let harga = khusus(paket) ? null : dataMobil?.harga ?? null;

        if (paket === "vip" && wilayah === "luar") {
            harga = null;
        }

        let total = harga === null ? null : (harga + hargaSupir) * hari;

        return {
            paket,
            namaPaket: namaPaket[paket],
            mobil: khusus(paket)
                ? "Konfirmasi Admin"
                : dataMobil?.nama || "",
            harga,
            wilayah,
            durasi: nilaiDurasi,
            satuan: satuanEl.options[satuanEl.selectedIndex]?.text || "Hari",
            hari,
            tanggal: ambil("tanggal").value,
            jam: ambil("jam").value,
            tujuan: paket === "vip"
    ? (wilayah === "dalam"
        ? "Banda Aceh dan sekitarnya"
        : "Konfirmasi Admin")
    : khusus(paket)
        ? "Konfirmasi Admin"
        : ambil("tujuan").value.trim(),
supir: paket === "vip"
    ? "Termasuk paket All-In"
    : memakaiSupir
        ? opsiSupir === "dalam" ? "Supir dalam kota" : "Supir luar kota"
        : "Tanpa supir",
hargaSupir,
total,
catatan: $("catatan").value.trim()
        };
    }

    function perbaruiSemua() {
        const kotakUnit = [...wadah.querySelectorAll(".unit-box")];
        const data = kotakUnit.map(dataUnit);

        const perluKonfirmasi = data.some(d =>
            d.harga === null || d.total === null
        );

        const total = data.reduce((sum, d) => sum + (d.total || 0), 0);

        $("ringkasanPaket").textContent = data
            .map((d, i) => `${i + 1}. ${d.namaPaket}`)
            .join("\n");

        $("ringkasanMobil").textContent = data
            .map((d, i) => `${i + 1}. ${d.mobil || "Belum dipilih"}`)
            .join("\n");

        $("ringkasanTanggal").textContent = data
            .map((d, i) => `${i + 1}. ${d.tanggal || "-"}`)
            .join("\n");

        $("ringkasanJam").textContent = data
            .map((d, i) => `${i + 1}. ${d.jam || "-"}`)
            .join("\n");

        $("ringkasanDurasi").textContent = data
            .map((d, i) => `${i + 1}. ${
                khusus(d.paket) ? "Konfirmasi Admin" : `${d.hari} hari`
            }`)
            .join("\n");

        $("barisSopir").classList.remove("hidden");
        $("ringkasanSopir").textContent = data
            .map((d, i) => `${i + 1}. ${d.supir}`)
            .join("\n");

        $("totalHarga").textContent = perluKonfirmasi
            ? "Konfirmasi Admin"
            : formatRp(total);

        $("keteranganHarga").textContent = perluKonfirmasi
            ? "Sebagian unit memerlukan konfirmasi harga dari admin."
            : "Estimasi total seluruh unit, termasuk biaya supir jika dipilih.";

        tombolWA.disabled = true;
        tombolWA.dataset.siapan = "false";
    }

    // Validasi tanggal minimal untuk setiap unit.
    const sekarang = new Date();
    const tanggalHariIni = [
        sekarang.getFullYear(),
        String(sekarang.getMonth() + 1).padStart(2, "0"),
        String(sekarang.getDate()).padStart(2, "0")
    ].join("-");

    // Buat unit pertama menggunakan elemen HTML yang sudah ada.
    buatUnit(true);

    tombolTambah.addEventListener("click", () => {
        if (wadah.querySelectorAll(".unit-box").length >= batasUnit) {
            alert(`Maksimal ${batasUnit} unit untuk satu reservasi.`);
            return;
        }

        buatUnit(false);
    });

    wadah.addEventListener("change", event => {
        if (event.target.matches('input[type="date"]')) {
            event.target.min = tanggalHariIni;
        }
    });

    wadah.querySelectorAll('input[type="date"]').forEach(el => {
        el.min = tanggalHariIni;
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const unit = [...wadah.querySelectorAll(".unit-box")];
        let valid = true;

        unit.forEach(kotak => {
            const paket = kotak.querySelector('[data-field="paket"]').value;
            const mobil = kotak.querySelector('[data-field="mobil"]');
            const wilayah = kotak.querySelector('[data-field="wilayah"]').value;

            if (!khusus(paket) && !mobil.value) {
                mobil.setCustomValidity("Silakan pilih unit mobil.");
                mobil.reportValidity();
                mobil.setCustomValidity("");
                valid = false;
            }

            if (paket === "vip" && !wilayah) valid = false;
        });

        if (!valid) return;

        perbaruiSemua();
        tombolWA.disabled = false;
        tombolWA.dataset.siapan = "true";
    });

    tombolWA.addEventListener("click", () => {
        if (tombolWA.dataset.siapan !== "true") return;
        if (!form.reportValidity()) return;

        const data = [...wadah.querySelectorAll(".unit-box")].map(dataUnit);
        const nama = $("nama").value.trim();
        const kontak = $("kontak").value.trim();
        const catatan = $("catatan").value.trim();

        const pesan = [
            "Halo Putra Utama Group, saya ingin melakukan reservasi.",
            "",
            `Nama Pemesan: ${nama}`,
            `Nomor WhatsApp: ${kontak}`,
            `Total Unit: ${data.length}`,
            "",
            ...data.flatMap((d, i) => [
                `UNIT ${i + 1}`,
                `Paket: ${d.namaPaket}`,
                `Wilayah: ${d.paket === "vip" ? (d.wilayah === "luar" ? "Luar Kota" : "Dalam Kota") : "-"}`,
                `Mobil: ${d.mobil || "Belum dipilih"}`,
                `Tanggal: ${d.tanggal}`,
                `Jam: ${d.jam}`,
                `Durasi: ${khusus(d.paket) ? "Konfirmasi Admin" : `${d.durasi} ${d.satuan} (${d.hari} hari)`}`,
                `Tujuan: ${d.tujuan || (khusus(d.paket) ? "Konfirmasi Admin" : "-")}`,
                `Pilihan Supir: ${d.supir}`,
                `Biaya Supir: ${d.hargaSupir ? formatRp(d.hargaSupir) + "/hari" : "Rp0"}`,
                `Tarif Unit: ${d.harga === null ? "Konfirmasi Admin" : formatRp(d.harga) + "/hari"}`,
                `Estimasi Unit: ${d.total === null ? "Konfirmasi Admin" : formatRp(d.total)}`,
                ""
            ]),
            `Estimasi Total: ${data.some(d => d.total === null) ? "Konfirmasi Admin" : formatRp(data.reduce((sum, d) => sum + d.total, 0))}`,
            `Catatan Tambahan: ${catatan || "-"}`,
            "",
            "Mohon konfirmasi ketersediaan unit dan rincian harga. Terima kasih."
        ].join("\n");

        window.open(
            `https://wa.me/${admin}?text=${encodeURIComponent(pesan)}`,
            "_blank",
            "noopener,noreferrer"
        );
    });

    // Klik kartu paket di bagian atas akan mengubah paket Unit 1.
    document.querySelectorAll(".paket-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const unitPertama = wadah.querySelector(".unit-box");
            const paket = unitPertama?.querySelector('[data-field="paket"]');

            if (paket) {
                paket.value = btn.dataset.paket;
                paket.dispatchEvent(new Event("change", { bubbles: true }));
            }
        });
    });

    // Pilih mobil dari katalog kendaraan.
    const pemetaanKatalog = {
        "Toyota Zenix Q HEV": "zenix",
        "Toyota Alphard VIP": "alphard",
        "Toyota Fortuner 2.8 GR Sport": "fortuner",
        "Toyota Innova Reborn": "reborn",
        "Toyota HiAce Premio": "hiace",
        "Toyota Hilux 4x4": "hilux",
        "Toyota All New Avanza": "avanza",
        "Toyota New Avanza / Veloz": "avanza",
        "Toyota Avanza Old": "avanza-lama",
        "Honda Brio Satya": "brio",
        "Honda Brio": "brio",
        "Toyota Agya": "agya",
        "Mitsubishi Pajero Sport Dakar": "pajero"
    };

    document.addEventListener("click", event => {
        const target = event.target.closest("[data-car], [data-book-car]");
        if (!target) return;

        const nama = target.getAttribute("data-car") ||
                     target.getAttribute("data-book-car");
        const idMobil = pemetaanKatalog[nama];

        const unitPertama = wadah.querySelector(".unit-box");
        if (idMobil && unitPertama) {
            const paket = unitPertama.querySelector('[data-field="paket"]');
            const mobil = unitPertama.querySelector('[data-field="mobil"]');

            // Pemetaan katalog hanya mengubah pilihan ketika paket cocok.
            if (paket.value === "vip" || paket.value === "lepas") {
                const opsi = [...mobil.options].find(o => o.value === idMobil);
                if (opsi) {
                    mobil.value = idMobil;
                    perbaruiSemua();
                }
            }
        }

        $("reservasi").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    perbaruiSemua();
});

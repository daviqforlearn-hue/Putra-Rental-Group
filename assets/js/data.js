
/* ==========================================================================
   DATA MOBIL PUTRA UTAMA GROUP
   File: assets/js/data.js
   ========================================================================== */

const carsData = [
    {
        id: "zenix",
        name: "Toyota Zenix Q HEV",
        dataCar: "Toyota Zenix Q HEV",
        category: "city",
        badge: "Unggulan",
        image: "assets/images/cars/zenix.jpeg",
        price: "Rp1.500.000 / hari",
        priceOptions: {
            lepasKunci: null,
            allIn: 1500000
        },
        priceLabel: "Paket All-In",
        transmission: "Automatic",
        fuel: "Hybrid bensin",
        capacity: "7 penumpang",
        specs: [
            "Kapasitas: 7 penumpang",
            "Transmisi: Otomatis",
            "Teknologi: Hybrid EV",
            "Bagasi: Mengikuti konfigurasi kursi"
        ]
    },
    {
        id: "alphard",
        name: "Toyota Alphard VIP",
        dataCar: "Toyota Alphard VIP",
        category: "mewah",
        badge: "VIP Class",
        image: "assets/images/cars/alphard.jpeg",
        price: "Hubungi Admin",
        priceOptions: {
            lepasKunci: null,
            allIn: null
        },
        priceLabel: "Tarif sewa",
        transmission: "Otomatis",
        fuel: "Mengikuti tipe unit",
        capacity: "Mengikuti konfigurasi unit",
        specs: [
            "Kategori: Luxury MPV",
            "Transmisi: Otomatis",
            "Fasilitas: Interior premium",
            "Cocok untuk: Perjalanan VIP dan acara khusus"
        ]
    },
    {
        id: "fortuner",
        name: "Toyota Fortuner",
        dataCar: "Toyota Fortuner 2.8 GR Sport",
        category: "suv",
        badge: "",
        image: "assets/images/cars/fortuner.jpeg",
        price: "Rp1.600.000 / hari",
        priceOptions: {
            lepasKunci: null,
            allIn: 1600000
        },
        priceLabel: "Paket All-In",
        transmission: "Mengikuti unit tersedia",
        fuel: "Diesel",
        capacity: "7 penumpang",
        specs: [
            "Kapasitas: 7 penumpang",
            "Transmisi: Mengikuti unit tersedia",
            "Mesin: Diesel",
            "Cocok untuk: Perjalanan bisnis dan wisata"
        ]
    },
    {
        id: "innova-reborn",
        name: "Toyota Innova Reborn",
        dataCar: "Toyota Innova Reborn",
        category: "city",
        badge: "Favorit",
        image: "assets/images/cars/innova-reborn.jpeg",
        price: "Rp500.000–550.000 / hari",
        priceOptions: {
            lepasKunci: {
                min: 500000,
                max: 550000
            },
            allIn: 850000
        },
        priceLabel: "Harga sewa per hari",
        transmission: "Mengikuti unit tersedia",
        fuel: "Mengikuti tipe unit",
        capacity: "7 penumpang",
        specs: [
            "Kapasitas: 7 penumpang",
            "Transmisi: Konfirmasi ketersediaan unit",
            "Kenyamanan: Cocok untuk perjalanan keluarga",
            "Penggunaan: Perjalanan antarkota dan dinas"
        ]
    },
    {
        id: "hiace",
        name: "Toyota HiAce Premio",
        dataCar: "Toyota HiAce Premio",
        category: "mewah",
        badge: "Rombongan",
        image: "assets/images/cars/hiace.jpeg",
        price: "Rp1.400.000 / hari",
        priceOptions: {
            lepasKunci: null,
            allIn: 1400000
        },
        priceLabel: "Paket All-In",
        transmission: "Manual",
        fuel: "Diesel",
        capacity: "Mengikuti konfigurasi unit",
        specs: [
            "Kategori: Minibus executive",
            "Kapasitas: Mengikuti konfigurasi unit",
            "Mesin: Diesel",
            "Cocok untuk: Wisata dan rombongan"
        ]
    },
    {
        id: "hilux",
        name: "Toyota Hilux 4x4",
        dataCar: "Toyota Hilux 4x4",
        category: "suv",
        badge: "Kebutuhan Proyek",
        image: "assets/images/cars/hilux.jpeg",
        price: "Hubungi Admin",
        priceOptions: {
            lepasKunci: null,
            allIn: null
        },
        priceLabel: "Tarif sewa",
        transmission: "Mengikuti unit tersedia",
        fuel: "Diesel",
        capacity: "Mengikuti konfigurasi unit",
        specs: [
            "Kategori: Double Cabin",
            "Penggerak: 4x4",
            "Mesin: Diesel",
            "Cocok untuk: Kebutuhan proyek dan lapangan"
        ]
    },
    {
        id: "avanza",
        name: "Toyota All New Avanza",
        dataCar: "Toyota All New Avanza",
        category: "city",
        badge: "Ekonomis",
        image: "assets/images/cars/avanza.jpeg",
        price: "Rp400.000 / hari",
        priceOptions: {
            lepasKunci: 400000,
            allIn: 750000
        },
        priceLabel: "Harga sewa per hari",
        transmission: "Mengikuti unit tersedia",
        fuel: "Bensin",
        capacity: "7 penumpang",
        specs: [
            "Kapasitas: 7 penumpang",
            "Transmisi: Konfirmasi ketersediaan unit",
            "Mesin: Bensin",
            "Cocok untuk: Keluarga dan wisata"
        ]
    },
    {
        id: "avanza-old",
        name: "Toyota Avanza Old",
        dataCar: "Toyota Avanza Old",
        category: "city",
        badge: "",
        image: "assets/images/cars/avanzaold.jpeg",
        price: "Rp350.000 / hari",
        priceOptions: {
            lepasKunci: 350000,
            allIn: null
        },
        priceLabel: "Lepas kunci",
        transmission: "Mengikuti unit tersedia",
        fuel: "Bensin",
        capacity: "Mengikuti konfigurasi unit",
        specs: [
            "Kategori: MPV keluarga",
            "Mesin: Bensin",
            "Penggunaan: Mobilitas harian",
            "Keunggulan: Pilihan ekonomis"
        ]
    },
    {
        id: "brio",
        name: "Honda Brio Satya",
        dataCar: "Honda Brio",
        category: "city",
        badge: "",
        image: "assets/images/cars/brio.jpeg",
        price: "Rp350.000 / hari",
        priceOptions: {
            lepasKunci: 350000,
            allIn: 600000
        },
        priceLabel: "Harga sewa per hari",
        transmission: "Mengikuti unit tersedia",
        fuel: "Bensin",
        capacity: "5 penumpang",
        specs: [
            "Kapasitas: 5 penumpang",
            "Kategori: City car",
            "Mesin: Bensin",
            "Cocok untuk: Perjalanan dalam kota"
        ]
    },
    {
        id: "agya",
        name: "Toyota Agya",
        dataCar: "Toyota Agya",
        category: "city",
        badge: "",
        image: "assets/images/cars/agya.jpeg",
        price: "Rp300.000 / hari",
        priceOptions: {
            lepasKunci: 300000,
            allIn: 550000
        },
        priceLabel: "Harga sewa per hari",
        transmission: "Mengikuti unit tersedia",
        fuel: "Bensin",
        capacity: "5 penumpang",
        specs: [
            "Kapasitas: 5 penumpang",
            "Kategori: Compact car",
            "Mesin: Bensin",
            "Cocok untuk: Perjalanan hemat dalam kota"
        ]
    },
    {
        id: "pajero",
        name: "Mitsubishi Pajero Sport",
        dataCar: "Mitsubishi Pajero Sport Dakar",
        category: "suv",
        badge: "",
        image: "assets/images/cars/pajero.jpeg",
        price: "Rp1.600.000 / hari",
        priceOptions: {
            lepasKunci: null,
            allIn: 1600000
        },
        priceLabel: "Paket All-In",
        transmission: "Mengikuti unit tersedia",
        fuel: "Diesel",
        capacity: "Mengikuti konfigurasi unit",
        specs: [
            "Kategori: SUV premium",
            "Mesin: Diesel",
            "Transmisi: Konfirmasi ketersediaan unit",
            "Cocok untuk: Perjalanan bisnis dan wisata"
        ]
    }
];


/* ==========================================================================
   HELPER FUNCTIONS
   ========================================================================== */

function formatRupiah(nominal) {
    if (typeof nominal !== "number" || !Number.isFinite(nominal)) {
        return "Hubungi Admin";
    }

    return "Rp" + nominal.toLocaleString("id-ID");
}

function getCarById(id) {
    return carsData.find(car => car.id === id) || null;
}

function getCarByName(name) {
    const nama = String(name).trim().toLowerCase();

    return carsData.find(car =>
        car.name.toLowerCase() === nama ||
        car.dataCar.toLowerCase() === nama
    ) || null;
}

function getCarsByCategory(category) {
    if (!category || category === "all") {
        return [...carsData];
    }

    return carsData.filter(car => car.category === category);
}

function getCarPrice(car, packageType = "allIn") {
    if (!car || !car.priceOptions) return null;

    return car.priceOptions[packageType] ?? null;
}

function isCarPriceAvailable(car, packageType = "allIn") {
    const price = getCarPrice(car, packageType);

    if (typeof price === "number") {
        return price > 0;
    }

    return Boolean(
        price &&
        typeof price === "object" &&
        typeof price.min === "number" &&
        typeof price.max === "number" &&
        price.min > 0 &&
        price.max >= price.min
    );
}


/* ==========================================================================
   RENDER CAROUSEL
   ========================================================================== */

function renderCars(category = "all") {
    const carousel = document.getElementById("carousel-mobil");
    if (!carousel) return;

    const daftarMobil = getCarsByCategory(category);

    carousel.innerHTML = daftarMobil.map(car => {
        const index = carsData.findIndex(item => item.id === car.id);

        let daftarHarga = "";

        if (typeof car.priceOptions.lepasKunci === "number") {
            daftarHarga += `
                <div class="flex justify-between gap-2 text-sm">
                    <span class="text-gray-500">Lepas kunci</span>
                    <strong class="text-right text-brand-gold dark:text-brand-amber">
                        ${formatRupiah(car.priceOptions.lepasKunci)}/hari
                    </strong>
                </div>`;
        } else if (car.priceOptions.lepasKunci) {
            daftarHarga += `
                <div class="flex justify-between gap-2 text-sm">
                    <span class="text-gray-500">Lepas kunci</span>
                    <strong class="text-right text-brand-gold dark:text-brand-amber">
                        ${formatRupiah(car.priceOptions.lepasKunci.min)}–${formatRupiah(car.priceOptions.lepasKunci.max)}/hari
                    </strong>
                </div>`;
        }

        if (typeof car.priceOptions.allIn === "number") {
            daftarHarga += `
                <div class="flex justify-between gap-2 text-sm">
                    <span class="text-gray-500">Paket All-In</span>
                    <strong class="text-right text-brand-gold dark:text-brand-amber">
                        ${formatRupiah(car.priceOptions.allIn)}/hari
                    </strong>
                </div>`;
        } else if (car.priceOptions.allIn === null) {
            daftarHarga += `
                <div class="flex justify-between gap-2 text-sm">
                    <span class="text-gray-500">Paket All-In</span>
                    <strong class="text-right text-brand-gold dark:text-brand-amber">
                        Hubungi Admin
                    </strong>
                </div>`;
        }

        const badgeClass = car.badge === "VIP Class"
            ? "bg-gray-900 text-amber-300"
            : car.badge === "Favorit"
                ? "bg-brand-gold text-white"
                : car.badge === "Rombongan"
                    ? "bg-blue-600 text-white"
                    : car.badge === "Ekonomis"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white";

        return `
            <article class="group flex w-[280px] min-w-[280px] snap-start flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-brand-card sm:w-[320px] sm:min-w-[320px]">

                <button type="button"
                    data-detail-mobil="${index}"
                    aria-label="Lihat detail ${car.name}"
                    class="relative block h-56 w-full overflow-hidden bg-gray-100 text-left dark:bg-gray-900">

                    ${car.badge ? `
                        <span class="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-bold ${badgeClass}">
                            ${car.badge}
                        </span>` : ""}

                    <img src="${car.image}" alt="${car.name}" loading="lazy"
                        class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
                </button>

                <div class="flex flex-1 flex-col p-5">
                    <button type="button"
                        data-detail-mobil="${index}"
                        class="text-left font-heading text-lg font-bold hover:text-brand-gold dark:hover:text-brand-amber">
                        ${car.name}
                    </button>

                    <p class="mt-2 text-sm text-gray-500">
                        ${car.capacity} · ${car.transmission}
                    </p>

                    <div class="mt-5 flex-1 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                        ${car.specs.slice(0, 2).map(spec =>
                            `<p>${spec}</p>`
                        ).join("")}
                    </div>

                    <div class="mt-5 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <p class="mb-3 text-xs text-gray-500">${car.priceLabel}</p>
                        <div class="space-y-2">${daftarHarga}</div>

                        <a href="#reservasi"
                            data-car="${car.dataCar}"
                            class="mt-4 block rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-brand-gold dark:bg-white dark:text-gray-900 dark:hover:bg-brand-amber">
                            Pilih Armada
                        </a>
                    </div>
                </div>
            </article>`;
    }).join("");
}


/* ==========================================================================
   MODAL DETAIL MOBIL
   ========================================================================== */

function openCarDetail(id) {
    const car = getCarById(id);
    const modal = document.getElementById("modal-detail-mobil");

    if (!car || !modal) return;

    document.getElementById("detail-mobil-gambar").src = car.image;
    document.getElementById("detail-mobil-gambar").alt = car.name;
    document.getElementById("detail-mobil-nama").textContent = car.name;

    document.getElementById("detail-mobil-info").textContent =
        `${car.capacity} · ${car.transmission} · ${car.fuel}`;

    const spesifikasi = document.getElementById("detail-mobil-spesifikasi");
    spesifikasi.replaceChildren();

    car.specs.forEach(teks => {
        const p = document.createElement("p");
        p.textContent = teks;
        spesifikasi.appendChild(p);
    });

    const harga = document.getElementById("detail-mobil-harga");
    harga.replaceChildren();

    function tambahBarisHarga(label, nilai) {
        const baris = document.createElement("div");
        baris.className = "flex justify-between gap-3 text-sm";

        const teksLabel = document.createElement("span");
        teksLabel.className = "text-gray-500";
        teksLabel.textContent = label;

        const teksHarga = document.createElement("strong");
        teksHarga.className =
            "text-right text-brand-gold dark:text-brand-amber";
        teksHarga.textContent = nilai;

        baris.append(teksLabel, teksHarga);
        harga.appendChild(baris);
    }

    const p = car.priceOptions;

    if (typeof p.lepasKunci === "number") {
        tambahBarisHarga(
            "Lepas kunci",
            `${formatRupiah(p.lepasKunci)}/hari`
        );
    } else if (p.lepasKunci) {
        tambahBarisHarga(
            "Lepas kunci",
            `${formatRupiah(p.lepasKunci.min)}–${formatRupiah(p.lepasKunci.max)}/hari`
        );
    }

    if (typeof p.allIn === "number") {
        tambahBarisHarga(
            "Paket All-In",
            `${formatRupiah(p.allIn)}/hari`
        );
    } else if (p.allIn === null) {
        tambahBarisHarga("Paket All-In", "Hubungi Admin");
    }

    const tombolPilih = document.getElementById("detail-mobil-pilih");
    tombolPilih.dataset.car = car.dataCar;
    tombolPilih.href = "#reservasi";

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
}

function closeCarDetail() {
    const modal = document.getElementById("modal-detail-mobil");
    if (!modal) return;

    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
}


/* ==========================================================================
   INISIALISASI EVENT
   ========================================================================== */

function initCarCatalog() {
    const carousel = document.getElementById("carousel-mobil");
    const modal = document.getElementById("modal-detail-mobil");

    if (!carousel || !modal) return;

    renderCars();

    carousel.addEventListener("click", event => {
        const tombol = event.target.closest("[data-detail-mobil]");

        if (tombol) {
            openCarDetail(carsData[Number(tombol.dataset.detailMobil)]?.id);
        }
    });

    document.getElementById("tutup-detail-mobil")
        ?.addEventListener("click", closeCarDetail);

    modal.addEventListener("click", event => {
        if (event.target === modal) closeCarDetail();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !modal.classList.contains("hidden")) {
            closeCarDetail();
        }
    });

    document.getElementById("mobil-sebelumnya")
        ?.addEventListener("click", () => {
            carousel.scrollBy({
                left: -carousel.clientWidth * 0.8,
                behavior: "smooth"
            });
        });

    document.getElementById("mobil-berikutnya")
        ?.addEventListener("click", () => {
            carousel.scrollBy({
                left: carousel.clientWidth * 0.8,
                behavior: "smooth"
            });
        });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCarCatalog);
} else {
    initCarCatalog();
}

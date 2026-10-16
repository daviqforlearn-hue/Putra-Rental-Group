const carsData = [
    // 1. TOYOTA ZENIX Q HEV
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

    // 2. TOYOTA ALPHARD VIP
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

    // 3. TOYOTA FORTUNER
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

    // 4. TOYOTA INNOVA REBORN
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

    // 5. TOYOTA HIACE PREMIO
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

    // 6. TOYOTA HILUX 4x4
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

    // 7. TOYOTA ALL NEW AVANZA
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

    // 8. TOYOTA AVANZA OLD
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

    // 9. HONDA BRIO
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

    // 10. TOYOTA AGYA
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

    // 11. MITSUBISHI PAJERO SPORT
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


/* ========================================================================== */
/* HELPER FUNCTIONS                                                           */
/* ========================================================================== */

// Format angka menjadi Rupiah.
function formatRupiah(nominal) {
    if (typeof nominal !== "number" || !Number.isFinite(nominal)) {
        return "Hubungi Admin";
    }

    return "Rp" + nominal.toLocaleString("id-ID");
}

// Mendapatkan data kendaraan berdasarkan ID.
function getCarById(id) {
    return carsData.find(car => car.id === id) || null;
}

// Mendapatkan data kendaraan berdasarkan nama reservasi.
function getCarByName(name) {
    return carsData.find(car =>
        car.name.toLowerCase() === String(name).toLowerCase() ||
        car.dataCar.toLowerCase() === String(name).toLowerCase()
    ) || null;
}

// Mendapatkan kendaraan berdasarkan kategori.
function getCarsByCategory(category) {
    if (!category || category === "all") {
        return [...carsData];
    }

    return carsData.filter(car => car.category === category);
}

// Mendapatkan harga sesuai jenis paket.
function getCarPrice(car, packageType = "allIn") {
    if (!car || !car.priceOptions) {
        return null;
    }

    return car.priceOptions[packageType] ?? null;
}

// Memeriksa apakah harga tersedia.
function isCarPriceAvailable(car, packageType = "allIn") {
    const price = getCarPrice(car, packageType);

    if (typeof price === "number") {
        return price > 0;
    }

    return Boolean(
        price &&
        typeof price === "object" &&
        price.min > 0 &&
        price.max >= price.min
    );
}

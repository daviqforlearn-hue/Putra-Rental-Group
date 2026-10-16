
document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const form = document.getElementById("booking-calculator");
    const button = document.getElementById("btn-submit-booking");

    if (!form || !button) return;

    const fields = {
        car: form.querySelector("#calc-mobil"),
        date: form.querySelector("#calc-tanggal"),
        time: form.querySelector("#calc-jam"),
        duration: form.querySelector("#calc-durasi"),
        durationType: form.querySelector("#calc-tipe-durasi"),
        service: form.querySelector('input[name="layanan"]:checked')
    };

    const output = {
        car: document.getElementById("hasil-mobil"),
        service: document.getElementById("hasil-layanan"),
        rate: document.getElementById("hasil-tarif"),
        duration: document.getElementById("hasil-durasi"),
        total: document.getElementById("hasil-total"),
        note: document.getElementById("hasil-catatan")
    };

    const WHATSAPP_NUMBER = "6285210601055";

    const FLEET = Object.freeze({
        "Toyota Zenix Q HEV": 1_500_000,
        "Toyota Alphard": null,
        "Toyota Fortuner": 1_000_000,
        "Toyota Innova Reborn": 500_000,
        "Toyota Hiace Premio": 1_400_000,
        "Toyota Hilux 4x4": null,
        "Toyota Avanza": 300_000,
        "Honda Brio": 250_000,
        "Toyota Agya": 250_000,
        "Mitsubishi Pajero Sport": null
    });

    const DURATION_MULTIPLIERS = Object.freeze({
        Hari: 1,
        Minggu: 7,
        Bulan: 30
    });

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(amount);

    const getService = () =>
        form.querySelector('input[name="layanan"]:checked')?.value ?? "";

    const getDuration = () => {
        const value = Number(fields.duration.value);
        const unit = fields.durationType.value;
        const multiplier = DURATION_MULTIPLIERS[unit];

        if (
            !Number.isInteger(value) ||
            value < 1 ||
            value > 365 ||
            !multiplier
        ) {
            return null;
        }

        return {
            value,
            unit,
            days: value * multiplier
        };
    };

    const setOutput = (key, value) => {
        if (output[key]) output[key].textContent = value;
    };

    const calculateEstimate = () => {
        const car = fields.car.value;
        const service = getService();
        const duration = getDuration();
        const rate = FLEET[car];

        setOutput("car", car || "Belum dipilih");
        setOutput("service", service || "Belum dipilih");

        setOutput(
            "duration",
            duration
                ? `${duration.value} ${duration.unit.toLowerCase()} (${duration.days} hari)`
                : "-"
        );

        setOutput(
            "rate",
            car && rate != null
                ? `${formatCurrency(rate)}/hari`
                : "Konfirmasi admin"
        );

        if (!car || !duration || !service) {
            setOutput("total", "Belum tersedia");
            setOutput("note", "Lengkapi detail penyewaan untuk melihat estimasi.");
            return null;
        }

        if (service === "Dengan Supir") {
            setOutput("total", "Konfirmasi Admin");
            setOutput(
                "note",
                "Tarif dengan supir bergantung pada paket layanan. Hubungi admin untuk rincian biaya."
            );
            return null;
        }

        if (rate == null) {
            setOutput("total", "Konfirmasi Admin");
            setOutput(
                "note",
                "Tarif armada belum tersedia. Hubungi admin untuk mendapatkan penawaran."
            );
            return null;
        }

        const total = rate * duration.days;

        setOutput("total", formatCurrency(total));
        setOutput(
            "note",
            "Estimasi berdasarkan tarif katalog untuk lepas kunci. Biaya tambahan dan ketersediaan unit perlu dikonfirmasi."
        );

        return {
            car,
            service,
            rate,
            duration,
            total
        };
    };

    const getLocalDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    fields.date.min = getLocalDate();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        calculateEstimate();
    });

    form.addEventListener("change", calculateEstimate);
    fields.duration.addEventListener("input", calculateEstimate);

    button.addEventListener("click", () => {
        if (!form.reportValidity()) return;

        const estimate = calculateEstimate();

        const message = [
            "Halo Admin Putra Utama Group, saya ingin melakukan reservasi.",
            "",
            `Armada: ${fields.car.value}`,
            `Layanan: ${getService()}`,
            `Tanggal mulai: ${fields.date.value}`,
            `Jam mulai: ${fields.time.value} WIB`,
            `Durasi: ${fields.duration.value} ${fields.durationType.value}`,
            `Tarif per hari: ${
                FLEET[fields.car.value] != null
                    ? formatCurrency(FLEET[fields.car.value])
                    : "Konfirmasi admin"
            }`,
            `Estimasi total: ${
                estimate ? formatCurrency(estimate.total) : "Konfirmasi admin"
            }`,
            "",
            "Mohon informasi ketersediaan unit dan rincian biaya."
        ].join("\n");

        const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank", "noopener,noreferrer");
    });

    
    // Katalog: klik gambar, nama, atau tombol Pilih Armada.
    const catalogCarMap = {
        "Toyota Zenix Q HEV": "Toyota Zenix Q HEV",
        "Toyota Alphard VIP": "Toyota Alphard",
        "Toyota Fortuner 2.8 GR Sport": "Toyota Fortuner",
        "Toyota Innova Reborn": "Toyota Innova Reborn",
        "Toyota HiAce Premio": "Toyota Hiace Premio",
        "Toyota Hilux 4x4": "Toyota Hilux 4x4",
        "Toyota All New Avanza": "Toyota Avanza",
        "Toyota Avanza Old": "Toyota Avanza Old",
        "Honda Brio Satya": "Honda Brio",
        "Honda Brio": "Honda Brio",
        "Toyota Agya": "Toyota Agya",
        "Mitsubishi Pajero Sport Dakar": "Mitsubishi Pajero Sport"
    };

    document.addEventListener("click", function (event) {
        const target = event.target.closest("[data-car], [data-book-car]");

        if (!target) return;

        const rawName =
            target.getAttribute("data-car") ||
            target.getAttribute("data-book-car");

        if (!rawName) return;

        const selectedName = catalogCarMap[rawName] || rawName;

        // Cari opsi yang sesuai pada dropdown kalkulator.
        let option = Array.from(fields.car.options).find(item =>
            item.value === selectedName ||
            item.textContent.trim() === selectedName
        );

        // Jika opsi belum ada, tambahkan agar mobil bisa dipilih.
        if (!option) {
            option = new Option(rawName, selectedName);
            fields.car.add(option);
        }

        fields.car.value = option.value;

        // Perbarui hasil kalkulasi.
        calculateEstimate();

        // Arahkan pelanggan ke kalkulator reservasi.
        const calculator = document.getElementById("reservasi")
            || document.getElementById("booking-calculator");

        if (calculator) {
            event.preventDefault();

            calculator.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });


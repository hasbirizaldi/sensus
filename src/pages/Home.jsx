import { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

export default function App() {
  const [dataBangsal, setDataBangsal] = useState({});
  const [bangsal, setBangsal] = useState("");
  const [dokterTerpilih, setDokterTerpilih] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  // ===================== DATA BANGSAL =====================
  const daftarBangsal = [
    "AR Fakhrudin",
    "Al Ma'un",
    "Chamdani",
    "Salamah",
    "Khodijah",
    "ICU",
    "Poli",
  ];

  // ===================== DATA DOKTER LENGKAP =====================
  const daftarDokter = [
    {
      id: 1,
      nama: "dr. Adi",
      fullname:'dr. Adi Purnomo, Sp.B',
      wa: "62811257001",
    },
    {
      id: 2,
      nama: "dr. Alam",
      fullname:'dr. Syaiful Alam, Sp.OG',
      wa: "6285640402997",
    },
    {
      id: 3,
      nama: "dr. Andi",
      fullname:'dr. Andi Sulistyo Nugroho, Sp.KFR',
      wa: "628122666710",
    },
    {
      id: 4,
      nama: "dr. Andreas",
      fullname:"dr. Andreas Pramudito, Sp. U",
      wa: "6285643956699",
    },
    {
      id: 5,
      nama: "dr. Anwar",
      fullname:"dr. Khoerul Anwar, Sp.PD",
      wa: "6281393890635",
    },
    {
      id: 6,
      nama: "dr. Aziz",
      fullname:"dr. M. Abdul Aziz, Sp.OT",
      wa: "6282221913050",
    },
    {
      id: 7,
      nama: "dr. Desi",
      fullname:"dr. Desi Widiyanti, Sp.PK",
      wa: "6285640402997",
    },
    {
      id: 8,
      nama: "dr. Faizal",
      fullname:"dr. Muhammad Faizal Hadiyanto, Sp.An",
      wa: "6281325695698",
    },
    {
      id: 9,
      nama: "dr. Haryono",
      fullname:"dr. Haryono Yuniarto, Sp.PD-KGH",
      wa: "6282328010423",
    },
    {
      id: 10,
      nama: "dr. Inet",
      fullname:"dr. Inet Fyndiannne M, Sp. P",
      wa: "6281802673525",
    },
    {
      id: 11,
      nama: "dr. Inkoni",
      fullname:"dr. Inkoni Novitasari, Sp. M",
      wa: "6282323233839",
    },
    {
      id: 12,
      nama: "dr. Triwidya ",
      fullname:"dr. Triwidya Putri M, Sp.PD",
      wa: "6285640402997",
    },
    {
      id: 13,
      nama: "dr. Jalul",
      fullname:"dr. M. Jalul Mutaqorrib, M.Med.Sc., Sp.A",
      wa: "6285640402997",
    },
    {
      id: 14,
      nama: "dr. Khalifa",
      fullname:"dr. Khalifa Rahmani, Sp.N",
      wa: "6281318387701",
    },
    {
      id: 15,
      nama: "dr. Khayati",
      fullname:"dr. Khayati Handayani, Sp.PD",
      wa: "6281573667690",
    },
    {
      id: 16,
      nama: "dr. Levi",
      fullname:"dr. Deyna Primavita Pahlevi., Sp.OG(K)-KFM",
      wa: "6285640402997",
    },
     {
      id: 17,
      nama: "dr. Ricky",
      fullname:"dr. Ricky Dwi Nur Tyastono, Sp.B",
      wa: "6282313451212",
    },
     {
      id: 18,
      nama: "dr. Sari Anak",
      fullname:"dr. Dyah Ayu Wulansari, M.Sc., Sp.A",
      wa: "6282242603941",
    },
     {
      id: 19,
      nama: "dr. Sari Jantung",
      fullname:"dr. Sari Rahayu Dwi Utami, Sp.JP",
      wa: "6285157601419",
    },
     {
      id: 20,
      nama: "dr. Satya",
      fullname:"dr. Ahmad Satya Negara, Sp.D.V",
      wa: "6285640402997",
    },
     {
      id: 21,
      nama: "dr. Tri Hastuti",
      fullname:"dr. Tri Hastuti H, Sp.S",
      wa: "6281356080886",
    },
    {
      id: 22,
      nama: "dr. M.P. Hastuti",
      fullname:"drg. M.P. Hastuti",
      wa: "6285640402997",
    },
    {
      id: 23,
      nama: "dr. Windy",
      fullname:"dr. Windy Rizkiana, Sp.THT-KL",
      wa: "6285225025186",
    },
    {
      id: 24,
      nama: "drg. Surdin",
      fullname:"drg. Surdin, Sp.Pros",
      wa: "6282136746739",
    },
  ];

  // ===================== TANGGAL HARI INI =====================
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // ===================== DOKTER UNIK =====================
  const allDokter = Array.from(new Set(Object.values(dataBangsal).flat()));

  // ===================== CHECKBOX =====================
  const handleCheckbox = (nama) => {
    setDokterTerpilih((prev) =>
      prev.includes(nama)
        ? prev.filter((d) => d !== nama)
        : [...prev, nama]
    );
  };

  // ===================== SIMPAN DATA =====================
  const handleTambah = () => {
    if (!bangsal || dokterTerpilih.length === 0) return;

    setDataBangsal((prev) => {
      const prevDokter = prev[bangsal] || [];

      return {
        ...prev,
        [bangsal]: Array.from(
          new Set([...prevDokter, ...dokterTerpilih])
        ).sort(),
      };
    });

    setDokterTerpilih([]);
  };

  // ===================== COPY OPERAN SEMUA =====================
  const handleCopy = async () => {
    if (Object.keys(dataBangsal).length === 0) return;

    let text = `Operan ${today}\n\n`;

    Object.entries(dataBangsal).forEach(([namaBangsal, dokter]) => {
      const dokterText = dokter.join(", ");
      text += `${namaBangsal} : ${dokterText}\n`;
    });

    await navigator.clipboard.writeText(text);
    alert("Operan berhasil disalin mantap✅");
  };

  // ===================== COPY BANGSAL PER DOKTER =====================
  const handleCopyBangsal = (listBangsal) => {
    if (listBangsal.length === 0) return;

    const text = listBangsal.join(", ");

    navigator.clipboard.writeText(text);
    alert("Bangsal berhasil disalin mantap✅");
  };

  // ===================== WHATSAPP DOKTER =====================
  const handleWhatsApp = (dokterNama) => {
    const dokterInfo = daftarDokter.find((d) => d.nama === dokterNama);

    if (!dokterInfo) {
      alert("Dokter tidak ditemukan");
      return;
    }

    // ambil bangsal tugas dokter
    const bangsalDokter = Object.keys(dataBangsal).filter((b) =>
      dataBangsal[b].includes(dokterNama)
    );

    if (bangsalDokter.length === 0) {
      alert("Dokter ini belum punya bangsal tugas");
      return;
    }

    let bangsalText = "";

    if (bangsalDokter.length === 1) {
      bangsalText = bangsalDokter[0];
    } else if (bangsalDokter.length === 2) {
      bangsalText = bangsalDokter.join(" dan ");
    } else if (bangsalDokter.length > 2) {
      bangsalText =
        bangsalDokter.slice(0, -1).join(", ") +
        ", dan " +
        bangsalDokter[bangsalDokter.length - 1];
    }

    const message = encodeURIComponent(
      `Assalamualaikum wr wb\n` +
      `${today}\n\n` +
      `Selamat Pagi ${dokterInfo.fullname}\n`+
      `Semoga sehat dan berkah selalu\n\n`+
      `Informasi RS PKU Muhammadiyah Sruweng menginformasikan :\n`+
      `Jadwal Poli : \n`+
      `Jadwal visite pasien hari ini ada di ruang: ${bangsalText}\n\n` +
      `Terimakasih, Sukses Selalu Dokter \n\n`+
      `Wassalamualaikum wr wb`
    );

    window.open(
      `https://wa.me/${dokterInfo.wa}?text=${message}`,
      "_blank"
    );
  };

  const formatBangsal = (list) => {
    if (list.length === 0) return "-";
    if (list.length === 1) return list[0];
    if (list.length === 2) return list.join(" dan ");

    return (
      list.slice(0, -1).join(", ") +
      ", dan " +
      list[list.length - 1]
    );
  };

  const formatList = (list) => {
    if (list.length === 0) return "-";
    if (list.length === 1) return list[0];
    if (list.length === 2) return list.join(" dan ");

    return (
      list.slice(0, -1).join(", ") +
      ", dan " +
      list[list.length - 1]
    );
  };
  // ===================== UI =====================
  return (
    <div className="min-h-screen bg-slate-200 sm:p-4 p-1 relative">
      <h1 className="text-2xl font-bold text-center mb-6">
        Manajemen Sensus Dokter
      </h1>
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="absolute right-6 top-4 flex items-center justify-center font-semibold cursor-pointer select-none"
      >
        <p>Admin Informasi</p>
        <IoMdArrowDropdown
          className={`transition-transform text-xl ${showMenu ? "rotate-180" : ""}`}
        />
      </div>
      {showMenu && (
        <div className="absolute right-7 top-12 bg-white rounded border shadow px-14 py-2 z-50">
          <ul className="space-y-3 flex flex-col">
            <Link to="/admin" className="cursor-pointer hover:text-blue-600">Admin</Link>
            <Link to="/profile" className="cursor-pointer hover:text-blue-600">Profile</Link>
            <Link to="/logout" className="cursor-pointer hover:text-red-600">Logout</Link>
          </ul>
        </div>
      )}

      {/* ===================== INPUT ===================== */}
      <div className="bg-white border-2 border-green-700 rounded-xl p-5 sm:w-[80%] w-full mx-auto space-y-4">

        {/* Pilih Bangsal */}
        <div>
          <label className="font-semibold">Pilih Bangsal</label>
          <select
            value={bangsal}
            onChange={(e) => setBangsal(e.target.value)}
            className="w-full border rounded p-2 mt-1 cursor-pointer"
          >
            <option value="">-- Pilih Bangsal --</option>
            {daftarBangsal.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Pilih Dokter */}
        <div>
          <p className="font-semibold mb-2">Pilih Dokter</p>

          <div className="grid grid-cols-4 gap-3 min-h-66 overflow-y-auto border rounded-lg sm:p-4 p-2">
            {daftarDokter.map((d) => (
              <label
                key={d.id}
                className="flex items-center gap-2 sm:text-base text-sm font-bold cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={dokterTerpilih.includes(d.nama)}
                  onChange={() => handleCheckbox(d.nama)}
                  className="cursor-pointer"
                />
                {d.nama}
              </label>
            ))}
          </div>
        </div>

        {/* Tombol Simpan */}
        <button
          onClick={handleTambah}
          className="w-full bg-green-600 cursor-pointer text-white font-semibold py-2 rounded-lg hover:bg-green-700"
        >
          SIMPAN
        </button>
      </div>

      {/* ===================== OPERAN ===================== */}
      <div className="bg-white border-2 border-green-700 rounded-xl p-5 sm:w-[80%] mx-auto mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold">Operan {today}</h2>

          <button
            onClick={handleCopy}
            className="bg-slate-600 text-white sm:text-base text-xs font-semibold px-4 py-1 rounded cursor-pointer"
          >
            Copy Operan
          </button>
        </div>

        {Object.keys(dataBangsal).length === 0 ? (
          <p className="text-slate-500">Belum ada data</p>
        ) : (
          Object.entries(dataBangsal).map(([namaBangsal, dokter]) => (
             <div
                key={namaBangsal}
                className="grid grid-cols-[80px_5px_1fr] sm:grid-cols-[120px_10px_1fr] gap-2 mb-2 items-start"
              >
                {/* Nama Bangsal */}
                <span className="font-bold text-slate-800">
                  {namaBangsal}
                </span>

                {/* Titik Dua */}
                <span className="font-bold">:</span>

                {/* Dokter */}
               <span className="font-semibold text-slate-900">
                {formatList(dokter)}
              </span>
              </div>
          ))
        )}
      </div>

      {/* ===================== CARD DOKTER ===================== */}
      <div className="bg-white border-2 border-green-700 rounded-xl sm:p-5 p-2 sm:w-[90%] mx-auto mt-6">
        <h2 className="font-bold mb-4">Dokter & Bangsal Visite</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {allDokter.map((dokter) => {
            const dokterInfo = daftarDokter.find((d) => d.nama === dokter);

            const bangsalList = Object.keys(dataBangsal).filter((b) =>
              dataBangsal[b].includes(dokter)
            );

            return (
              <div
                key={dokter}
                className="border rounded-xl p-4 shadow-md"
              >
                <div className="flex justify-between items-center">
                  <p className="font-bold text-blue-600">
                    dr. {dokterInfo?.nama}
                  </p>

                  <div className="flex items-center gap-8 bg-slate-200 px-3 py-1 rounded shadow">
                    <IoLogoWhatsapp
                      onClick={() => handleWhatsApp(dokter)}
                      className="text-green-700 text-4xl cursor-pointer hover:text-green-800 hover:scale-110"
                    />
                    <button
                      onClick={() => handleCopyBangsal(bangsalList)}
                      className=" bg-slate-600 hover:bg-slate-800 hover:scale-105 text-white px-3 py-1 rounded text-xs cursor-pointer font-semibold"
                    >
                      Copy Bangsal
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-slate-800 ">
                  Bangsal: {formatBangsal(bangsalList)}
                </p>

              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-sm font-semibold text-slate-600 mt-6">
        Created with 💖 by{" "}
        <a
          href="https://brewokode.com"
          className="text-blue-600 underline"
        >
          😊 Hasbi R 😊
        </a>
      </p>
    </div>
  );
}



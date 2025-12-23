import { useState } from "react";

export default function App() {
  const [dataBangsal, setDataBangsal] = useState({});
  const [bangsal, setBangsal] = useState("");
  const [dokterTerpilih, setDokterTerpilih] = useState([]);

  const daftarBangsal = ["Fahrudin", "Al Ma'un", "Chamdani", "Salamah", "Khotijah", "ICU", "Poli"];

  const daftarDokter = [
    "Adi",
    "Alam",
    "Andi",
    "Andreas",
    "Anwar",
    "Aziz",
    "Desi",
    "Faisal",
    "Haryono",
    "Inet",
    "Inkoni",
    "Iwan",
    "Jalul",
    "Khalifa",
    "Khayati",
    "Levi",
    "Ricky",
    "Sari Anak",
    "Sari Jantung",
    "Satya",
    "Tri Hastuti",
    "Vida",
    "Windy",
    "Yayan",
  ];

  // dokter unik untuk filter
  const allDokter = Array.from(new Set(Object.values(dataBangsal).flat()));

  const handleCheckbox = (nama) => {
    setDokterTerpilih((prev) => (prev.includes(nama) ? prev.filter((d) => d !== nama) : [...prev, nama]));
  };

  const handleTambah = () => {
    if (!bangsal || dokterTerpilih.length === 0) return;

    setDataBangsal((prev) => {
      const prevDokter = prev[bangsal] || [];
      return {
        ...prev,
        [bangsal]: Array.from(new Set([...prevDokter, ...dokterTerpilih])).sort(),
      };
    });

    setDokterTerpilih([]);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center lg:p-4 p-2">
      <div className="bg-slate-100 rounded-2xl  lg:p-6 w-full lg:max-w-8xl space-y-6">
        <h1 className="text-2xl font-bold text-center text-slate-950">Manajemen Sensus Dokter</h1>
        <div className="grid lg:grid-cols-[5fr_7fr] grid-cols-1 gap-5">
          {/* INPUT */}
          <div>
            <div className="border-2 border-green-700 bg-white rounded-xl p-4 space-y-4 mb-5">
              <h2 className="font-semibold">Input Data Bangsal</h2>

              <select value={bangsal} onChange={(e) => setBangsal(e.target.value)} className="w-full border rounded-lg p-2 font-semibold cursor-pointer">
                <option value="">-- Pilih Bangsal --</option>
                {daftarBangsal.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto border rounded-lg p-3">
                {daftarDokter.map((d) => (
                  <label key={d} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                    <input type="checkbox" checked={dokterTerpilih.includes(d)} onChange={() => handleCheckbox(d)} />
                    {d}
                  </label>
                ))}
              </div>

              <button onClick={handleTambah} className="w-full bg-green-600 text-white rounded-lg p-2 font-semibold hover:bg-green-700 cursor-pointer">
                SIMPAN
              </button>
            </div>
            {/* SEMUA BANGSAL + DOKTER (AUTO TAMPIL) */}
            <div className="border-2 border-green-700 bg-white rounded-xl p-4 space-y-3">
              <h2 className="font-semibold">Semua Dokter per Bangsal</h2>

              {Object.keys(dataBangsal).length === 0 && <p className="text-slate-500 text-sm">Belum ada data</p>}

              {Object.entries(dataBangsal).map(([namaBangsal, dokter]) => (
                <div key={namaBangsal} className="border rounded-lg p-3 shadow-lg">
                  <p className="font-bold mb-1">
                    {namaBangsal}
                    <span className="text-xs text-slate-500"> ({dokter.length} dokter)</span>
                  </p>

                  <p>
                    {dokter.map((d, i) => (
                      <span key={d} className="font-semibold">
                        {d}
                        {i < dokter.length - 2 && ", "}
                        {i === dokter.length - 2 && ", dan "}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* DAFTAR DOKTER & BANGSAL (CARD) */}
            <div className="border-2 border-green-700 bg-white rounded-xl p-4 space-y-4">
              <h2 className="font-semibold">Dokter & Bangsal Bertugas</h2>

              {allDokter.length === 0 && <p className="text-sm text-slate-500">Belum ada data dokter</p>}

              <div className="grid md:grid-cols-2 gap-4">
                {allDokter.map((dokter) => {
                  const bangsal = Object.keys(dataBangsal).filter((b) => dataBangsal[b].includes(dokter));

                  return (
                    <div key={dokter} className="border rounded-xl p-4 bg-white shadow-lg">
                      <p className="font-bold text-blue-600 mb-2">dr. {dokter}</p>

                      <p className="text-slate-950">
                        {bangsal.map((b, i) => (
                          <span key={b}>
                            {b}
                            {i < bangsal.length - 2 && ", "}
                            {i === bangsal.length - 2 && ", dan "}
                          </span>
                        ))}
                      </p>

                      <p className="text-xs text-slate-500 mt-2">Total bangsal: {bangsal.length}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-50">
          Created with 💖 by{" "}
          <a href="https://brewokode.com" className="text-blue-600 underline">
            Hasbi R
          </a>
        </p>
      </div>
    </div>
  );
}

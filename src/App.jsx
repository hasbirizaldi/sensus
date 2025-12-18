import { useState } from "react";

export default function App() {
  const [dataBangsal, setDataBangsal] = useState({});
  const [bangsal, setBangsal] = useState("");
  const [dokterTerpilih, setDokterTerpilih] = useState([]);
  const [selectedDokter, setSelectedDokter] = useState("");

  const daftarBangsal = ["ARF", "ALM", "CHA", "SAL", "KHO", "ICU", "POLI"];

  const daftarDokter = [
    "ANWAR",
    "SARIA",
    "JALUL",
    "KHAYATI",
    "KHALIFA",
    "ADI",
    "AZIZ",
    "FAIZAL",
    "INET",
    "SARIJAN",
    "RICKY",
    "TRI",
    "ANDI",
    "HARYONO",
    "LEVI",
    "ALAM",
    "ANDREAS",
    "SATYA",
    "WINDY",
    "DEYNA",
    "YAYAN",
    "VIDA",
    "IWAN",
    "INKONI",
    "DESI",
  ];

  // ambil semua dokter unik dari dataBangsal
  const allDokter = Array.from(new Set(Object.values(dataBangsal).flat()));

  const bangsalDokter = selectedDokter ? Object.keys(dataBangsal).filter((b) => dataBangsal[b].includes(selectedDokter)) : [];

  const handleCheckbox = (nama) => {
    setDokterTerpilih((prev) => (prev.includes(nama) ? prev.filter((d) => d !== nama) : [...prev, nama]));
  };

  const handleTambah = () => {
    if (!bangsal || dokterTerpilih.length === 0) return;

    setDataBangsal((prev) => {
      const prevDokter = prev[bangsal] || [];
      const gabung = Array.from(new Set([...prevDokter, ...dokterTerpilih]));

      return {
        ...prev,
        [bangsal]: gabung,
      };
    });

    setDokterTerpilih([]);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 flex items-center justify-center lg:p-6">
        <div className="bg-white lg:rounded-2xl shadow-ku lg:p-6 px-2 py-4 w-full max-w-3xl space-y-6">
          <h1 className="text-2xl font-bold text-slate-800 text-center">Kalkulator Sensus Dokter</h1>

          {/* INPUT DATA */}
          <div className="border-2 border-green-700 bg-white rounded-xl lg:p-4 p-2 space-y-4 shadow-ku">
            <h2 className="font-semibold">Input Data Bangsal</h2>

            {/* SELECT BANGSAL */}
            <select value={bangsal} onChange={(e) => setBangsal(e.target.value)} className="w-full border rounded-lg p-2 cursor-pointer font-semibold bg-white">
              <option value="">-- Pilih Bangsal --</option>
              {daftarBangsal.map((b) => (
                <option key={b} value={b} className="font-semibold">
                  {b}
                </option>
              ))}
            </select>

            {/* CHECKBOX DOKTER */}
            <div className="grid grid-cols-4 gap-2 max-h-80 overflow-y-auto border rounded-lg p-3 bg-white">
              {daftarDokter.map((d) => (
                <label key={d} className="flex items-center gap-2 lg:text-sm text-[11px] cursor-pointer font-semibold">
                  <input type="checkbox" checked={dokterTerpilih.includes(d)} onChange={() => handleCheckbox(d)} />
                  {d}
                </label>
              ))}
            </div>

            <button onClick={handleTambah} className="w-full bg-green-600 cursor-pointer text-white rounded-lg p-2 hover:bg-green-700 font-semibold ">
              CROOOT
            </button>
          </div>

          {/* FILTER */}
          <div className="border-2 border-green-700 shadow-ku rounded-xl p-4 space-y-3">
            <h2 className="font-semibold">Filter Dokter</h2>

            <select value={selectedDokter} onChange={(e) => setSelectedDokter(e.target.value)} className="w-full border rounded-lg p-2 font-semibold cursor-pointer">
              <option value="">-- Pilih Dokter --</option>
              {allDokter.map((d) => (
                <option key={d} value={d} className="font-semibold">
                  {d}
                </option>
              ))}
            </select>

            {selectedDokter && (
              <div>
                <p className="font-semibold text-slate-700 mb-2">
                  Dokter <span className="text-blue-600">{selectedDokter}</span> bertugas di:
                </p>
                <p>
                  {bangsalDokter.map((b, index) => (
                    <span className="font-bold" key={b}>
                      {b}
                      {index < bangsalDokter.length - 2 && ", "}
                      {index === bangsalDokter.length - 2 && ", dan "}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
          <p className="text-center mt-4">
            Created with 💖💖💖 by{" "}
            <a href="https://brewokode.com" className="text-blue-600 underline">
              Hasbi R
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
